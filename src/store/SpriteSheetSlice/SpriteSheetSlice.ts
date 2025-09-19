import { ServerSlice } from "@agusmgarcia/react-essentials-store";
import { strings } from "@agusmgarcia/react-essentials-utils";
import { type MSEROptions, Rect } from "blob-detection-ts";

import { imageDataUtils, loadImage } from "#src/utils";

import type AnimationsSlice from "../AnimationsSlice";
import type NotificationSlice from "../NotificationSlice";
import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import type SpriteSheetSettingsSlice from "../SpriteSheetSettingsSlice";
import { type Request, type SpriteSheet } from "./SpriteSheetSlice.types";

export default class SpriteSheetSlice extends ServerSlice<
  SpriteSheet,
  Request,
  {
    animations: AnimationsSlice;
    notification: NotificationSlice;
    spriteSheetImage: SpriteSheetImageSlice;
    spriteSheetSettings: SpriteSheetSettingsSlice;
  }
> {
  constructor() {
    super({});
  }

  get dirty(): boolean {
    return (
      !!Object.keys(this.response).length &&
      Object.values(this.response).some(
        (s) => !!Object.keys(s.subsprites).length,
      )
    );
  }

  protected override onBuildRequest(): Request {
    return {
      settings: {
        delta: this.slices.spriteSheetSettings.state.delta,
        maxVariation: this.slices.spriteSheetSettings.state.maxVariation,
        minDiversity: this.slices.spriteSheetSettings.state.minDiversity,
      },
      spriteSheetImage: this.slices.spriteSheetImage.response,
    };
  }

  protected override async onFetch(
    { settings, spriteSheetImage }: Request,
    signal: AbortSignal,
  ): Promise<SpriteSheet> {
    if (!spriteSheetImage?.url) return {};

    return await loadImage(spriteSheetImage.url, signal)
      .then((image) => imageDataUtils.get(image))
      .then((data) => SpriteSheetSlice.getSprites(data, settings, signal));
  }

  async mergeSprites(spriteIds: string[], signal: AbortSignal): Promise<void> {
    if (spriteIds.length <= 1)
      throw new Error("You need to select more than one sprite to merge");

    const animationsThatContainAtLeastOneSprite =
      this.slices.animations.state.filter((a) =>
        a.sprites.some((s) => spriteIds.includes(s.id)),
      );

    if (!!animationsThatContainAtLeastOneSprite.length) {
      const response = await this.slices.notification.set(
        "warning",
        strings.replace(
          "By merging selected sprites, the following ${animations?animation:animations}: ${animationsName} ${animations?is:are} going to be deleted. Are you sure you want to continue?",
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

    const spriteToAdd = SpriteSheetSlice.toSprite(
      spriteIds
        .map((sId) => this.response[sId])
        .filter((s) => !!s)
        .map((s) => new Rect(s.x, s.y, s.width, s.height))
        .reduce((r1, r2) => {
          r1.merge(r2);
          return r1;
        }),
      spriteIds.reduce((result, spriteId) => {
        const sprite = this.response[spriteId];
        if (!!sprite) result[spriteId] = sprite;
        return result;
      }, {} as SpriteSheet),
    );

    const sprites = { ...this.response, [spriteToAdd.id]: spriteToAdd };
    spriteIds.forEach((sId) => delete sprites[sId]);

    this.response = sprites;
  }

  async splitSprite(spriteId: string, signal: AbortSignal): Promise<void> {
    const animationsThatContainTheSprite = this.slices.animations.state.filter(
      (a) => a.sprites.some((s) => s.id === spriteId),
    );

    if (!!animationsThatContainTheSprite.length) {
      const response = await this.slices.notification.set(
        "warning",
        strings.replace(
          "By splitting selected sprite, the following ${animations?animation:animations}: ${animationsName} ${animations?is:are} going to be deleted. Are you sure you want to continue?",
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

    const subspriteIds = Object.keys(this.response[spriteId].subsprites);
    if (!subspriteIds.length) return;

    const sprites = {
      ...this.response,
      ...this.response[spriteId].subsprites,
    };

    delete sprites[spriteId];
    this.response = sprites;
  }

  _setSprites(sprites: SpriteSheet): void {
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
