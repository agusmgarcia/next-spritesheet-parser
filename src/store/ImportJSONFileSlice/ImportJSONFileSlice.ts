import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  equals,
} from "@agusmgarcia/react-core";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import { type NotificationSliceTypes } from "../NotificationSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type ImportJSONFileSlice from "./ImportJSONFileSlice.types";

export default createGlobalSlice<
  ImportJSONFileSlice,
  AnimationsSliceTypes.default &
    NormalMapSliceTypes.default &
    NormalMapSettingsSliceTypes.default &
    NotificationSliceTypes.default &
    SpriteSheetSliceTypes.default
>("importJSONFile", () => ({ importJSONFile }));

async function importJSONFile(
  jsonFile: Parameters<
    ImportJSONFileSlice["importJSONFile"]["importJSONFile"]
  >[0],
  context: CreateGlobalSliceTypes.Context<
    ImportJSONFileSlice,
    AnimationsSliceTypes.default &
      NormalMapSliceTypes.default &
      NormalMapSettingsSliceTypes.default &
      NotificationSliceTypes.default &
      SpriteSheetSliceTypes.default
  >,
): Promise<void> {
  const animations = context.get().animations.animations;
  const newAnimations = jsonFile.animations;

  const normalMap = context.get().normalMap.data;
  if (!normalMap?.imageURL)
    throw new Error("You need to provide an image first");
  const newNormalMap = { ...jsonFile.normalMap, imageURL: normalMap.imageURL };

  const normalMapSettings = context.get().normalMapSettings.normalMapSettings;
  const newNormalMapSettings = jsonFile.normalMapSettings;

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
      normalMapSettings.strength !== 1) &&
    (!equals.deep(newNormalMap, normalMap) ||
      !equals.deep(newNormalMapSettings, normalMapSettings) ||
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

  context.get().normalMapSettings.setNormalMapSettings(newNormalMapSettings);
  context.get().normalMap.__setNormalMap__(newNormalMap);
  await context.get().animations.setAnimations(newAnimations);

  await context
    .get()
    .notification.setNotification("success", "JSON file loaded succesfully!");
}
