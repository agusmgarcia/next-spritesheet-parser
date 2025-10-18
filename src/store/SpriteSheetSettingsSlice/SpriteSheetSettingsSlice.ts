import { ServerSlice } from "@agusmgarcia/react-essentials-store";
import { strings } from "@agusmgarcia/react-essentials-utils";

import { SpriteSheetParserClient } from "#src/apis";
import { imageDataUtils, loadImage } from "#src/utils";

import { type AnimationsSlice } from "../AnimationsSlice";
import { type NotificationSlice } from "../NotificationSlice";
import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
import { SpriteSheetSlice } from "../SpriteSheetSlice";
import {
  type Request,
  type SpriteSheetSettings,
} from "./SpriteSheetSettingsSlice.types";

export default class SpriteSheetSettingsSlice extends ServerSlice<
  SpriteSheetSettings | undefined,
  Request,
  {
    animations: AnimationsSlice;
    notification: NotificationSlice;
    spriteSheetImage: SpriteSheetImageSlice;
  }
> {
  constructor() {
    super(undefined);
  }

  protected override onBuildRequest(): Request {
    return {
      spriteSheetImage: !!this.slices.spriteSheetImage.response
        ? {
            id: this.slices.spriteSheetImage.response.id,
            name: this.slices.spriteSheetImage.response.name,
          }
        : undefined,
    };
  }

  protected override async onFetch(
    { spriteSheetImage }: Request,
    signal: AbortSignal,
  ): Promise<SpriteSheetSettings | undefined> {
    if (!spriteSheetImage) return undefined;

    const state = await SpriteSheetParserClient.INSTANCE.getState(
      { id: spriteSheetImage.id },
      signal,
    );

    if (!!state?.spriteSheetSettings) return state.spriteSheetSettings;

    return {
      delta: 5,
      maxVariation: 0.25,
      minDiversity: 0.2,
      name: spriteSheetImage.name,
    };
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.subscribe(
      (state) => state.response,
      (spriteSheetSettings, _, signal) =>
        !!this.slices.spriteSheetImage.response?.id && !!spriteSheetSettings
          ? SpriteSheetParserClient.INSTANCE.patchState(
              {
                id: this.slices.spriteSheetImage.response.id,
                spriteSheetSettings,
              },
              signal,
            )
          : undefined,
    );
  }

  async setSettings(
    settings:
      | Omit<SpriteSheetSettings, "name">
      | Pick<SpriteSheetSettings, "name">,
    signal: AbortSignal,
  ): Promise<boolean> {
    if ("name" in settings) {
      if (!this.response) throw new Error("You need to provide an image first");
      this.response = { ...this.response, name: settings.name };
      return true;
    }

    const spriteSheetImage = this.slices.spriteSheetImage.response;
    if (!spriteSheetImage?.url)
      throw new Error("You need to provide an image first");

    if (settings.delta < 1)
      throw new Error("**Delta** must be greater or equal than 1");

    if (settings.delta > 20)
      throw new Error("**Delta** must be lower or equal than 20");

    if (settings.maxVariation < 0.01)
      throw new Error("**Max variation** must be greater or equal than 0.01");

    if (settings.maxVariation > 1)
      throw new Error("**Max variation** must be lower or equal than 1");

    if (settings.minDiversity < 0.01)
      throw new Error("**Min diversity** must be greater or equal than 0.01");

    if (settings.minDiversity > 1)
      throw new Error("**Min diversity** must be lower or equal than 1");

    const spriteIds = await loadImage(spriteSheetImage.url, signal)
      .then(imageDataUtils.get)
      .then((data) => SpriteSheetSlice.getSprites(data, settings, signal))
      .then((sprites) => Object.keys(sprites));

    const animations = this.slices.animations.response;
    if (!animations) return false;

    const animationsThatDoesntContainAtLeastOneSprite = animations.filter((a) =>
      a.sprites.some((s) => !spriteIds.includes(s.id)),
    );

    if (!!animationsThatDoesntContainAtLeastOneSprite.length) {
      const response = await this.slices.notification.set(
        "warning",
        strings.replace(
          "By modifying this settings, the ${animations?animation:animations}: ${animationsName} ${animations?is:are} going to be deleted. Are you sure you want to continue?",
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

    if (!this.response) return false;
    this.response = { ...settings, name: this.response.name };
    return true;
  }
}
