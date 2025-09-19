import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { downloadZip } from "client-zip";

import { imageDataUtils, loadImage } from "#src/utils";

import type AnimationsSlice from "../AnimationsSlice";
import { type AnimationsSliceTypes } from "../AnimationsSlice";
import type NormalMapSlice from "../NormalMapSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import type NotificationSlice from "../NotificationSlice";
import type SpriteSheetSlice from "../SpriteSheetSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import { type Utils } from "./UtilsSlice.types";

export default class UtilsSlice extends GlobalSlice<
  Utils,
  {
    animations: AnimationsSlice;
    normalMap: NormalMapSlice;
    notification: NotificationSlice;
    spriteSheet: SpriteSheetSlice;
  }
> {
  constructor() {
    super(undefined);
  }

  async importJSON(jsonFile: {
    animations: AnimationsSliceTypes.Animations;
    normalMap: NormalMapSliceTypes.NormalMap;
    spriteSheet: SpriteSheetSliceTypes.SpriteSheet;
  }): Promise<void> {
    if (
      this.slices.animations.dirty ||
      this.slices.normalMap.dirty ||
      this.slices.spriteSheet.dirty
    ) {
      const response = await this.slices.notification.set(
        "warning",
        "By loading a new JSON file you may loose all your progress. Are you sure you want to continue?",
      );

      if (!response) return;
    }

    await this.slices.spriteSheet.setSettings(jsonFile.spriteSheet.settings);
    this.slices.spriteSheet.setSprites(jsonFile.spriteSheet.sprites);
    this.slices.spriteSheet.setName(jsonFile.spriteSheet.image.name);

    await this.slices.normalMap.setSettings(jsonFile.normalMap.settings);
    this.slices.normalMap.setName(jsonFile.normalMap.image.name);

    await this.slices.animations.setAnimations(jsonFile.animations);

    await this.slices.notification.set(
      "success",
      "JSON file loaded succesfully!",
    );
  }

  async exportZip(): Promise<File> {
    const animations = this.slices.animations.state;

    const normalMap = this.slices.normalMap.response;
    if (!normalMap?.image.url)
      throw new Error("You need to provide an image first");

    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

    return await Promise.all([
      fetch(
        "data:text/json;charset=utf-8," +
          encodeURIComponent(
            JSON.stringify({
              animations,
              normalMap,
              spriteSheet,
              version: process.env.APP_VERSION || "0.0.0",
            }),
          ),
      )
        .then((response) => response.blob())
        .then((blob) => ({
          input: blob,
          lastModified: new Date(),
          name: `${spriteSheet.image.name}.json`,
        })),

      loadImage(spriteSheet.image.url)
        .then(imageDataUtils.get)
        .then((data) =>
          imageDataUtils.createFile(
            data,
            `${spriteSheet.image.name}.${spriteSheet.image.type.replace("image/", "")}`,
            spriteSheet.image.type,
          ),
        ),

      fetch(normalMap.image.url)
        .then((response) => response.blob())
        .then((blob) => ({
          input: blob,
          lastModified: new Date(),
          name: `${normalMap.image.name}.normal.png`,
        })),
    ])
      .then(downloadZip)
      .then((result) => result.blob())
      .then((blob) => new File([blob], `${spriteSheet.image.name}.zip`));
  }
}
