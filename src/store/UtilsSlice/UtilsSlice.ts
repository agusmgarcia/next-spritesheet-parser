import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { downloadZip } from "client-zip";

import { imageDataUtils, loadImage } from "#src/utils";

import type AnimationsSlice from "../AnimationsSlice";
import type NormalMapImageSlice from "../NormalMapImageSlice";
import type NormalMapSettingsSlice from "../NormalMapSettingsSlice";
import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import type SpriteSheetSettingsSlice from "../SpriteSheetSettingsSlice";
import type SpriteSheetSlice from "../SpriteSheetSlice";
import { type Utils } from "./UtilsSlice.types";

export default class UtilsSlice extends GlobalSlice<
  Utils,
  {
    animations: AnimationsSlice;
    normalMapImage: NormalMapImageSlice;
    normalMapSettings: NormalMapSettingsSlice;
    spriteSheet: SpriteSheetSlice;
    spriteSheetImage: SpriteSheetImageSlice;
    spriteSheetSettings: SpriteSheetSettingsSlice;
  }
> {
  constructor() {
    super(undefined);
  }

  async exportZip(signal: AbortSignal): Promise<File> {
    const normalMapImage = this.slices.normalMapImage.response;
    if (!normalMapImage?.url)
      throw new Error("You need to provide an image first");

    const spriteSheetImage = this.slices.spriteSheetImage.response;
    if (!spriteSheetImage?.url)
      throw new Error("You need to provide an image first");

    const animations = this.slices.animations.state;
    const normalMapSettings = this.slices.normalMapSettings.state;
    const spriteSheet = this.slices.spriteSheet.response;
    const spriteSheetSettings = this.slices.spriteSheetSettings.state;

    return await Promise.all([
      fetch(
        "data:text/json;charset=utf-8," +
          encodeURIComponent(
            JSON.stringify({
              animations,
              spriteSheet,
              version: process.env.APP_VERSION || "0.0.0",
            }),
          ),
        { signal },
      )
        .then((response) => response.blob())
        .then((blob) => ({
          input: blob,
          lastModified: new Date(),
          name: `${spriteSheetSettings.name}.json`,
        })),

      loadImage(spriteSheetImage.url, signal)
        .then(imageDataUtils.get)
        .then((data) =>
          imageDataUtils.createFile(
            data,
            `${spriteSheetSettings.name}.${spriteSheetImage.type.replace("image/", "")}`,
            spriteSheetImage.type,
            signal,
          ),
        ),

      fetch(normalMapImage.url, { signal })
        .then((response) => response.blob())
        .then((blob) => ({
          input: blob,
          lastModified: new Date(),
          name: `${normalMapSettings.name}.normal.png`,
        })),
    ])
      .then(downloadZip)
      .then((result) => result.blob())
      .then((blob) => new File([blob], `${spriteSheetSettings.name}.zip`));
  }
}
