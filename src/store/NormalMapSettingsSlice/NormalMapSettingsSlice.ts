import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type NormalMapSettingsSlice from "./NormalMapSettingsSlice.types";

export default createGlobalSlice<
  NormalMapSettingsSlice,
  SpriteSheetSliceTypes.default
>("normalMapSettings", (subscribe) => {
  subscribe(
    (context) =>
      context.get().normalMapSettings.setNormalMapSettings({ strength: 1 }),
    (state) => state.spriteSheet.data?.image.url,
  );

  return {
    normalMapSettings: { strength: 1 },
    setNormalMapSettings,
  };
});

function setNormalMapSettings(
  normalMapSettings: Parameters<
    NormalMapSettingsSlice["normalMapSettings"]["setNormalMapSettings"]
  >[0],
  context: CreateGlobalSliceTypes.Context<NormalMapSettingsSlice>,
): void {
  context.set((prev) => ({
    normalMapSettings:
      normalMapSettings instanceof Function
        ? normalMapSettings(prev.normalMapSettings)
        : normalMapSettings,
  }));
}
