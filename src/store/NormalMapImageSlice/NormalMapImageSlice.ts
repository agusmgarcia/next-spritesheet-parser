import { ServerSlice } from "@agusmgarcia/react-essentials-store";
import { equals } from "@agusmgarcia/react-essentials-utils";

import { imageDataUtils, loadImage } from "#src/utils";

import type NormalMapSettingsSlice from "../NormalMapSettingsSlice";
import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import { type NormalMapImage, type Request } from "./NormalMapImageSlice.types";

export default class NormalMapImageSlice extends ServerSlice<
  NormalMapImage,
  Request,
  {
    normalMapSettings: NormalMapSettingsSlice;
    spriteSheetImage: SpriteSheetImageSlice;
  }
> {
  constructor() {
    super();
  }

  get dirty(): boolean {
    return !!this.response;
  }

  protected override onInit(): void {
    super.onInit();

    this.slices.spriteSheetImage.subscribe(
      (state) => state.response,
      (spriteSheetImage) =>
        this.reload({
          settings: this.slices.normalMapSettings.state,
          spriteSheetImage,
        }),
    );

    this.slices.normalMapSettings.subscribe(
      (state) => ({
        colorSpace: state.colorSpace,
        filterRadius: state.filterRadius,
        invertX: state.invertX,
        invertY: state.invertY,
        invertZ: state.invertZ,
        strength: state.strength,
      }),
      (settings) =>
        this.reload({
          settings,
          spriteSheetImage: this.slices.spriteSheetImage.response,
        }),
      equals.shallow,
    );
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
      name: spriteSheetImage.name,
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
