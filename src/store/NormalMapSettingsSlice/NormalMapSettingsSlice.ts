import { GlobalSlice } from "@agusmgarcia/react-essentials-store";

import type NormalMapImageSlice from "../NormalMapImageSlice";
import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import { type NormalMapSettings } from "./NormalMapSettingsSlice.types";

export default class NormalMapSettingsSlice extends GlobalSlice<
  NormalMapSettings,
  {
    normalMapImage: NormalMapImageSlice;
    spriteSheetImage: SpriteSheetImageSlice;
  }
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
      this.state.name !== (this.slices.normalMapImage.response?.name || "") ||
      this.state.strength !== DEFAULT_SETTINGS.strength
    );
  }

  protected override onInit(): void {
    super.onInit();

    this.slices.spriteSheetImage.subscribe(
      (state) => state.response,
      () => (this.state = { ...DEFAULT_SETTINGS, name: "" }),
    );

    this.slices.normalMapImage.subscribe(
      (state) => state.response,
      (normalMapImage) =>
        (this.state = { ...this.state, name: normalMapImage?.name || "" }),
    );
  }

  setName(name: string): void {
    this.state = { ...this.state, name };
  }

  async setSettings(settings: Omit<NormalMapSettings, "name">): Promise<void> {
    if (settings.strength < 1)
      throw new Error("'Strength' must be greater or equal than 1");

    if (settings.strength > 10)
      throw new Error("'Strength' must be lower or equal than 10");

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
