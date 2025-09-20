import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { equals, strings } from "@agusmgarcia/react-essentials-utils";
import { type MSEROptions, Rect } from "blob-detection-ts";

import { imageDataUtils, loadImage } from "#src/utils";

import type AnimationsSlice from "../AnimationsSlice";
import type NormalMapSlice from "../NormalMapImageSlice";
import type NotificationSlice from "../NotificationSlice";
import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import type SpriteSheetSettingsSlice from "../SpriteSheetSettingsSlice";
import type UtilsSlice from "../UtilsSlice";
import { type SpriteSheet } from "./SpriteSheetSlice.types";

export default class SpriteSheetSlice extends GlobalSlice<
  SpriteSheet,
  {
    animations: AnimationsSlice;
    normalMap: NormalMapSlice;
    notification: NotificationSlice;
    spriteSheetImage: SpriteSheetImageSlice;
    spriteSheetSettings: SpriteSheetSettingsSlice;
    utils: UtilsSlice;
  }
> {
  constructor() {
    super({});
  }

  get dirty(): boolean {
    return (
      !!Object.keys(this.state).length &&
      Object.values(this.state).some((s) => !!Object.keys(s.subsprites).length)
    );
  }

  protected override onInit(): void {
    super.onInit();

    let controller = new AbortController();

    this.slices.spriteSheetImage.subscribe(
      (state) => state.response,
      () => {
        controller.abort();
        controller = new AbortController();
        this.reset(controller.signal);
      },
    );

    this.slices.spriteSheetSettings.subscribe(
      (state) => ({
        delta: state.delta,
        maxVariation: state.maxVariation,
        minDiversity: state.minDiversity,
      }),
      () => {
        controller.abort();
        controller = new AbortController();
        this.reset(controller.signal);
      },
      equals.shallow,
    );
  }

  setSprites(sprites: SpriteSheet): void {
    this.state = sprites;
  }

  async mergeSprites(spriteIds: string[]): Promise<void> {
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
      );

      if (!response) return;
    }

    const spriteToAdd = SpriteSheetSlice.toSprite(
      spriteIds
        .map((sId) => this.state[sId])
        .filter((s) => !!s)
        .map((s) => new Rect(s.x, s.y, s.width, s.height))
        .reduce((r1, r2) => {
          r1.merge(r2);
          return r1;
        }),
      spriteIds.reduce((result, spriteId) => {
        const sprite = this.state[spriteId];
        if (!!sprite) result[spriteId] = sprite;
        return result;
      }, {} as SpriteSheet),
    );

    const sprites = { ...this.state, [spriteToAdd.id]: spriteToAdd };
    spriteIds.forEach((sId) => delete sprites[sId]);

    this.state = sprites;
  }

  async splitSprite(spriteId: string): Promise<void> {
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
      );

      if (!response) return;
    }

    const subspriteIds = Object.keys(this.state[spriteId].subsprites);
    if (!subspriteIds.length) return;

    const sprites = {
      ...this.state,
      ...this.state[spriteId].subsprites,
    };

    delete sprites[spriteId];
    this.state = sprites;
  }

  private async reset(signal: AbortSignal): Promise<void> {
    try {
      const spriteSheetImageURL = this.slices.spriteSheetImage.response?.url;
      if (!spriteSheetImageURL) return;

      const settings = this.slices.spriteSheetSettings.state;

      await loadImage(spriteSheetImageURL, signal)
        .then((image) => imageDataUtils.get(image))
        .then((data) => SpriteSheetSlice.getSprites(data, settings, signal))
        .then((sprites) => (this.state = sprites));
    } catch (error) {
      if (signal.aborted) return;
      throw error;
    }
  }

  static getSprites(
    imageData: ImageData,
    options: Pick<MSEROptions, "delta" | "maxVariation" | "minDiversity">,
    signal?: AbortSignal,
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
