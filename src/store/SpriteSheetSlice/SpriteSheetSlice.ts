import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";
import MSER from "blob-detection-ts";

import { loadImage } from "#src/utils";

import type SpriteSheetSlice from "./SpriteSheetSlice.types";

export default createGlobalSlice<SpriteSheetSlice>("spriteSheet", () => ({
  createSpriteSheet,
  resetSpriteSheet,
  spriteSheet: undefined,
}));

async function createSpriteSheet(
  input: Parameters<SpriteSheetSlice["spriteSheet"]["createSpriteSheet"]>[0],
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  URL.revokeObjectURL(context.get().spriteSheet.spriteSheet?.imageURL || "");
  const imageURL = URL.createObjectURL(input);

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
  ): NonNullable<SpriteSheetSlice["spriteSheet"]["spriteSheet"]>["sprites"] {
    const auxImageData = new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height,
    );

    const binaryImage = new ImageData(
      new Uint8ClampedArray(auxImageData.data),
      auxImageData.width,
      auxImageData.height,
    );

    for (let i = 0; i < binaryImage.data.length; i += 4) {
      if (
        binaryImage.data[i] === imageData.data[0] &&
        binaryImage.data[i + 1] === imageData.data[1] &&
        binaryImage.data[i + 2] === imageData.data[2]
      ) {
        binaryImage.data[i] = 255;
        binaryImage.data[i + 1] = 255;
        binaryImage.data[i + 2] = 255;
        binaryImage.data[i + 3] = 255;
      } else {
        binaryImage.data[i] = 0;
        binaryImage.data[i + 1] = 0;
        binaryImage.data[i + 2] = 0;
        binaryImage.data[i + 3] = 255;
      }
    }

    const mser = new MSER({
      delta: 0,
      maxArea: 0.5,
      maxVariation: 0.5,
      minArea: 0,
      minDiversity: 0.33,
    });

    return mser
      .mergeRects(mser.extract(binaryImage).map((r) => r.rect))
      .map((r) => ({
        bottom: r.bottom,
        height: r.bottom - r.top,
        left: r.left,
        right: r.right,
        top: r.top,
        width: r.right - r.left,
      }));
  }

  try {
    const imageData = getImageData(await loadImage(imageURL));
    const sprites = getSprites(imageData);

    context.set({
      spriteSheet: {
        backgroundColor: [
          imageData.data[0],
          imageData.data[1],
          imageData.data[2],
        ],
        imageURL,
        name: input.name,
        sprites,
      },
    });
  } catch {
    URL.revokeObjectURL(imageURL);
  }
}

async function resetSpriteSheet(
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  URL.revokeObjectURL(context.get().spriteSheet.spriteSheet?.imageURL || "");

  context.set({ spriteSheet: undefined });
}
