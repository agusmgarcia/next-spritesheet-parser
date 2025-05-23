import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  equals,
} from "@agusmgarcia/react-core";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import { type NotificationSliceTypes } from "../NotificationSlice";
import { type SettingsSliceTypes } from "../SettingsSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type ImportJSONFileSlice from "./ImportJSONFileSlice.types";

export default createGlobalSlice<
  ImportJSONFileSlice,
  AnimationsSliceTypes.default &
    NormalMapSliceTypes.default &
    NormalMapSettingsSliceTypes.default &
    NotificationSliceTypes.default &
    SettingsSliceTypes.default &
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
      SettingsSliceTypes.default &
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

  const settings = context.get().settings.settings;
  if (!settings.image) throw new Error("You need to provide an image first");
  const newSettings = { ...jsonFile.settings, image: settings.image };

  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.imageURL)
    throw new Error("You need to provide an image first");
  const newSpriteSheet = {
    ...jsonFile.spriteSheet,
    imageURL: spriteSheet.imageURL,
  };

  if (
    (!!animations.length ||
      Object.values(spriteSheet.sprites).some(
        (sprite) => !!Object.keys(sprite.subsprites).length,
      ) ||
      normalMapSettings.strength !== 1) &&
    (!equals.deep(newSettings, settings) ||
      !equals.deep(newNormalMap, normalMap) ||
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

  context.get().settings.setSettings(newSettings);
  context.get().spriteSheet.__setSpriteSheet__(newSpriteSheet);
  context.get().normalMapSettings.setNormalMapSettings(newNormalMapSettings);
  context.get().normalMap.__setNormalMap__(newNormalMap);
  context.get().animations.__setAnimations__(newAnimations);

  context
    .get()
    .notification.setNotification("success", "JSON file loaded succesfully!");
}
