import { GlobalSlice } from "@agusmgarcia/react-essentials-store";

import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import { type NormalMapSettings } from "./NormalMapSettingsSlice.types";

export default class NormalMapSettingsSlice extends GlobalSlice<
  NormalMapSettings,
  { spriteSheetImage: SpriteSheetImageSlice }
> {
  constructor() {
    super({ ...DEFAULT_SETTINGS, name: "" });
  }

  get dirty(): boolean {
    return (
      this.state.colorSpace !== DEFAULT_SETTINGS.colorSpace ||
      this.state.filterRadius !== DEFAULT_SETTINGS.filterRadius ||
      this.state.invertX !== DEFAULT_SETTINGS.invertX ||
      this.state.invertY !== DEFAULT_SETTINGS.invertY ||
      this.state.invertZ !== DEFAULT_SETTINGS.invertZ ||
      this.state.name !== (this.slices.spriteSheetImage.response?.name || "") ||
      this.state.strength !== DEFAULT_SETTINGS.strength
    );
  }

  protected override onInit(): void {
    super.onInit();

    this.slices.spriteSheetImage.subscribe(
      (state) => state.response,
      (spriteSheetImage) =>
        (this.state = {
          ...DEFAULT_SETTINGS,
          name: spriteSheetImage?.name || "",
        }),
    );
  }

  setSettings(
    settings: Omit<NormalMapSettings, "name"> | Pick<NormalMapSettings, "name">,
  ): void {
    if (!("name" in settings)) {
      if (settings.strength < 1)
        throw new Error("'Strength' must be greater or equal than 1");

      if (settings.strength > 10)
        throw new Error("'Strength' must be lower or equal than 10");
    }

    this.state = { ...this.state, ...settings };
  }
}

const DEFAULT_SETTINGS: Omit<NormalMapSettings, "name"> = {
  colorSpace: "linear",
  filterRadius: 1,
  invertX: false,
  invertY: false,
  invertZ: false,
  strength: 1,
};
