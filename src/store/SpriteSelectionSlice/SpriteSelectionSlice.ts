import { GlobalSlice } from "@agusmgarcia/react-essentials-store";

import { type AnimationsSlice } from "../AnimationsSlice";
import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
import { type SpriteSheetSlice } from "../SpriteSheetSlice";
import { type SpriteSelection } from "./SpriteSelectionSlice.types";

export default class SpriteSelectionSlice extends GlobalSlice<
  SpriteSelection,
  {
    animations: AnimationsSlice;
    spriteSheet: SpriteSheetSlice;
    spriteSheetImage: SpriteSheetImageSlice;
  }
> {
  constructor() {
    super([]);
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.slices.spriteSheet.subscribe(
      (state) => state.response,
      () => this.clear(),
    );

    this.slices.animations.subscribe(
      (state) => state.response?.length,
      () => this.clear(),
    );
  }

  set(spriteId: string): void {
    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet) throw new Error("You need to provide an image first");

    if (!spriteSheet[spriteId])
      throw new Error("The selected sprite is not present in the sprite sheet");

    if (this.state.includes(spriteId)) return;
    this.state = [...this.state, spriteId];
  }

  toggle(spriteId: string): void {
    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet) throw new Error("You need to provide an image first");

    if (!spriteSheet[spriteId])
      throw new Error("The selected sprite is not present in the sprite sheet");

    this.state = this.state.includes(spriteId)
      ? this.state.filter((sId) => sId !== spriteId)
      : [...this.state, spriteId];
  }

  get clearDisabled(): boolean {
    return (
      !this.slices.spriteSheetImage.response?.url ||
      this.slices.spriteSheetImage.loading ||
      this.slices.spriteSheet.loading ||
      !this.state.length
    );
  }

  clear(): void {
    if (this.clearDisabled) return;
    this.state = [];
  }
}
