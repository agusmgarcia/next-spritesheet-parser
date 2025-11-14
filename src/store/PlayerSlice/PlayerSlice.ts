import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";

import { type AnimationsSlice } from "../AnimationsSlice";
import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
import { type State } from "./PlayerSlice.types";

export default class PlayerSlice extends GlobalSlice<
  State,
  { animations: AnimationsSlice; spriteSheetImage: SpriteSheetImageSlice }
> {
  private cancelIndexInterval: Func;

  constructor() {
    super({ animationId: "", index: 0, playing: false });

    this.cancelIndexInterval = emptyFunction;
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.slices.spriteSheetImage.subscribe(
      (state) => state.response,
      () => (this.state = { animationId: "", index: 0, playing: false }),
    );

    this.slices.animations.subscribe(
      (state) => state.response,
      (animations) => {
        if (!this.state.animationId) return;
        const animation = animations?.[this.state.animationId];

        if (!animation)
          this.state = { animationId: "", index: 0, playing: false };
        else if (animation.sprites.length >= this.state.index)
          this.state = { ...this.state, index: animation.sprites.length - 1 };
      },
    );
  }

  private get spritesLength(): number {
    return (
      this.slices.animations.response?.[this.state.animationId].sprites
        .length || 0
    );
  }

  get backwardDisabled(): boolean {
    return this.spritesLength <= 1;
  }

  backward(): void {
    if (this.backwardDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index:
        this.state.index > 0 ? this.state.index - 1 : this.spritesLength - 1,
      playing: false,
    };
  }

  get forwardDisabled(): boolean {
    return this.spritesLength <= 1;
  }

  forward(): void {
    if (this.forwardDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index:
        this.state.index < this.spritesLength - 1 ? this.state.index + 1 : 0,
      playing: false,
    };
  }

  get fps(): number {
    return this.slices.animations.response?.[this.state.animationId].fps || 0;
  }

  get minusFPSDisabled(): boolean {
    return this.fps <= 1 || this.spritesLength <= 1;
  }

  minusFPS(signal: AbortSignal): void {
    if (this.minusFPSDisabled) return;

    this.cancelIndexInterval();
    this.slices.animations.setFPS(this.state.animationId, this.fps - 1);

    if (this.state.playing) this.setIndexInterval(signal);
  }

  get plusFPSDisabled(): boolean {
    return this.spritesLength <= 1;
  }

  plusFPS(signal: AbortSignal): void {
    if (this.plusFPSDisabled) return;

    this.cancelIndexInterval();
    this.slices.animations.setFPS(this.state.animationId, this.fps + 1);

    if (this.state.playing) this.setIndexInterval(signal);
  }

  get resumeDisabled(): boolean {
    return this.spritesLength <= 1 || this.state.playing;
  }

  resume(signal: AbortSignal): void {
    if (this.resumeDisabled) return;

    this.state = { ...this.state, playing: true };
    this.setIndexInterval(signal);
  }

  setAnimationId(animationId: string, signal: AbortSignal): void {
    if (this.state.animationId === animationId) return;

    this.cancelIndexInterval();

    this.state = {
      animationId,
      index: 0,
      playing:
        (this.slices.animations.response?.[this.state.animationId].sprites
          .length || 0) > 1,
    };

    if (this.state.playing) this.setIndexInterval(signal);
  }

  get setFPSDisabled(): boolean {
    return this.spritesLength <= 1;
  }

  setFPS(fps: number, signal: AbortSignal): void {
    if (this.setFPSDisabled || this.fps === fps || fps <= 0) return;

    this.cancelIndexInterval();
    this.slices.animations.setFPS(this.state.animationId, fps);

    if (this.state.playing) this.setIndexInterval(signal);
  }

  get stopDisabled(): boolean {
    return this.spritesLength <= 1 || !this.state.playing;
  }

  stop(): void {
    if (this.stopDisabled) return;

    this.cancelIndexInterval();
    this.state = { ...this.state, playing: false };
  }

  get toFirstDisabled(): boolean {
    return this.spritesLength <= 1 || !this.state.index;
  }

  toFirst(): void {
    if (this.toFirstDisabled) return;

    this.cancelIndexInterval();
    this.state = { ...this.state, index: 0, playing: false };
  }

  get toLastDisabled(): boolean {
    return (
      this.spritesLength <= 1 || this.spritesLength - 1 === this.state.index
    );
  }

  toLast(): void {
    if (this.toLastDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index: this.spritesLength - 1,
      playing: false,
    };
  }

  private setIndexInterval(signal: AbortSignal): void {
    this.cancelIndexInterval = this.setInterval(
      () =>
        (this.state = {
          ...this.state,
          index:
            this.state.index < this.spritesLength - 1
              ? this.state.index + 1
              : 0,
        }),
      1000 / this.fps,
      signal,
    );
  }
}
