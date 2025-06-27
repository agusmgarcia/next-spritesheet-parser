import {
  createServerSlice,
  type CreateServerSliceTypes,
} from "@agusmgarcia/react-essentials-store";
import { replaceString } from "@agusmgarcia/react-essentials-utils";
import { type MSEROptions, Rect } from "blob-detection-ts";

import { imageDataUtils, loadImage } from "#src/utils";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import { type NotificationSliceTypes } from "../NotificationSlice";
import { type UtilsSliceTypes } from "../UtilsSlice";
import type SpriteSheetSlice from "./SpriteSheetSlice.types";

export const DEFAULT_SETTINGS: NonNullable<
  SpriteSheetSlice["spriteSheet"]["data"]
>["settings"] = {
  delta: 5,
  maxArea: 0,
  maxVariation: 0.25,
  minArea: 0,
  minDiversity: 0.2,
};

export default createServerSlice<
  SpriteSheetSlice,
  AnimationsSliceTypes.default &
    NormalMapSliceTypes.default &
    NotificationSliceTypes.default &
    UtilsSliceTypes.default
>(
  "spriteSheet",
  async ({ image, settings }, signal, prevSpriteSheet) => {
    if (image instanceof File) {
      const imageURL = URL.createObjectURL(image);

      try {
        const raw = await loadImage(imageURL, signal).then(imageDataUtils.get);
        const backgroundColor = imageDataUtils.getBackgroundColor(raw);

        settings = {
          ...DEFAULT_SETTINGS,
          maxArea: 0.5 * raw.width * raw.height,
        };

        const data = await imageDataUtils.removeBackground(raw, signal);
        const sprites = await getSprites(data, settings, signal);

        const url = await imageDataUtils
          .createFile(data, image.name, image.type, signal)
          .then((file) => URL.createObjectURL(file));

        URL.revokeObjectURL(prevSpriteSheet?.image.url || "");

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
      URL.revokeObjectURL(prevSpriteSheet?.image.url || "");
      return DEFAULT_SPRITE_SHEET;
    }

    const sprites = await loadImage(image.url, signal)
      .then(imageDataUtils.get)
      .then((data) => getSprites(data, settings, signal));

    if (image.url !== prevSpriteSheet?.image.url)
      URL.revokeObjectURL(prevSpriteSheet?.image.url || "");

    return { image, settings, sprites };
  },
  () => DEFAULT_SPRITE_SHEET,
  () => ({
    mergeSpriteSheetSprites,
    removeSpriteSheet,
    setSpriteSheetImage,
    setSpriteSheetName,
    setSpriteSheetSettings,
    setSpriteSheetSprites,
    splitSpriteSheetSprite,
  }),
);

const DEFAULT_SPRITE_SHEET: NonNullable<
  SpriteSheetSlice["spriteSheet"]["data"]
> = {
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
    maxArea: 0,
    maxVariation: 0,
    minArea: 0,
    minDiversity: 0,
  },
  sprites: {},
};

async function mergeSpriteSheetSprites(
  spriteIds: Parameters<
    SpriteSheetSlice["spriteSheet"]["mergeSpriteSheetSprites"]
  >[0],
  context: CreateServerSliceTypes.Context<
    SpriteSheetSlice,
    AnimationsSliceTypes.default & NotificationSliceTypes.default
  >,
): Promise<void> {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");

  if (spriteIds.length <= 1)
    throw new Error("You need to select more than one sprite to merge");

  const animationsThatContainAtLeastOneSprite = context
    .get()
    .animations.animations.filter((a) =>
      a.sprites.some((s) => spriteIds.includes(s.id)),
    );

  if (!!animationsThatContainAtLeastOneSprite.length) {
    const response = await context.get().notification.setNotification(
      "warning",
      replaceString(
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
      .map((s) => new Rect(s.left, s.top, s.width, s.height))
      .reduce((r1, r2) => {
        r1.merge(r2);
        return r1;
      }),
    spriteIds.reduce(
      (result, spriteId) => {
        result[spriteId] = spriteSheet.sprites[spriteId];
        return result;
      },
      {} as NonNullable<SpriteSheetSlice["spriteSheet"]["data"]>["sprites"],
    ),
  );

  const sprites: NonNullable<
    SpriteSheetSlice["spriteSheet"]["data"]
  >["sprites"] = {
    ...spriteSheet.sprites,
    [spriteToAdd.id]: spriteToAdd,
  };

  spriteIds.forEach((sId) => delete sprites[sId]);

  context.set((prev) => (!!prev ? { ...prev, sprites } : prev));
}

async function removeSpriteSheet(
  context: CreateServerSliceTypes.Context<
    SpriteSheetSlice,
    AnimationsSliceTypes.default &
      NormalMapSliceTypes.default &
      NotificationSliceTypes.default &
      UtilsSliceTypes.default
  >,
): Promise<void> {
  if (context.get().utils.isDirty()) {
    const response = await context
      .get()
      .notification.setNotification(
        "warning",
        "By removing the image you may loose all your progress. Are you sure you want to continue?",
      );

    if (!response) return;
  }

  await context.reload(DEFAULT_SPRITE_SHEET);
}

async function setSpriteSheetImage(
  image: Parameters<SpriteSheetSlice["spriteSheet"]["setSpriteSheetImage"]>[0],
  context: CreateServerSliceTypes.Context<
    SpriteSheetSlice,
    AnimationsSliceTypes.default &
      NormalMapSliceTypes.default &
      NotificationSliceTypes.default &
      UtilsSliceTypes.default
  >,
): Promise<void> {
  if (context.get().utils.isDirty()) {
    const response = await context
      .get()
      .notification.setNotification(
        "warning",
        "By loading a new image you may loose all your progress. Are you sure you want to continue?",
      );

    if (!response) return;
  }

  await context.reload({ image, settings: DEFAULT_SETTINGS });
}

function setSpriteSheetName(
  name: Parameters<SpriteSheetSlice["spriteSheet"]["setSpriteSheetName"]>[0],
  context: CreateServerSliceTypes.Context<SpriteSheetSlice>,
): void {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");

  context.set((prev) =>
    !!prev ? { ...prev, image: { ...prev.image, name } } : prev,
  );
}

async function setSpriteSheetSettings(
  settings: Parameters<
    SpriteSheetSlice["spriteSheet"]["setSpriteSheetSettings"]
  >[0],
  context: CreateServerSliceTypes.Context<
    SpriteSheetSlice,
    AnimationsSliceTypes.default & NotificationSliceTypes.default
  >,
): Promise<boolean> {
  const spriteSheet = context.get().spriteSheet.data;
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

  if (settings.minArea < 0)
    throw new Error("'Min area' must be greater or equal than 0");

  if (settings.minArea > settings.maxArea)
    throw new Error(
      `'Min area' must be lower or equal than ${settings.maxArea}`,
    );

  if (settings.maxArea < settings.minArea)
    throw new Error(
      `'Max area' must be greater or equal than ${settings.minArea}`,
    );

  const maxArea =
    (spriteSheet.image.width || 0) * (spriteSheet.image.height || 0);

  if (settings.maxArea > maxArea)
    throw new Error(`'Max area' must be lower or equal than ${maxArea}`);

  const spriteIds = await loadImage(spriteSheet.image.url, context.signal)
    .then(imageDataUtils.get)
    .then((data) => getSprites(data, settings, context.signal))
    .then((sprites) => Object.keys(sprites));

  const animationsThatDoesntContainAtLeastOneSprite = context
    .get()
    .animations.animations.filter((a) =>
      a.sprites.some((s) => !spriteIds.includes(s.id)),
    );

  if (!!animationsThatDoesntContainAtLeastOneSprite.length) {
    const response = await context.get().notification.setNotification(
      "warning",
      replaceString(
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

  await context.reload({ image: spriteSheet.image, settings });
  return true;
}

function setSpriteSheetSprites(
  sprites: Parameters<
    SpriteSheetSlice["spriteSheet"]["setSpriteSheetSprites"]
  >[0],
  context: CreateServerSliceTypes.Context<SpriteSheetSlice>,
): void {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");

  context.set((prev) => (!!prev ? { ...prev, sprites } : prev));
}

async function splitSpriteSheetSprite(
  spriteId: Parameters<
    SpriteSheetSlice["spriteSheet"]["splitSpriteSheetSprite"]
  >[0],
  context: CreateServerSliceTypes.Context<
    SpriteSheetSlice,
    AnimationsSliceTypes.default & NotificationSliceTypes.default
  >,
): Promise<void> {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");

  const animationsThatContainTheSprite = context
    .get()
    .animations.animations.filter((a) =>
      a.sprites.some((s) => s.id === spriteId),
    );

  if (!!animationsThatContainTheSprite.length) {
    const response = await context.get().notification.setNotification(
      "warning",
      replaceString(
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

  context.set((prev) => (!!prev ? { ...prev, sprites } : prev));
}

function toSprite(
  rect: Rect,
  subsprites?: NonNullable<SpriteSheetSlice["spriteSheet"]["data"]>["sprites"],
): NonNullable<SpriteSheetSlice["spriteSheet"]["data"]>["sprites"][string] & {
  id: string;
} {
  return {
    bottom: rect.bottom,
    height: rect.bottom - rect.top,
    id: `${rect.top}:${rect.right}:${rect.bottom}:${rect.left}`,
    left: rect.left,
    right: rect.right,
    subsprites: subsprites || {},
    top: rect.top,
    width: rect.right - rect.left,
  };
}

function getSprites(
  imageData: ImageData,
  options: MSEROptions,
  signal: AbortSignal,
): Promise<NonNullable<SpriteSheetSlice["spriteSheet"]["data"]>["sprites"]> {
  return imageDataUtils
    .getRects(imageData, options, signal)
    .then((rects) => rects.map((r) => toSprite(r)))
    .then((sprites) =>
      sprites.reduce(
        (result, current) => {
          result[current.id] = current;
          return result;
        },
        {} as NonNullable<SpriteSheetSlice["spriteSheet"]["data"]>["sprites"],
      ),
    );
}
