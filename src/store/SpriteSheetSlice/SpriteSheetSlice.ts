import { ServerSlice } from "@agusmgarcia/react-essentials-store";
import { strings } from "@agusmgarcia/react-essentials-utils";
import { type MSEROptions, Rect } from "blob-detection-ts";

import { SpriteSheetParserClient } from "#src/apis";
import { imageDataUtils, loadImage } from "#src/utils";

import { type AnimationsSlice } from "../AnimationsSlice";
import { type NotificationSlice } from "../NotificationSlice";
import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
import { type SpriteSheetSettingsSlice } from "../SpriteSheetSettingsSlice";
import { type Request, type SpriteSheet } from "./SpriteSheetSlice.types";

export default class SpriteSheetSlice extends ServerSlice<
  SpriteSheet | undefined,
  Request,
  {
    animations: AnimationsSlice;
    notification: NotificationSlice;
    spriteSheetImage: SpriteSheetImageSlice;
    spriteSheetSettings: SpriteSheetSettingsSlice;
  }
> {
  constructor() {
    super(undefined);
  }

  protected override onBuildRequest(): Request {
    return {
      spriteSheetImage: !!this.slices.spriteSheetImage.response
        ? {
            id: this.slices.spriteSheetImage.response.id,
            url: this.slices.spriteSheetImage.response.url,
          }
        : undefined,
      spriteSheetSettings: !!this.slices.spriteSheetSettings.response
        ? {
            delta: this.slices.spriteSheetSettings.response.delta,
            maxVariation: this.slices.spriteSheetSettings.response.maxVariation,
            minDiversity: this.slices.spriteSheetSettings.response.minDiversity,
          }
        : undefined,
    };
  }

  protected override async onFetch(
    { spriteSheetImage, spriteSheetSettings }: Request,
    signal: AbortSignal,
  ): Promise<SpriteSheet | undefined> {
    if (!spriteSheetImage || !spriteSheetSettings) return undefined;

    const state = await SpriteSheetParserClient.INSTANCE.getState(
      { id: spriteSheetImage.id },
      signal,
    );

    if (!!state?.spriteSheet) return state.spriteSheet;

    return await loadImage(spriteSheetImage.url, signal)
      .then((image) => imageDataUtils.get(image))
      .then((d) => SpriteSheetSlice.getSprites(d, spriteSheetSettings, signal));
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.subscribe(
      (state) => state.response,
      (spriteSheet, _, signal) =>
        !!this.slices.spriteSheetImage.response?.id
          ? SpriteSheetParserClient.INSTANCE.patchState(
              { id: this.slices.spriteSheetImage.response.id, spriteSheet },
              signal,
            )
          : undefined,
    );
  }

  async mergeSprites(spriteIds: string[], signal: AbortSignal): Promise<void> {
    if (spriteIds.length <= 1)
      throw new Error("You need to select more than one sprite to merge");

    const animations = this.slices.animations.response;
    if (!animations) throw new Error("You need to provide an image first");

    const animationsThatContainAtLeastOneSprite = animations.filter((a) =>
      a.sprites.some((s) => spriteIds.includes(s.id)),
    );

    if (!!animationsThatContainAtLeastOneSprite.length) {
      const response = await this.slices.notification.set(
        "warning",
        strings.replace(
          "By merging selected sprites, the ${animations?animation:animations}: ${animationsName} ${animations?is:are} going to be deleted. Are you sure you want to continue?",
          {
            animations: animationsThatContainAtLeastOneSprite.length,
            animationsName: animationsThatContainAtLeastOneSprite
              .map((a) => `**"${a.name}"**`)
              .join(", "),
          },
        ),
        signal,
      );

      if (!response) return;
    }

    if (!this.response) return;

    const spriteToAdd = SpriteSheetSlice.toSprite(
      spriteIds
        .map((sId) => this.response![sId])
        .filter((s) => !!s)
        .map((s) => new Rect(s.x, s.y, s.width, s.height))
        .reduce((r1, r2) => {
          r1.merge(r2);
          return r1;
        }),
      spriteIds.reduce((result, spriteId) => {
        const sprite = this.response![spriteId];
        if (!!sprite) result[spriteId] = sprite;
        return result;
      }, {} as SpriteSheet),
    );

    const sprites = { ...this.response, [spriteToAdd.id]: spriteToAdd };
    spriteIds.forEach((sId) => delete sprites[sId]);

    this.response = sprites;
  }

  async splitSprite(spriteId: string, signal: AbortSignal): Promise<void> {
    const animations = this.slices.animations.response;
    if (!animations) throw new Error("You need to provide an image first");

    const animationsThatContainTheSprite = animations.filter((a) =>
      a.sprites.some((s) => s.id === spriteId),
    );

    if (!!animationsThatContainTheSprite.length) {
      const response = await this.slices.notification.set(
        "warning",
        strings.replace(
          "By splitting selected sprite, the ${animations?animation:animations}: ${animationsName} ${animations?is:are} going to be deleted. Are you sure you want to continue?",
          {
            animations: animationsThatContainTheSprite.length,
            animationsName: animationsThatContainTheSprite
              .map((a) => `**"${a.name}"**`)
              .join(", "),
          },
        ),
        signal,
      );

      if (!response) return;
    }

    if (!this.response) return;

    const subspriteIds = Object.keys(this.response[spriteId].subsprites);
    if (!subspriteIds.length) return;

    const sprites = {
      ...this.response,
      ...this.response[spriteId].subsprites,
    };

    delete sprites[spriteId];
    this.response = sprites;
  }

  static getSprites(
    imageData: ImageData,
    options: Pick<MSEROptions, "delta" | "maxVariation" | "minDiversity">,
    signal: AbortSignal,
  ): Promise<SpriteSheet> {
    return imageDataUtils
      .getRects(imageData, { ...options, maxArea: 0.5, minArea: 0 }, signal)
      .then((rects) => rects.map((r) => SpriteSheetSlice.toSprite(r)))
      .then((sprites) =>
        sprites.reduce((result, current) => {
          result[current.id] = current;
          return result;
        }, {} as SpriteSheet),
      );
  }

  private static toSprite(
    rect: Rect,
    subsprites?: SpriteSheet,
  ): SpriteSheet[string] & { id: string } {
    return {
      height: rect.bottom - rect.top,
      id: `${rect.left}:${rect.top}:${rect.right - rect.left}:${rect.bottom - rect.top}`,
      subsprites: subsprites || {},
      width: rect.right - rect.left,
      x: rect.left,
      y: rect.top,
    };
  }
}
