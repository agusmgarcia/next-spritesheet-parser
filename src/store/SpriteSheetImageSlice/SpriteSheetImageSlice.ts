import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { SpriteSheetParserClient } from "#src/apis";
import { imageDataUtils, loadImage } from "#src/utils";

import { type NotificationSlice } from "../NotificationSlice";
import {
  type Request,
  type SpriteSheetImage,
} from "./SpriteSheetImageSlice.types";

export default class SpriteSheetImageSlice extends ServerSlice<
  SpriteSheetImage | undefined,
  Request,
  { notification: NotificationSlice }
> {
  constructor() {
    super(undefined);
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

      const state = await SpriteSheetParserClient.INSTANCE.getState(
        { id },
        signal,
      );

      if (!!state) {
        const response = await this.slices.notification.set(
          "warning",
          "A backup copy was found. Do you want to load it and resume your work?",
          signal,
        );

        if (!response)
          await SpriteSheetParserClient.INSTANCE.deleteState({ id }, signal);
      }

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
    const response = await this.slices.notification.set(
      "warning",
      "By removing the image you may loose all your progress. Are you sure you want to continue?",
      signal,
    );

    if (!response) return;

    if (!!this.response?.id)
      await SpriteSheetParserClient.INSTANCE.deleteState(
        { id: this.response.id },
        signal,
      );

    this.response = undefined;
  }

  async setImage(image: File, signal: AbortSignal): Promise<void> {
    await this.reloadWithRequest(image, undefined, signal);
  }
}
