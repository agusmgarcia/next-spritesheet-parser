import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NotificationSliceTypes } from "../NotificationSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type SettingsSlice from "./SettingsSlice.types";

export default createGlobalSlice<
  SettingsSlice,
  AnimationsSliceTypes.default &
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
    AnimationsSliceTypes.default & NotificationSliceTypes.default
  >,
): Promise<void> {
  if (!!context.get().animations.animations.length) {
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
      url: typeof image !== "string" ? URL.createObjectURL(image) : image,
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
      NotificationSliceTypes.default &
      SpriteSheetSliceTypes.default
  >,
): Promise<void> {
  const image = context.get().settings.settings.image;
  if (!image) throw new Error("You need to provide an image first");

  const existingAnimations = !!context.get().animations.animations.length;
  if (existingAnimations) {
    const response = await context
      .get()
      .notification.setNotification(
        "warning",
        "By loading a new JSON file you may loose all your progress. Are you sure you want to continue?",
      );

    if (!response) return;
  }

  context.set({ settings: { ...jsonFile.settings, image } });
  context.get().spriteSheet.__setSpriteSheet__(jsonFile.spriteSheet);
  context.get().animations.__setAnimations__(jsonFile.animations);

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
