import { GlobalSlice } from "@agusmgarcia/react-essentials-store";

import type SpriteSheetSlice from "../SpriteSheetSlice";
import { type Scale } from "./ScaleSlice.types";

export default class ScaleSlice extends GlobalSlice<
  Scale,
  { spriteSheet: SpriteSheetSlice }
> {
  constructor() {
    super(1);
  }

  get dirty(): boolean {
    return this.state !== 1;
  }

  protected override onInit(): void {
    super.onInit();

    this.slices.spriteSheet.subscribe(
      (state) => state.response?.image.url,
      () => this.set(1),
    );
  }

  set(scale: React.SetStateAction<number>): void {
    this.state = Math.max(
      scale instanceof Function ? scale(this.state) : scale,
      1,
    );
  }
}
