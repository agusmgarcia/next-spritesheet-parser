import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  type Tuple,
} from "@agusmgarcia/react-core";
import MSER from "blob-detection-ts";
import invert from "invert-color";

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
    backgroundColor: Tuple<number, 3>,
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

    const mser = new MSER({
      delta: 0,
      maxArea: 0.5,
      maxVariation: 0.5,
      minArea: 0,
      minDiversity: 0.33,
    });

    return mser
      .mergeRects(mser.extract(imageData).map((r) => r.rect))
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
    const imageData = getImageData(await loadImage(imageURL, context.signal));

    const backgroundColor = `#${imageData.data[0].toString(16)}${imageData.data[1].toString(16)}${imageData.data[2].toString(16)}`;
    const color = invert([
      imageData.data[0],
      imageData.data[1],
      imageData.data[2],
    ]);

    const sprites = getSprites(imageData, [
      imageData.data[0],
      imageData.data[1],
      imageData.data[2],
    ]);

    context.set({
      spriteSheet: {
        backgroundColor,
        color,
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
