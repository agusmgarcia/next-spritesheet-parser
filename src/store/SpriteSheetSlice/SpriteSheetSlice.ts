import { ServerSlice } from "@agusmgarcia/react-essentials-store";
import { equals, strings } from "@agusmgarcia/react-essentials-utils";
import { type MSEROptions, Rect } from "blob-detection-ts";

import { imageDataUtils, loadImage } from "#src/utils";

import type AnimationsSlice from "../AnimationsSlice";
import type NormalMapSlice from "../NormalMapSlice";
import type NotificationSlice from "../NotificationSlice";
import type UtilsSlice from "../UtilsSlice";
import { type Request, type SpriteSheet } from "./SpriteSheetSlice.types";

export default class SpriteSheetSlice extends ServerSlice<
  SpriteSheet,
  Request,
  {
    animations: AnimationsSlice;
    normalMap: NormalMapSlice;
    notification: NotificationSlice;
    utils: UtilsSlice;
  }
> {
  constructor() {
    super();
  }

  get dirty(): boolean {
    return (
      !!this.response?.image.url &&
      (Object.values(this.response.sprites).some(
        (sprite) => !!Object.keys(sprite.subsprites).length,
      ) ||
        !equals.deep(this.response.settings, DEFAULT_SETTINGS))
    );
  }

  protected override async onFetch(
    { image, settings }: Request,
    signal: AbortSignal,
  ): Promise<SpriteSheet | undefined> {
    if (image instanceof File) {
      const imageURL = URL.createObjectURL(image);

      try {
        const raw = await loadImage(imageURL, signal).then(imageDataUtils.get);
        const backgroundColor = imageDataUtils.getBackgroundColor(raw);

        const data = await imageDataUtils.removeBackground(raw, signal);
        const sprites = await getSprites(data, settings, signal);

        const url = await imageDataUtils
          .createFile(data, image.name, image.type, signal)
          .then((file) => URL.createObjectURL(file));

        URL.revokeObjectURL(this.response?.image.url || "");

        return {
          image: {
            backgroundColor,
            height: data.height,
            name: `${image.name.split(".").slice(0, -1).join(".")}`,
            type: image.type,
            url,
            width: data.width,
          },
          settings,
          sprites,
        };
      } finally {
        URL.revokeObjectURL(imageURL);
      }
    }

    if (!image.url) {
      URL.revokeObjectURL(this.response?.image.url || "");
      return undefined;
    }

    const sprites = await loadImage(image.url, signal)
      .then(imageDataUtils.get)
      .then((data) => getSprites(data, settings, signal));

    if (image.url !== this.response?.image.url)
      URL.revokeObjectURL(this.response?.image.url || "");

    return { image, settings, sprites };
  }

  async remove(): Promise<void> {
    if (
      this.dirty ||
      this.slices.animations.dirty ||
      this.slices.normalMap.dirty
    ) {
      const response = await this.slices.notification.set(
        "warning",
        "By removing the image you may loose all your progress. Are you sure you want to continue?",
      );

      if (!response) return;
    }

    await this.reload({
      image: {
        backgroundColor: "",
        height: 0,
        name: "",
        type: "",
        url: "",
        width: 0,
      },
      settings: {
        delta: 0,
        maxVariation: 0,
        minDiversity: 0,
      },
    });
  }

  async setImage(image: File): Promise<void> {
    if (
      this.dirty ||
      this.slices.animations.dirty ||
      this.slices.normalMap.dirty
    ) {
      const response = await this.slices.notification.set(
        "warning",
        "By loading a new image you may loose all your progress. Are you sure you want to continue?",
      );

      if (!response) return;
    }

    await this.reload({ image, settings: DEFAULT_SETTINGS });
  }

  async setSettings(settings: SpriteSheet["settings"]): Promise<boolean> {
    const spriteSheet = this.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

    if (settings.delta < 1)
      throw new Error("'Delta' must be greater or equal than 1");

    if (settings.delta > 20)
      throw new Error("'Delta' must be lower or equal than 20");

    if (settings.maxVariation < 0.01)
      throw new Error("'Max variation' must be greater or equal than 0.01");

    if (settings.maxVariation > 1)
      throw new Error("'Max variation' must be lower or equal than 1");

    if (settings.minDiversity < 0.01)
      throw new Error("'Min diversity' must be greater or equal than 0.01");

    if (settings.minDiversity > 1)
      throw new Error("'Min diversity' must be lower or equal than 1");

    const spriteIds = await loadImage(spriteSheet.image.url)
      .then(imageDataUtils.get)
      .then((data) => getSprites(data, settings))
      .then((sprites) => Object.keys(sprites));

    const animationsThatDoesntContainAtLeastOneSprite =
      this.slices.animations.state.filter((a) =>
        a.sprites.some((s) => !spriteIds.includes(s.id)),
      );

    if (!!animationsThatDoesntContainAtLeastOneSprite.length) {
      const response = await this.slices.notification.set(
        "warning",
        strings.replace(
          "By modifying this settings, the following ${animations?animation:animations}: ${animationsName} ${animations?is:are} going to be deleted. Are you sure you want to continue?",
          {
            animations: animationsThatDoesntContainAtLeastOneSprite.length,
            animationsName: animationsThatDoesntContainAtLeastOneSprite
              .map((a) => `**"${a.name}"**`)
              .join(", "),
          },
        ),
      );

      if (!response) return false;
    }

    await this.reload({ image: spriteSheet.image, settings });
    return true;
  }

  setSprites(sprites: SpriteSheet["sprites"]): void {
    const spriteSheet = this.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

    this.response = { ...spriteSheet, sprites };
  }

  setName(name: string): void {
    const spriteSheet = this.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

    this.response = { ...spriteSheet, image: { ...spriteSheet.image, name } };
  }

  async mergeSprites(spriteIds: string[]): Promise<void> {
    const spriteSheet = this.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

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

    const spriteToAdd = toSprite(
      spriteIds
        .map((sId) => spriteSheet.sprites[sId])
        .filter((s) => !!s)
        .map((s) => new Rect(s.x, s.y, s.width, s.height))
        .reduce((r1, r2) => {
          r1.merge(r2);
          return r1;
        }),
      spriteIds.reduce(
        (result, spriteId) => {
          const sprite = spriteSheet.sprites[spriteId];
          if (!!sprite) result[spriteId] = sprite;
          return result;
        },
        {} as SpriteSheet["sprites"],
      ),
    );

    const sprites = { ...spriteSheet.sprites, [spriteToAdd.id]: spriteToAdd };
    spriteIds.forEach((sId) => delete sprites[sId]);

    this.response = { ...spriteSheet, sprites };
  }

  async splitSprite(spriteId: string): Promise<void> {
    const spriteSheet = this.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

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

    const subspriteIds = Object.keys(spriteSheet.sprites[spriteId].subsprites);
    if (!subspriteIds.length) return;

    const sprites = {
      ...spriteSheet.sprites,
      ...spriteSheet.sprites[spriteId].subsprites,
    };

    delete sprites[spriteId];
    this.response = { ...spriteSheet, sprites };
  }
}

const DEFAULT_SETTINGS: SpriteSheet["settings"] = {
  delta: 5,
  maxVariation: 0.25,
  minDiversity: 0.2,
};

function toSprite(
  rect: Rect,
  subsprites?: SpriteSheet["sprites"],
): SpriteSheet["sprites"][string] & {
  id: string;
} {
  return {
    height: rect.bottom - rect.top,
    id: `${rect.left}:${rect.top}:${rect.right - rect.left}:${rect.bottom - rect.top}`,
    subsprites: subsprites || {},
    width: rect.right - rect.left,
    x: rect.left,
    y: rect.top,
  };
}

function getSprites(
  imageData: ImageData,
  options: Pick<MSEROptions, "delta" | "maxVariation" | "minDiversity">,
  signal?: AbortSignal,
): Promise<SpriteSheet["sprites"]> {
  return imageDataUtils
    .getRects(imageData, { ...options, maxArea: 0.5, minArea: 0 }, signal)
    .then((rects) => rects.map((r) => toSprite(r)))
    .then((sprites) =>
      sprites.reduce(
        (result, current) => {
          result[current.id] = current;
          return result;
        },
        {} as SpriteSheet["sprites"],
      ),
    );
}
