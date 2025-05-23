import {
  createServerSlice,
  type CreateServerSliceTypes,
} from "@agusmgarcia/react-core";

import { imageDataUtils, loadImage } from "#src/utils";

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
      .then(imageDataUtils.get)
      .then((i) => imageDataUtils.generateNormalMap(i, strength));

    const backgroundColor = imageDataUtils.getBackgroundColor(imageData);

    const imageURL = await imageDataUtils
      .createFile(imageData, "normal-map.png", "image/png", signal)
      .then((file) => URL.createObjectURL(file));

    return {
      backgroundColor,
      imageURL,
    };
  },
  (state) => ({
    imageURL: state.spriteSheet.data?.imageURL,
    strength: state.normalMapSettings.normalMapSettings.strength,
  }),
  () => ({ __setNormalMap__ }),
);

function __setNormalMap__(
  normalMap: Parameters<NormalMapSlice["normalMap"]["__setNormalMap__"]>[0],
  context: CreateServerSliceTypes.Context<NormalMapSlice>,
): void {
  context.set(normalMap);
}
