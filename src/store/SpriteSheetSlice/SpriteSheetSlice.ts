import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  type Tuple,
} from "@agusmgarcia/react-core";
import MSER, { type MSEROptions } from "blob-detection-ts";
import invert from "invert-color";

import { loadImage } from "#src/utils";

import type SpriteSheetSlice from "./SpriteSheetSlice.types";

export default createGlobalSlice<SpriteSheetSlice>("spriteSheet", () => ({
  createSpriteSheet,
  resetSpriteSheet,
  setSpriteSheetSettings,
  spriteSheet: undefined,
}));

async function createSpriteSheet(
  input: Parameters<SpriteSheetSlice["spriteSheet"]["createSpriteSheet"]>[0],
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  URL.revokeObjectURL(
    context.get().spriteSheet.spriteSheet?.sheet.imageURL || "",
  );

  const rawImageURL = URL.createObjectURL(input);

  try {
    const rawImageData = getImageData(
      await loadImage(rawImageURL, context.signal),
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
      input.name,
      input.type,
      context.signal,
    );

    const imageURL = URL.createObjectURL(newFileImage);

    try {
      const settings: NonNullable<
        SpriteSheetSlice["spriteSheet"]["spriteSheet"]
      >["settings"] = {
        delta: 0,
        maxArea: 0.5,
        maxVariation: 0.5,
        minArea: 0,
        minDiversity: 0.33,
      };

      const sprites = getSprites(
        rawImageData,
        [rawImageData.data[0], rawImageData.data[1], rawImageData.data[2]],
        settings,
      );

      context.set({
        spriteSheet: {
          settings,
          sheet: {
            backgroundColor,
            color,
            imageURL,
            name: input.name,
          },
          sprites,
        },
      });
    } catch (error) {
      URL.revokeObjectURL(imageURL);
      throw error;
    }
  } finally {
    URL.revokeObjectURL(rawImageURL);
  }
}

async function resetSpriteSheet(
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  URL.revokeObjectURL(
    context.get().spriteSheet.spriteSheet?.sheet.imageURL || "",
  );

  context.set({ spriteSheet: undefined });
}

async function setSpriteSheetSettings(
  settings: Parameters<
    SpriteSheetSlice["spriteSheet"]["setSpriteSheetSettings"]
  >[0],
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  context.set((prev) => ({
    spriteSheet: !!prev.spriteSheet
      ? {
          ...prev.spriteSheet,
          settings: {
            ...(settings instanceof Function
              ? settings(prev.spriteSheet.settings)
              : settings),
          },
        }
      : prev.spriteSheet,
  }));

  const imageURL = context.get().spriteSheet.spriteSheet?.sheet.imageURL;
  if (!imageURL) return;
  const imageData = getImageData(await loadImage(imageURL, context.signal));

  const newSettings = context.get().spriteSheet.spriteSheet?.settings;
  if (!newSettings) return;

  const sprites = getSprites(
    imageData,
    [imageData.data[0], imageData.data[1], imageData.data[2]],
    newSettings,
  );

  context.set((prev) => ({
    spriteSheet: !!prev.spriteSheet
      ? { ...prev.spriteSheet, sprites }
      : prev.spriteSheet,
  }));
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

function getSprites(
  imageData: ImageData,
  backgroundColor: Tuple<number, 3>,
  options: MSEROptions,
): NonNullable<SpriteSheetSlice["spriteSheet"]["spriteSheet"]>["sprites"] {
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
    .map((r) => ({
      bottom: r.bottom,
      height: r.bottom - r.top,
      id: `${r.top}:${r.right}:${r.bottom}:${r.left}`,
      left: r.left,
      right: r.right,
      top: r.top,
      width: r.right - r.left,
    }))
    .reduce(
      (result, current) => {
        result[current.id] = current;
        return result;
      },
      {} as NonNullable<
        SpriteSheetSlice["spriteSheet"]["spriteSheet"]
      >["sprites"],
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
  if (!blob) throw "";

  return new File([blob], name, { type });
}
