import {
  createServerSlice,
  type CreateServerSliceTypes,
} from "@agusmgarcia/react-core";

import { imageDataUtils, loadImage } from "#src/utils";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type NormalMapSlice from "./NormalMapSlice.types";

export default createServerSlice<NormalMapSlice, SpriteSheetSliceTypes.default>(
  "normalMap",
  async ({ image: spriteSheetImage, settings }, signal, prevNormalMap) => {
    if (!spriteSheetImage.url) {
      URL.revokeObjectURL(prevNormalMap?.image.url || "");
      return initialNormalMap;
    }

    const data = await loadImage(spriteSheetImage.url, signal)
      .then(imageDataUtils.get)
      .then((i) => imageDataUtils.generateNormalMap(i, settings.strength));

    const image = { ...spriteSheetImage };
    image.name = spriteSheetImage.name;
    image.type = "image/png";
    image.backgroundColor = imageDataUtils.getBackgroundColor(data);
    image.url = await imageDataUtils
      .createFile(data, `${image.name}.normal.png`, image.type, signal)
      .then((file) => URL.createObjectURL(file));

    URL.revokeObjectURL(prevNormalMap?.image.url || "");

    return { image, settings };
  },
  () => ({
    image: { backgroundColor: "", name: "", type: "", url: "" },
    settings: { strength: 0 },
  }),
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

const initialNormalMap: NonNullable<NormalMapSlice["normalMap"]["data"]> = {
  image: {
    backgroundColor: "",
    name: "",
    type: "",
    url: "",
  },
  settings: {
    strength: 1,
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
    image: { ...spriteSheet.image },
    settings: { strength: 1 },
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

  await context.reload({
    image: { ...spriteSheet.image },
    settings: newSettings,
  });
}
