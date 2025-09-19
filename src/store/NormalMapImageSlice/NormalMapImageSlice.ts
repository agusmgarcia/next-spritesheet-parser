import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { imageDataUtils, loadImage } from "#src/utils";

import type NormalMapSettingsSlice from "../NormalMapSettingsSlice";
import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import { type NormalMapImage, type Request } from "./NormalMapImageSlice.types";

export default class NormalMapImageSlice extends ServerSlice<
  NormalMapImage | undefined,
  Request,
  {
    normalMapSettings: NormalMapSettingsSlice;
    spriteSheetImage: SpriteSheetImageSlice;
  }
> {
  constructor() {
    super(undefined);
  }

  get dirty(): boolean {
    return !!this.response;
  }

  protected override onBuildRequest(): Request {
    return {
      settings: {
        colorSpace: this.slices.normalMapSettings.state.colorSpace,
        filterRadius: this.slices.normalMapSettings.state.filterRadius,
        invertX: this.slices.normalMapSettings.state.invertX,
        invertY: this.slices.normalMapSettings.state.invertY,
        invertZ: this.slices.normalMapSettings.state.invertZ,
        strength: this.slices.normalMapSettings.state.strength,
      },
      spriteSheetImage: this.slices.spriteSheetImage.response,
    };
  }

  protected override async onFetch(
    { settings, spriteSheetImage }: Request,
    signal: AbortSignal,
  ): Promise<NormalMapImage | undefined> {
    if (!spriteSheetImage?.url) {
      URL.revokeObjectURL(this.response?.url || "");
      return undefined;
    }

    const data = await loadImage(spriteSheetImage.url, signal)
      .then(imageDataUtils.get)
      .then((i) => imageDataUtils.generateNormalMap(i, settings, signal));

    const image = {
      backgroundColor: "#8080ff",
      height: data.height,
      type: "image/png",
      url: await imageDataUtils
        .createFile(
          data,
          `${spriteSheetImage.name}.normal.png`,
          "image/png",
          signal,
        )
        .then((file) => URL.createObjectURL(file)),
      width: data.width,
    };

    URL.revokeObjectURL(this.response?.url || "");
    return image;
  }
}
