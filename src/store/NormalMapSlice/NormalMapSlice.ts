import { ServerSlice } from "@agusmgarcia/react-essentials-store";
import { equals } from "@agusmgarcia/react-essentials-utils";

import { imageDataUtils, loadImage } from "#src/utils";

import type SpriteSheetSlice from "../SpriteSheetSlice";
import { type NormalMap, type Request } from "./NormalMapSlice.types";

export default class NormalMapSlice extends ServerSlice<
  NormalMap,
  Request,
  { spriteSheet: SpriteSheetSlice }
> {
  constructor() {
    super(undefined);
  }

  get dirty(): boolean {
    return (
      !!this.response?.image.url &&
      !equals.deep(this.response.settings, DEFAULT_SETTINGS)
    );
  }

  protected override onInit(): void {
    super.onInit();

    this.slices.spriteSheet.subscribe(
      (state) => state.response?.image.url || "",
      (spriteSheetImageURL) =>
        this.reload({ settings: DEFAULT_SETTINGS, spriteSheetImageURL }),
    );
  }

  protected override async onFetch(
    { settings, spriteSheetImageURL }: Request,
    signal: AbortSignal,
  ): Promise<NormalMap | undefined> {
    if (!spriteSheetImageURL) {
      URL.revokeObjectURL(this.response?.image.url || "");
      return undefined;
    }

    const spriteSheetName = this.slices.spriteSheet.response?.image.name;
    if (!spriteSheetName) throw new Error("Unexpected error");

    const data = await loadImage(spriteSheetImageURL, signal)
      .then(imageDataUtils.get)
      .then((i) => imageDataUtils.generateNormalMap(i, settings, signal));

    const image = {
      backgroundColor: "#8080ff",
      height: data.height,
      name: spriteSheetName,
      type: "image/png",
      url: await imageDataUtils
        .createFile(data, `${spriteSheetName}.normal.png`, "image/png", signal)
        .then((file) => URL.createObjectURL(file)),
      width: data.width,
    };

    URL.revokeObjectURL(this.response?.image.url || "");
    return { image, settings };
  }

  setName(name: string): void {
    if (!this.response?.image.url)
      throw new Error("You need to provide an image first");

    this.response = {
      ...this.response,
      image: { ...this.response.image, name },
    };
  }

  async setSettings(settings: NormalMap["settings"]): Promise<void> {
    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

    if (!this.response?.image.url)
      throw new Error("You need to provide an image first");

    if (settings.strength < 1)
      throw new Error("'Strength' must be greater or equal than 1");

    if (settings.strength > 10)
      throw new Error("'Strength' must be lower or equal than 10");

    await this.reload({ settings, spriteSheetImageURL: spriteSheet.image.url });
  }
}

const DEFAULT_SETTINGS: NormalMap["settings"] = {
  colorSpace: "linear",
  filterRadius: 1,
  invertX: false,
  invertY: false,
  invertZ: false,
  strength: 1,
};
