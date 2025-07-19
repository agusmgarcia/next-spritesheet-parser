import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { equals } from "@agusmgarcia/react-essentials-utils";
import { downloadZip } from "client-zip";

import { imageDataUtils, loadImage } from "#src/utils";

import type AnimationsSlice from "../AnimationsSlice";
import { type AnimationsSliceTypes } from "../AnimationsSlice";
import type NormalMapSlice from "../NormalMapSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import type NotificationSlice from "../NotificationSlice";
import type SpriteSheetSlice from "../SpriteSheetSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";

export default class UtilsSlice extends GlobalSlice<
  undefined,
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

  async exportZip(): Promise<File> {
    const animations = this.slices.animations.state;

    const normalMap = this.slices.normalMap.response;
    if (!normalMap?.image.url)
      throw new Error("You need to provide an image first");

    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

    const baseName = spriteSheet.image.name || "Sprite sheet";

    return await Promise.all([
      fetch(
        "data:text/json;charset=utf-8," +
          encodeURIComponent(
            JSON.stringify({
              animations,
              normalMap,
              spriteSheet,
              version: process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0",
            }),
          ),
      )
        .then((response) => response.blob())
        .then((blob) => ({
          input: blob,
          lastModified: new Date(),
          name: `${baseName}.json`,
        })),

      loadImage(spriteSheet.image.url)
        .then(imageDataUtils.get)
        .then((data) =>
          imageDataUtils.createFile(
            data,
            `${baseName}.${spriteSheet.image.type.replace("image/", "")}`,
            spriteSheet.image.type,
          ),
        ),

      fetch(normalMap.image.url)
        .then((response) => response.blob())
        .then((blob) => ({
          input: blob,
          lastModified: new Date(),
          name: `${baseName}.normal.png`,
        })),
    ])
      .then(downloadZip)
      .then((result) => result.blob())
      .then((blob) => new File([blob], `${baseName}.zip`));
  }

  async importJSONFile(jsonFile: {
    animations: AnimationsSliceTypes.Animations;
    normalMap: {
      image: Pick<NormalMapSliceTypes.NormalMap["image"], "name">;
      settings: NormalMapSliceTypes.NormalMap["settings"];
    };
    spriteSheet: {
      image: Pick<SpriteSheetSliceTypes.SpriteSheet["image"], "name">;
      settings: SpriteSheetSliceTypes.SpriteSheet["settings"];
      sprites: SpriteSheetSliceTypes.SpriteSheet["sprites"];
    };
  }): Promise<void> {
    const animations = this.slices.animations.state;
    const newAnimations = jsonFile.animations;

    const normalMap = this.slices.normalMap.response;
    if (!normalMap?.image.url)
      throw new Error("You need to provide an image first");
    const newNormalMap = {
      ...jsonFile.normalMap,
      image: { ...normalMap.image, name: jsonFile.normalMap.image.name },
    };

    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");
    const newSpriteSheet = {
      ...jsonFile.spriteSheet,
      image: { ...spriteSheet.image, name: jsonFile.spriteSheet.image.name },
    };

    if (
      this.isDirty() &&
      (!equals.deep(newNormalMap, normalMap) ||
        !equals.deep(newSpriteSheet, spriteSheet) ||
        !equals.deep(newAnimations, animations))
    ) {
      const response = await this.slices.notification.set(
        "warning",
        "By loading a new JSON file you may loose all your progress. Are you sure you want to continue?",
      );

      if (!response) return;
    }

    await this.slices.spriteSheet.setSettings(newSpriteSheet.settings);
    this.slices.spriteSheet.setSprites(newSpriteSheet.sprites);
    this.slices.spriteSheet.setName(newSpriteSheet.image.name);

    await this.slices.normalMap.setSettings(newNormalMap.settings);
    this.slices.normalMap.setName(newNormalMap.image.name);

    await this.slices.animations.setAnimations(newAnimations);

    await this.slices.notification.set(
      "success",
      "JSON file loaded succesfully!",
    );
  }

  isDirty(): boolean {
    return (
      this.slices.animations.dirty ||
      this.slices.spriteSheet.dirty ||
      this.slices.normalMap.dirty
    );
  }
}
