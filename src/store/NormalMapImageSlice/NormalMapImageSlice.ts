import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { imageDataUtils, loadImage } from "#src/utils";

import { type NormalMapSettingsSlice } from "../NormalMapSettingsSlice";
import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
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

  protected override onRequestBuild(): Request {
    return {
      normalMapSettings: !!this.slices.normalMapSettings.response
        ? {
            colorSpace: this.slices.normalMapSettings.response.colorSpace,
            filterRadius: this.slices.normalMapSettings.response.filterRadius,
            invertX: this.slices.normalMapSettings.response.invertX,
            invertY: this.slices.normalMapSettings.response.invertY,
            invertZ: this.slices.normalMapSettings.response.invertZ,
            strength: this.slices.normalMapSettings.response.strength,
          }
        : undefined,
      spriteSheetImage: !!this.slices.spriteSheetImage.response
        ? {
            name: this.slices.spriteSheetImage.response.name,
            url: this.slices.spriteSheetImage.response.url,
          }
        : undefined,
    };
  }

  protected override async onFetch(
    { normalMapSettings, spriteSheetImage }: Request,
    signal: AbortSignal,
  ): Promise<NormalMapImage | undefined> {
    try {
      if (!spriteSheetImage || !normalMapSettings) return undefined;

      const data = await loadImage(spriteSheetImage.url, signal)
        .then(imageDataUtils.get)
        .then((data) =>
          imageDataUtils.generateNormalMap(data, normalMapSettings, signal),
        );

      return {
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
    } finally {
      URL.revokeObjectURL(this.response?.url || "");
    }
  }
}
