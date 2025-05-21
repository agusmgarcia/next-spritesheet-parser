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
import type SettingsSlice from "./SettingsSlice.types";

export default createGlobalSlice<
  SettingsSlice,
  AnimationsSliceTypes.default &
    NormalMapSliceTypes.default &
    NormalMapSettingsSliceTypes.default &
    NotificationSliceTypes.default &
    SpriteSheetSliceTypes.default
>("settings", () => ({
  setImage,
  setJSONFile,
  setSettings,
  settings: {
    delta: 0,
    image: undefined,
    maxArea: 0,
    maxVariation: 0,
    minArea: 0,
    minDiversity: 0,
  },
}));

async function setImage(
  image: Parameters<SettingsSlice["settings"]["setImage"]>[0],
  context: CreateGlobalSliceTypes.Context<
    SettingsSlice,
    AnimationsSliceTypes.default &
      NormalMapSettingsSliceTypes.default &
      NotificationSliceTypes.default &
      SpriteSheetSliceTypes.default
  >,
): Promise<void> {
  if (
    !!context.get().animations.animations.length ||
    Object.values(context.get().spriteSheet.data?.sprites || {}).some(
      (sprite) => !!Object.keys(sprite.subsprites).length,
    ) ||
    context.get().normalMapSettings.normalMapSettings.strength !== 1
  ) {
    const response = await context
      .get()
      .notification.setNotification(
        "warning",
        "By loading a new image you may loose all your progress. Are you sure you want to continue?",
      );

    if (!response) return;
  }

  URL.revokeObjectURL(context.get().settings.settings.image?.url || "");

  const settings: SettingsSlice["settings"]["settings"] = {
    delta: 0,
    image: {
      name: image.name,
      type: image.type,
      url: URL.createObjectURL(image),
    },
    maxArea: 0.5,
    maxVariation: 0.5,
    minArea: 0,
    minDiversity: 0.33,
  };

  context.set({ settings });
}

async function setJSONFile(
  jsonFile: Parameters<SettingsSlice["settings"]["setJSONFile"]>[0],
  context: CreateGlobalSliceTypes.Context<
    SettingsSlice,
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

  context.set({ settings: newSettings });
  context.get().spriteSheet.__setSpriteSheet__(newSpriteSheet);
  context.get().normalMapSettings.setNormalMapSettings(newNormalMapSettings);
  context.get().normalMap.__setNormalMap__(newNormalMap);
  context.get().animations.__setAnimations__(newAnimations);

  context
    .get()
    .notification.setNotification("success", "JSON file loaded succesfully!");
}

function setSettings(
  settings: Parameters<SettingsSlice["settings"]["setSettings"]>[0],
  context: CreateGlobalSliceTypes.Context<SettingsSlice>,
): void {
  const image = context.get().settings.settings.image;
  if (!image) throw new Error("You need to provide an image first");

  context.set((prev) => ({
    settings: {
      ...(settings instanceof Function ? settings(prev.settings) : settings),
      image,
    },
  }));
}
