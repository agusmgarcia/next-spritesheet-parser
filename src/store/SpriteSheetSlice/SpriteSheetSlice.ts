import {
  createServerSlice,
  type CreateServerSliceTypes,
  type Tuple,
} from "@agusmgarcia/react-core";
import MSER, { type MSEROptions, Rect } from "blob-detection-ts";
import invert from "invert-color";

import { loadImage } from "#src/utils";

import { type SettingsSliceTypes } from "../SettingsSlice";
import type SpriteSheetSlice from "./SpriteSheetSlice.types";

export default createServerSlice<SpriteSheetSlice, SettingsSliceTypes.default>(
  "spriteSheet",
  async (settings, signal, prevSpriteSheet) => {
    URL.revokeObjectURL(prevSpriteSheet?.imageURL || "");

    const rawImage = settings.image;
    if (!rawImage) return undefined;

    const rawImageData = await loadImage(rawImage.url, signal).then(
      getImageData,
    );

    const backgroundColor = `#${rawImageData.data[0].toString(16)}${rawImageData.data[1].toString(16)}${rawImageData.data[2].toString(16)}`;

    const color = invert([
      rawImageData.data[0],
      rawImageData.data[1],
      rawImageData.data[2],
    ]);

    const newFileImage = await createImageWithoutBackground(
      rawImageData,
      [rawImageData.data[0], rawImageData.data[1], rawImageData.data[2]],
      rawImage.name,
      rawImage.type,
      signal,
    );

    const imageURL = URL.createObjectURL(newFileImage);

    try {
      const sprites = getSprites(
        rawImageData,
        [rawImageData.data[0], rawImageData.data[1], rawImageData.data[2]],
        settings,
      );

      return {
        backgroundColor,
        color,
        imageURL,
        name: rawImage.name,
        sprites,
      };
    } catch (error) {
      URL.revokeObjectURL(imageURL);
      throw error;
    }
  },
  (state) => state.settings.settings,
  () => ({ mergeSprites, setSpriteSheet, splitSprite }),
);

function mergeSprites(
  spriteIds: Parameters<SpriteSheetSlice["spriteSheet"]["mergeSprites"]>[0],
  context: CreateServerSliceTypes.Context<SpriteSheetSlice>,
): void {
  if (spriteIds.length <= 1) return;

  context.set((prev) => {
    if (!prev) return prev;

    const sprites = prev.sprites;

    const spriteToAdd = toSprite(
      spriteIds
        .map((sId) => sprites[sId])
        .map((s) => new Rect(s.left, s.top, s.width, s.height))
        .reduce((r1, r2) => {
          r1.merge(r2);
          return r1;
        }),
      spriteIds.reduce(
        (result, spriteId) => {
          result[spriteId] = sprites[spriteId];
          return result;
        },
        {} as NonNullable<SpriteSheetSlice["spriteSheet"]["data"]>["sprites"],
      ),
    );

    const newSprites = { ...sprites, [spriteToAdd.id]: spriteToAdd };
    spriteIds.forEach((sId) => delete newSprites[sId]);

    return { ...prev, sprites: newSprites };
  });
}

function setSpriteSheet(
  spriteSheet: Parameters<SpriteSheetSlice["spriteSheet"]["setSpriteSheet"]>[0],
  context: CreateServerSliceTypes.Context<SpriteSheetSlice>,
): void {
  context.set((prev) =>
    !!prev ? { ...prev, ...spriteSheet, imageURL: prev.imageURL } : undefined,
  );
}

function splitSprite(
  spriteId: Parameters<SpriteSheetSlice["spriteSheet"]["splitSprite"]>[0],
  context: CreateServerSliceTypes.Context<SpriteSheetSlice>,
): void {
  context.set((prev) => {
    if (!prev) return prev;

    const subspriteIds = Object.keys(prev.sprites[spriteId].subsprites);
    if (!subspriteIds.length) return prev;

    const newSprites = {
      ...prev.sprites,
      ...prev.sprites[spriteId].subsprites,
    };

    delete newSprites[spriteId];

    return { ...prev, sprites: newSprites };
  });
}

function getImageData(image: HTMLImageElement): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Context is not available");

  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, canvas.width, canvas.height);
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
  backgroundColor: Tuple<number, 3>,
  options: MSEROptions,
): NonNullable<SpriteSheetSlice["spriteSheet"]["data"]>["sprites"] {
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (
      imageData.data[i] === backgroundColor[0] &&
      imageData.data[i + 1] === backgroundColor[1] &&
      imageData.data[i + 2] === backgroundColor[2]
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

async function createImageWithoutBackground(
  imageData: ImageData,
  backgroundColor: Tuple<number, 3>,
  name: string,
  type: string,
  signal: AbortSignal,
): Promise<File> {
  imageData = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height,
  );

  for (let i = 0; i < imageData.data.length; i += 4) {
    if (
      imageData.data[i] === backgroundColor[0] &&
      imageData.data[i + 1] === backgroundColor[1] &&
      imageData.data[i + 2] === backgroundColor[2]
    ) {
      imageData.data[i] = 0;
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = 0;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Context is not available");

  context.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob | undefined>((resolve) =>
    canvas.toBlob((blob) => resolve(blob || undefined), type),
  );

  signal.throwIfAborted();
  if (!blob) throw new Error("Unexpected scenario");

  return new File([blob], name, { type });
}
