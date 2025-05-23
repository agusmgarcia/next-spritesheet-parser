import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type NotificationSliceTypes } from "../NotificationSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type SettingsSlice from "./SettingsSlice.types";

export default createGlobalSlice<
  SettingsSlice,
  AnimationsSliceTypes.default &
    NormalMapSettingsSliceTypes.default &
    NotificationSliceTypes.default &
    SpriteSheetSliceTypes.default
>("settings", () => ({
  setImage,
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
