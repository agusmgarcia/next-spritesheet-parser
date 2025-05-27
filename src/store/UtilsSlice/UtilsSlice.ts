import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  equals,
} from "@agusmgarcia/react-core";
import { downloadZip } from "client-zip";

import { imageDataUtils, loadImage } from "#src/utils";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import { type NotificationSliceTypes } from "../NotificationSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type UtilsSlice from "./UtilsSlice.types";

export default createGlobalSlice<
  UtilsSlice,
  AnimationsSliceTypes.default &
    NormalMapSliceTypes.default &
    NotificationSliceTypes.default &
    SpriteSheetSliceTypes.default
>("utils", () => ({ exportZip, importJSONFile, isDirty }));

async function exportZip(
  context: CreateGlobalSliceTypes.Context<
    UtilsSlice,
    AnimationsSliceTypes.default &
      NormalMapSliceTypes.default &
      NotificationSliceTypes.default &
      SpriteSheetSliceTypes.default
  >,
): Promise<File> {
  const animations = context.get().animations.animations;
  const normalMap = context.get().normalMap.data;
  if (!normalMap?.image.url)
    throw new Error("You need to provide an image first");

  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");

  const baseName = spriteSheet.image.name || "Sprite sheet";

  return await Promise.all([
    fetch(
      "data:text/json;charset=utf-8," +
        encodeURIComponent(
          JSON.stringify({
            animations,
            normalMap,
            spriteSheet,
            version: process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0",
          }),
        ),
      { signal: context.signal },
    )
      .then((response) => response.blob())
      .then((blob) => ({
        input: blob,
        lastModified: new Date(),
        name: `${baseName}.json`,
      })),

    loadImage(spriteSheet.image.url, context.signal)
      .then(imageDataUtils.get)
      .then(imageDataUtils.removeBackground)
      .then((data) =>
        imageDataUtils.createFile(
          data,
          `${baseName}.${spriteSheet.image.type.replace("image/", "")}`,
          spriteSheet.image.type,
          context.signal,
        ),
      ),

    fetch(normalMap.image.url, { signal: context.signal })
      .then((response) => response.blob())
      .then((blob) => ({
        input: blob,
        lastModified: new Date(),
        name: `${baseName}.normal.png`,
      })),
  ])
    .then(downloadZip)
    .then((result) => result.blob())
    .then((blob) => new File([blob], `${baseName}.zip`));
}

async function importJSONFile(
  jsonFile: Parameters<UtilsSlice["utils"]["importJSONFile"]>[0],
  context: CreateGlobalSliceTypes.Context<
    UtilsSlice,
    AnimationsSliceTypes.default &
      NormalMapSliceTypes.default &
      NotificationSliceTypes.default &
      SpriteSheetSliceTypes.default
  >,
): Promise<void> {
  const animations = context.get().animations.animations;
  const newAnimations = jsonFile.animations;

  const normalMap = context.get().normalMap.data;
  if (!normalMap?.image.url)
    throw new Error("You need to provide an image first");
  const newNormalMap = {
    ...jsonFile.normalMap,
    image: { ...normalMap.image, name: jsonFile.normalMap.image.name },
  };

  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");
  const newSpriteSheet = {
    ...jsonFile.spriteSheet,
    image: { ...spriteSheet.image, name: jsonFile.spriteSheet.image.name },
  };

  if (
    isDirty(context) &&
    (!equals.deep(newNormalMap, normalMap) ||
      !equals.deep(newSpriteSheet, spriteSheet) ||
      !equals.deep(newAnimations, animations))
  ) {
    const response = await context
      .get()
      .notification.setNotification(
        "warning",
        "By loading a new JSON file you may loose all your progress. Are you sure you want to continue?",
      );

    if (!response) return;
  }

  await context
    .get()
    .spriteSheet.setSpriteSheetSettings(newSpriteSheet.settings);
  context.get().spriteSheet.setSpriteSheetSprites(newSpriteSheet.sprites);
  context.get().spriteSheet.setSpriteSheetName(newSpriteSheet.image.name);

  await context.get().normalMap.setNormalMapSettings(newNormalMap.settings);
  context.get().normalMap.setNormalMapName(newNormalMap.image.name);

  await context.get().animations.setAnimations(newAnimations);

  await context
    .get()
    .notification.setNotification("success", "JSON file loaded succesfully!");
}

function isDirty(
  context: CreateGlobalSliceTypes.Context<
    UtilsSlice,
    AnimationsSliceTypes.default &
      NormalMapSliceTypes.default &
      SpriteSheetSliceTypes.default
  >,
): boolean {
  const animations = context.get().animations.animations;
  if (!!animations.length) return true;

  const spriteSheet = context.get().spriteSheet.data;
  if (
    !!spriteSheet?.image.url &&
    (Object.values(spriteSheet.sprites).some(
      (sprite) => !!Object.keys(sprite.subsprites).length,
    ) ||
      spriteSheet.settings.delta !== 0 ||
      spriteSheet.settings.minArea !== 0 ||
      spriteSheet.settings.minDiversity !== 0.33 ||
      spriteSheet.settings.maxArea !== 0.5 ||
      spriteSheet.settings.maxVariation !== 0.5)
  )
    return true;

  const normalMap = context.get().normalMap.data;
  if (
    !!normalMap?.image.url &&
    (normalMap.settings.colorSpace !== "linear" ||
      normalMap.settings.filterRadius !== 1 ||
      !!normalMap.settings.invertX ||
      !!normalMap.settings.invertY ||
      !!normalMap.settings.invertZ ||
      normalMap.settings.strength !== 1)
  )
    return true;

  return false;
}
