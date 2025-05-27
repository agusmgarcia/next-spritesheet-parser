import {
  createServerSlice,
  type CreateServerSliceTypes,
} from "@agusmgarcia/react-core";

import { imageDataUtils, loadImage } from "#src/utils";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type NormalMapSlice from "./NormalMapSlice.types";

export const DEFAULT_SETTINGS: NonNullable<
  NormalMapSlice["normalMap"]["data"]
>["settings"] = {
  colorSpace: "linear",
  filterRadius: 1,
  invertX: false,
  invertY: false,
  invertZ: false,
  strength: 1,
};

export default createServerSlice<NormalMapSlice, SpriteSheetSliceTypes.default>(
  "normalMap",
  async ({ image: spriteSheetImage, settings }, signal, prevNormalMap) => {
    if (!spriteSheetImage.url) {
      URL.revokeObjectURL(prevNormalMap?.image.url || "");
      return INITIAL_NORMAL_MAP;
    }

    const data = await loadImage(spriteSheetImage.url, signal)
      .then(imageDataUtils.get)
      .then(imageDataUtils.removeBackground)
      .then((i) => imageDataUtils.generateNormalMap(i, settings));

    const image = {
      backgroundColor: imageDataUtils.getBackgroundColor(data),
      name: spriteSheetImage.name,
      type: "image/png",
      url: await imageDataUtils
        .createFile(
          data,
          `${spriteSheetImage.name}.normal.png`,
          "image/png",
          signal,
        )
        .then((file) => URL.createObjectURL(file)),
    };

    URL.revokeObjectURL(prevNormalMap?.image.url || "");

    return { image, settings };
  },
  () => INITIAL_NORMAL_MAP,
  (subscribe) => {
    subscribe(
      (context) => context.get().normalMap.__updateNormalMapImage__(),
      (state) => state.spriteSheet.data?.image.url,
    );

    return {
      __updateNormalMapImage__,
      setNormalMapName,
      setNormalMapSettings,
    };
  },
);

const INITIAL_NORMAL_MAP: NonNullable<NormalMapSlice["normalMap"]["data"]> = {
  image: {
    backgroundColor: "",
    name: "",
    type: "",
    url: "",
  },
  settings: {
    colorSpace: "linear",
    filterRadius: 0,
    invertX: false,
    invertY: false,
    invertZ: false,
    strength: 0,
  },
};

async function __updateNormalMapImage__(
  context: CreateServerSliceTypes.Context<
    NormalMapSlice,
    SpriteSheetSliceTypes.default
  >,
): Promise<void> {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet) return;

  await context.reload({
    image: spriteSheet.image,
    settings: DEFAULT_SETTINGS,
  });
}

function setNormalMapName(
  name: Parameters<NormalMapSlice["normalMap"]["setNormalMapName"]>[0],
  context: CreateServerSliceTypes.Context<NormalMapSlice>,
): void {
  const normalMap = context.get().normalMap.data;
  if (!normalMap?.image.url)
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

async function setNormalMapSettings(
  settings: Parameters<NormalMapSlice["normalMap"]["setNormalMapSettings"]>[0],
  context: CreateServerSliceTypes.Context<
    NormalMapSlice,
    SpriteSheetSliceTypes.default
  >,
): Promise<void> {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");

  const normalMap = context.get().normalMap.data;
  if (!normalMap?.image.url)
    throw new Error("You need to provide an image first");

  const newSettings =
    settings instanceof Function ? settings(normalMap.settings) : settings;

  if (newSettings.strength <= 0)
    throw new Error("'Strength' must be greater than 0");

  await context.reload({
    image: spriteSheet.image,
    settings: newSettings,
  });
}
