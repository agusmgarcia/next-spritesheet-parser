import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { imageDataUtils, loadImage } from "#src/utils";

import type AnimationsSlice from "../AnimationsSlice";
import type NormalMapSettingsSlice from "../NormalMapSettingsSlice";
import type NotificationSlice from "../NotificationSlice";
import type SpriteSheetSettingsSlice from "../SpriteSheetSettingsSlice";
import type SpriteSheetSlice from "../SpriteSheetSlice";
import {
  type Request,
  type SpriteSheetImage,
} from "./SpriteSheetImageSlice.types";

export default class SpriteSheetImageSlice extends ServerSlice<
  SpriteSheetImage | undefined,
  Request,
  {
    animations: AnimationsSlice;
    normalMapSettings: NormalMapSettingsSlice;
    notification: NotificationSlice;
    spriteSheet: SpriteSheetSlice;
    spriteSheetSettings: SpriteSheetSettingsSlice;
  }
> {
  constructor() {
    super(undefined);
  }

  get dirty(): boolean {
    return !!this.response;
  }

  protected override async onFetch(
    image: Request,
    signal: AbortSignal,
  ): Promise<SpriteSheetImage | undefined> {
    const rawImageURL = URL.createObjectURL(image);

    try {
      const rawImageData = await loadImage(rawImageURL, signal).then(
        imageDataUtils.get,
      );

      const backgroundColor = imageDataUtils.getBackgroundColor(rawImageData);

      const url = await imageDataUtils
        .removeBackground(rawImageData, signal)
        .then((data) =>
          imageDataUtils.createFile(data, image.name, image.type, signal),
        )
        .then((file) => URL.createObjectURL(file));

      const id = await imageDataUtils.getHash(rawImageData, signal);

      URL.revokeObjectURL(this.response?.url || "");

      return {
        backgroundColor,
        height: rawImageData.height,
        id,
        name: `${image.name.split(".").slice(0, -1).join(".")}`,
        type: image.type,
        url,
        width: rawImageData.width,
      };
    } finally {
      URL.revokeObjectURL(rawImageURL);
    }
  }

  async removeImage(signal: AbortSignal): Promise<void> {
    if (
      this.slices.animations.dirty ||
      this.slices.normalMapSettings.dirty ||
      this.slices.spriteSheet.dirty ||
      this.slices.spriteSheetSettings.dirty
    ) {
      const response = await this.slices.notification.set(
        "warning",
        "By removing the image you may loose all your progress. Are you sure you want to continue?",
        signal,
      );

      if (!response) return;
    }

    this.response = undefined;
  }

  async setImage(image: File, signal: AbortSignal): Promise<void> {
    if (
      this.slices.animations.dirty ||
      this.slices.normalMapSettings.dirty ||
      this.slices.spriteSheet.dirty ||
      this.slices.spriteSheetSettings.dirty
    ) {
      const response = await this.slices.notification.set(
        "warning",
        "By loading a new image you may loose all your progress. Are you sure you want to continue?",
        signal,
      );

      if (!response) return;
    }

    await this.reload(image, signal);
  }
}
