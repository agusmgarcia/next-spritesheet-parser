import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  equals,
} from "@agusmgarcia/react-core";

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
>("utils", () => ({ importJSONFile }));

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
    (!!animations.length ||
      Object.values(spriteSheet.sprites).some(
        (sprite) => !!Object.keys(sprite.subsprites).length,
      ) ||
      normalMap.settings.strength !== 1) &&
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
