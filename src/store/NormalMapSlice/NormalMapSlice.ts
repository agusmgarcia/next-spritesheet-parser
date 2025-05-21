import {
  createServerSlice,
  type CreateServerSliceTypes,
} from "@agusmgarcia/react-core";

import { createFileFromImageData, getImageData, loadImage } from "#src/utils";

import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type NormalMapSlice from "./NormalMapSlice.types";

export default createServerSlice<
  NormalMapSlice,
  NormalMapSettingsSliceTypes.default & SpriteSheetSliceTypes.default
>(
  "normalMap",
  async (
    { imageURL: spriteSheetImageURL, strength },
    signal,
    prevNormalMap,
  ) => {
    URL.revokeObjectURL(prevNormalMap?.imageURL || "");
    if (!spriteSheetImageURL) return undefined;

    const imageData = await loadImage(spriteSheetImageURL, signal)
      .then(getImageData)
      .then((imageData) => generateNormalMap(imageData, strength));

    const backgroundColor = `#${imageData.data[0].toString(16)}${imageData.data[1].toString(16)}${imageData.data[2].toString(16)}`;

    const newFileImage = await createFileFromImageData(
      imageData,
      "normal-map.png",
      undefined,
      signal,
    );

    return {
      backgroundColor,
      imageURL: URL.createObjectURL(newFileImage),
      scale: 1,
    };
  },
  (state) => ({
    imageURL: state.spriteSheet.data?.imageURL,
    strength: state.normalMapSettings.normalMapSettings.strength,
  }),
  () => ({ __setNormalMap__, setNormalMapScale }),
);

function __setNormalMap__(
  normalMap: Parameters<NormalMapSlice["normalMap"]["__setNormalMap__"]>[0],
  context: CreateServerSliceTypes.Context<NormalMapSlice>,
): void {
  context.set(normalMap);
}

function setNormalMapScale(
  scale: Parameters<NormalMapSlice["normalMap"]["setNormalMapScale"]>[0],
  context: CreateServerSliceTypes.Context<NormalMapSlice>,
): void {
  context.set((prev) =>
    !!prev
      ? {
          ...prev,
          scale: scale instanceof Function ? scale(prev.scale) : scale,
        }
      : undefined,
  );
}

function generateNormalMap(imageData: ImageData, strength: number): ImageData {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  const context = document.createElement("canvas").getContext("2d");
  if (!context) throw new Error("Context is not available");

  context.imageSmoothingEnabled = false;
  context.imageSmoothingQuality = "high";

  const outputImageData = context.createImageData(width, height);
  const outputData = outputImageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      const pX =
        getIntensity(x + 1, y, width, height, data) -
        getIntensity(x - 1, y, width, height, data);

      const pY =
        getIntensity(x, y + 1, width, height, data) -
        getIntensity(x, y - 1, width, height, data);

      const normalX = pX * strength + 128;
      const normalY = pY * strength + 128;

      outputData[i] = Math.max(0, Math.min(255, normalX));
      outputData[i + 1] = Math.max(0, Math.min(255, normalY));
      outputData[i + 2] = 255;
      outputData[i + 3] = 255;
    }
  }

  return outputImageData;
}

function getIntensity(
  x: number,
  y: number,
  width: number,
  height: number,
  data: Uint8ClampedArray<ArrayBufferLike>,
): number {
  if (x < 0 || x >= width || y < 0 || y >= height) return 0;
  const i = (y * width + x) * 4;
  return (data[i] + data[i + 1] + data[i + 2]) / 3;
}
