import {
  createServerSlice,
  type CreateServerSliceTypes,
  replaceString,
} from "@agusmgarcia/react-core";
import MSER, { type MSEROptions, Rect } from "blob-detection-ts";

import { imageDataUtils, loadImage } from "#src/utils";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import { type NotificationSliceTypes } from "../NotificationSlice";
import type SpriteSheetSlice from "./SpriteSheetSlice.types";

export default createServerSlice<
  SpriteSheetSlice,
  AnimationsSliceTypes.default &
    NormalMapSliceTypes.default &
    NotificationSliceTypes.default
>(
  "spriteSheet",
  async ({ image, settings }, signal, prevSpriteSheet) => {
    if (image instanceof File) {
      const imageURL = URL.createObjectURL(image);

      try {
        const data = await loadImage(imageURL, signal).then(imageDataUtils.get);
        const backgroundColor = imageDataUtils.getBackgroundColor(data);
        const sprites = getSprites(data, settings);

        const url = await imageDataUtils
          .createFile(
            imageDataUtils.removeBackground(data),
            image.name,
            image.type,
            signal,
          )
          .then((file) => URL.createObjectURL(file));

        URL.revokeObjectURL(prevSpriteSheet?.image.url || "");

        return {
          image: {
            backgroundColor,
            name: `${image.name.split(".").slice(0, -1).join(".")}`,
            type: image.type,
            url,
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
      return initialSpriteSheet;
    }

    const sprites = await loadImage(image.url, signal)
      .then(imageDataUtils.get)
      .then((data) => getSprites(data, settings));

    if (image.url !== prevSpriteSheet?.image.url)
      URL.revokeObjectURL(prevSpriteSheet?.image.url || "");

    return { image, settings, sprites };
  },
  () => ({
    image: {
      backgroundColor: "",
      name: "",
      type: "",
      url: "",
    },
    settings: {
      delta: 0,
      maxArea: 0,
      maxVariation: 0,
      minArea: 0,
      minDiversity: 0,
    },
  }),
  () => ({
    mergeSpriteSheetSprites,
    setSpriteSheetImage,
    setSpriteSheetName,
    setSpriteSheetSettings,
    setSpriteSheetSprites,
    splitSpriteSheetSprite,
  }),
);

const initialSpriteSheet: NonNullable<SpriteSheetSlice["spriteSheet"]["data"]> =
  {
    image: {
      backgroundColor: "",
      name: "",
      type: "",
      url: "",
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

async function setSpriteSheetImage(
  image: Parameters<SpriteSheetSlice["spriteSheet"]["setSpriteSheetImage"]>[0],
  context: CreateServerSliceTypes.Context<
    SpriteSheetSlice,
    AnimationsSliceTypes.default &
      NormalMapSliceTypes.default &
      NotificationSliceTypes.default
  >,
): Promise<void> {
  if (
    !!context.get().animations.animations.length ||
    Object.values(context.get().spriteSheet.data?.sprites || {}).some(
      (sprite) => !!Object.keys(sprite.subsprites).length,
    ) ||
    context.get().normalMap.data?.settings.strength !== 1
  ) {
    const response = await context
      .get()
      .notification.setNotification(
        "warning",
        "By loading a new image you may loose all your progress. Are you sure you want to continue?",
      );

    if (!response) return;
  }

  await context.reload({
    image,
    settings: {
      delta: 0,
      maxArea: 0.5,
      maxVariation: 0.5,
      minArea: 0,
      minDiversity: 0.33,
    },
  });
}

function setSpriteSheetName(
  name: Parameters<SpriteSheetSlice["spriteSheet"]["setSpriteSheetName"]>[0],
  context: CreateServerSliceTypes.Context<SpriteSheetSlice>,
): void {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");

  context.set((prev) =>
    !!prev
      ? {
          ...prev,
          image: {
            ...prev.image,
            name: name instanceof Function ? name(prev.image.name) : name,
          },
        }
      : prev,
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
): Promise<void> {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");

  if (!!context.get().animations.animations.length) {
    const response = await context
      .get()
      .notification.setNotification(
        "warning",
        "By modifying this settings you may loose all your progress. Are you sure you want to continue?",
      );

    if (!response) return;
  }

  const newSettings =
    settings instanceof Function ? settings(spriteSheet.settings) : settings;

  await context.reload({
    image: { ...spriteSheet.image },
    settings: newSettings,
  });
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
): NonNullable<SpriteSheetSlice["spriteSheet"]["data"]>["sprites"] {
  const background = imageDataUtils.getBackground(imageData);

  imageData = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height,
  );

  for (let i = 0; i < imageData.data.length; i += 4) {
    if (
      imageData.data[i] === background[0] &&
      imageData.data[i + 1] === background[1] &&
      imageData.data[i + 2] === background[2]
    ) {
      imageData.data[i] = 255;
      imageData.data[i + 1] = 255;
      imageData.data[i + 2] = 255;
      imageData.data[i + 3] = 255;
    } else {
      imageData.data[i] = 0;
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = 255;
    }
  }

  const mser = new MSER(options);

  return mser
    .mergeRects(mser.extract(imageData).map((r) => r.rect))
    .map((r) => toSprite(r))
    .reduce(
      (result, current) => {
        result[current.id] = current;
        return result;
      },
      {} as NonNullable<SpriteSheetSlice["spriteSheet"]["data"]>["sprites"],
    );
}
