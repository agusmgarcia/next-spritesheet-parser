import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { strings } from "@agusmgarcia/react-essentials-utils";

import { imageDataUtils, loadImage } from "#src/utils";

import type AnimationsSlice from "../AnimationsSlice";
import type NotificationSlice from "../NotificationSlice";
import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import SpriteSheetSlice from "../SpriteSheetSlice";
import { type SpriteSheetSettings } from "./SpriteSheetSettingsSlice.types";

export default class SpriteSheetSettingsSlice extends GlobalSlice<
  SpriteSheetSettings,
  {
    animations: AnimationsSlice;
    notification: NotificationSlice;
    spriteSheetImage: SpriteSheetImageSlice;
  }
> {
  constructor() {
    super({ ...DEFAULT_SETTINGS, name: "" });
  }

  get dirty(): boolean {
    return (
      this.state.delta !== DEFAULT_SETTINGS.delta ||
      this.state.maxVariation !== DEFAULT_SETTINGS.maxVariation ||
      this.state.minDiversity !== DEFAULT_SETTINGS.minDiversity ||
      this.state.name !== (this.slices.spriteSheetImage.response?.name || "")
    );
  }

  protected override onInit(): void {
    super.onInit();

    this.slices.spriteSheetImage.subscribe(
      (state) => state.response,
      (spriteSheetImage) =>
        (this.state = {
          ...DEFAULT_SETTINGS,
          name: spriteSheetImage?.name || "",
        }),
    );
  }

  async setSettings(
    settings:
      | Omit<SpriteSheetSettings, "name">
      | Pick<SpriteSheetSettings, "name">,
    signal: AbortSignal,
  ): Promise<boolean> {
    if ("name" in settings) {
      this.state = { ...this.state, name: settings.name };
      return true;
    }

    const spriteSheetImage = this.slices.spriteSheetImage.response;
    if (!spriteSheetImage?.url)
      throw new Error("You need to provide an image first");

    if (settings.delta < 1)
      throw new Error("'Delta' must be greater or equal than 1");

    if (settings.delta > 20)
      throw new Error("'Delta' must be lower or equal than 20");

    if (settings.maxVariation < 0.01)
      throw new Error("'Max variation' must be greater or equal than 0.01");

    if (settings.maxVariation > 1)
      throw new Error("'Max variation' must be lower or equal than 1");

    if (settings.minDiversity < 0.01)
      throw new Error("'Min diversity' must be greater or equal than 0.01");

    if (settings.minDiversity > 1)
      throw new Error("'Min diversity' must be lower or equal than 1");

    const spriteIds = await loadImage(spriteSheetImage.url, signal)
      .then(imageDataUtils.get)
      .then((data) => SpriteSheetSlice.getSprites(data, settings, signal))
      .then((sprites) => Object.keys(sprites));

    const animationsThatDoesntContainAtLeastOneSprite =
      this.slices.animations.state.filter((a) =>
        a.sprites.some((s) => !spriteIds.includes(s.id)),
      );

    if (!!animationsThatDoesntContainAtLeastOneSprite.length) {
      const response = await this.slices.notification.set(
        "warning",
        strings.replace(
          "By modifying this settings, the following ${animations?animation:animations}: ${animationsName} ${animations?is:are} going to be deleted. Are you sure you want to continue?",
          {
            animations: animationsThatDoesntContainAtLeastOneSprite.length,
            animationsName: animationsThatDoesntContainAtLeastOneSprite
              .map((a) => `**"${a.name}"**`)
              .join(", "),
          },
        ),
        signal,
      );

      if (!response) return false;
    }

    this.state = { ...settings, name: this.state.name };
    return true;
  }
}

const DEFAULT_SETTINGS: Omit<SpriteSheetSettings, "name"> = {
  delta: 5,
  maxVariation: 0.25,
  minDiversity: 0.2,
};
