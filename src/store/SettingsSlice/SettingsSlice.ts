import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import type SettingsSlice from "./SettingsSlice.types";

export default createGlobalSlice<SettingsSlice>("settings", () => ({
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

function setImage(
  image: Parameters<SettingsSlice["settings"]["setImage"]>[0],
  context: CreateGlobalSliceTypes.Context<SettingsSlice>,
): void {
  URL.revokeObjectURL(context.get().settings.settings.image?.url || "");

  const url = typeof image !== "string" ? URL.createObjectURL(image) : image;

  context.set({
    settings: {
      delta: 0,
      image: { name: image.name, type: image.type, url },
      maxArea: 0.5,
      maxVariation: 0.5,
      minArea: 0,
      minDiversity: 0.33,
    },
  });
}

function setSettings(
  settings: Parameters<SettingsSlice["settings"]["setSettings"]>[0],
  context: CreateGlobalSliceTypes.Context<SettingsSlice>,
): void {
  context.set((prev) => ({
    settings: {
      ...prev.settings,
      ...(settings instanceof Function ? settings(prev.settings) : settings),
    },
  }));
}
