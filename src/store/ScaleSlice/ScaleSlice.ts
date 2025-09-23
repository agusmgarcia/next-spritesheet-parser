import { GlobalSlice } from "@agusmgarcia/react-essentials-store";

import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import { type Scale } from "./ScaleSlice.types";

export default class ScaleSlice extends GlobalSlice<
  Scale,
  { spriteSheetImage: SpriteSheetImageSlice }
> {
  constructor() {
    super(1);
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.slices.spriteSheetImage.subscribe(
      (state) => state.response,
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
