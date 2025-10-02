import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { SpriteSheetParserClient } from "#src/apis";

import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import {
  type NormalMapSettings,
  type Request,
} from "./NormalMapSettingsSlice.types";

export default class NormalMapSettingsSlice extends ServerSlice<
  NormalMapSettings | undefined,
  Request,
  { spriteSheetImage: SpriteSheetImageSlice }
> {
  constructor() {
    super(undefined);
  }

  protected override onBuildRequest(): Request {
    return {
      spriteSheetImage: !!this.slices.spriteSheetImage.response
        ? {
            id: this.slices.spriteSheetImage.response.id,
            name: this.slices.spriteSheetImage.response.name,
          }
        : undefined,
    };
  }

  protected override async onFetch(
    { spriteSheetImage }: Request,
    signal: AbortSignal,
  ): Promise<NormalMapSettings | undefined> {
    if (!spriteSheetImage) return undefined;

    const state = await SpriteSheetParserClient.INSTANCE.getState(
      { id: spriteSheetImage.id },
      signal,
    );

    if (!!state?.normalMapSettings) return state.normalMapSettings;

    return {
      colorSpace: "linear",
      filterRadius: 1,
      invertX: false,
      invertY: false,
      invertZ: false,
      name: spriteSheetImage.name,
      strength: 1,
    };
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.subscribe(
      (state) => state.response,
      (normalMapSettings, _, signal) =>
        !!this.slices.spriteSheetImage.response?.id && !!normalMapSettings
          ? SpriteSheetParserClient.INSTANCE.patchState(
              {
                id: this.slices.spriteSheetImage.response.id,
                normalMapSettings,
              },
              signal,
            )
          : undefined,
    );
  }

  setSettings(
    settings: Omit<NormalMapSettings, "name"> | Pick<NormalMapSettings, "name">,
  ): void {
    if (!("name" in settings)) {
      if (settings.strength < 1)
        throw new Error("**Strength** must be greater or equal than 1");

      if (settings.strength > 10)
        throw new Error("**Strength** must be lower or equal than 10");
    }

    if (!this.response) throw new Error("You need to provide an image first");
    this.response = { ...this.response, ...settings };
  }
}
