import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { filters } from "@agusmgarcia/react-essentials-utils";
import { downloadZip } from "client-zip";

import { imageDataUtils, loadImage, stackRectangles } from "#src/utils";

import { type AnimationsSlice } from "../AnimationsSlice";
import { type NormalMapImageSlice } from "../NormalMapImageSlice";
import { type NormalMapSettingsSlice } from "../NormalMapSettingsSlice";
import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
import { type SpriteSheetSettingsSlice } from "../SpriteSheetSettingsSlice";
import { type SpriteSheetSlice } from "../SpriteSheetSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
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
    super({ loading: false });
  }

  get exportZipDisabled(): boolean {
    return (
      this.state.loading ||
      !this.slices.spriteSheetImage.response?.url ||
      this.slices.spriteSheetImage.loading ||
      this.slices.spriteSheet.loading ||
      !this.slices.normalMapImage.response?.url ||
      this.slices.normalMapImage.loading
    );
  }

  async exportZip(signal: AbortSignal): Promise<File | undefined> {
    if (this.exportZipDisabled) return;
    this.state.loading = true;

    try {
      const normalMapImage = this.slices.normalMapImage.response;
      if (!normalMapImage?.url)
        throw new Error("You need to provide an image first");

      const spriteSheetImage = this.slices.spriteSheetImage.response;
      if (!spriteSheetImage?.url)
        throw new Error("You need to provide an image first");

      const animations = this.slices.animations.response;
      if (!animations) throw new Error("You need to provide an image first");

      const repeatedAnimationName = animations.find((a1) =>
        animations.some((a2) => a1 !== a2 && a1.name === a2.name),
      )?.name;
      if (!!repeatedAnimationName)
        throw new Error(
          `There is already an animation called **${repeatedAnimationName}**`,
        );

      const normalMapSettings = this.slices.normalMapSettings.response;
      if (!normalMapSettings)
        throw new Error("You need to provide an image first");

      const spriteSheet = this.slices.spriteSheet.response;
      if (!spriteSheet) throw new Error("You need to provide an image first");

      const spriteSheetSettings = this.slices.spriteSheetSettings.response;
      if (!spriteSheetSettings)
        throw new Error("You need to provide an image first");

      if (!spriteSheetSettings.name)
        throw new Error("The name of the sprite sheet cannot be empty");

      const { length, rectangles: updatedSpriteSheet } = stackRectangles(
        animations
          .flatMap((a) => a.sprites)
          .map((sprites) => sprites.id)
          .filter(filters.distinct)
          .map((id) => ({
            ...spriteSheet[id],
            id,
            xOld: spriteSheet[id].x,
            yOld: spriteSheet[id].y,
          })),
      );

      const imageData = await createImageData(
        spriteSheetImage.url,
        updatedSpriteSheet,
        length,
        signal,
      );

      return await Promise.all([
        fetch(
          "data:text/json;charset=utf-8," +
            encodeURIComponent(
              JSON.stringify({
                animations: animations.reduce(
                  (result, animation) => {
                    result[animation.name] = {
                      fps: animation.fps,
                      sprites: animation.sprites.map((s) => ({
                        id: s.id,
                        offsetX: s.center.offsetX,
                        offsetY: s.center.offsetY,
                      })),
                    };
                    return result;
                  },
                  {} as Record<string, any>,
                ),
                spriteSheet: updatedSpriteSheet.reduce(
                  (result, sprite) => {
                    result[sprite.id] = {
                      height: sprite.height,
                      width: sprite.width,
                      x: sprite.x,
                      y: sprite.y,
                    };
                    return result;
                  },
                  {} as Record<string, any>,
                ),
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

        imageDataUtils.createFile(
          imageData,
          `${spriteSheetSettings.name}.${spriteSheetImage.type.replace("image/", "")}`,
          spriteSheetImage.type,
          signal,
        ),

        imageDataUtils
          .generateNormalMap(imageData, normalMapSettings, signal)
          .then((normalMapImageData) =>
            imageDataUtils.createFile(
              normalMapImageData,
              `${normalMapSettings.name || spriteSheetSettings.name}.normal.png`,
              "image/png",
              signal,
            ),
          ),
      ])
        .then(downloadZip)
        .then((result) => result.blob())
        .then((blob) => new File([blob], `${spriteSheetSettings.name}.zip`));
    } finally {
      this.state.loading = false;
    }
  }
}

async function createImageData(
  spriteSheetImageURL: string,
  sprites: (SpriteSheetSliceTypes.SpriteSheet[string] & {
    xOld: number;
    yOld: number;
  })[],
  length: number,
  signal: AbortSignal,
): Promise<ImageData> {
  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Context is not available");

  context.imageSmoothingEnabled = false;
  context.imageSmoothingQuality = "high";

  canvas.width = length;
  canvas.height = length;
  context.clearRect(0, 0, canvas.width, canvas.height);

  const image = await loadImage(spriteSheetImageURL, signal);

  for (const sprite of sprites) {
    context.drawImage(
      image,
      sprite.xOld,
      sprite.yOld,
      sprite.width,
      sprite.height,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
    );
  }

  return context.getImageData(0, 0, canvas.width, canvas.height);
}
