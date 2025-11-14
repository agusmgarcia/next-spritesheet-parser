import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";

import { type AnimationsSlice } from "../AnimationsSlice";
import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
import { type State } from "./AnimationSlice.types";

export default class AnimationSlice extends GlobalSlice<
  State,
  { animations: AnimationsSlice; spriteSheetImage: SpriteSheetImageSlice }
> {
  private cancelIndexInterval: Func;

  constructor() {
    super({ id: "", index: 0, playing: false });

    this.cancelIndexInterval = emptyFunction;
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.slices.spriteSheetImage.subscribe(
      (state) => state.response,
      () => (this.state = { id: "", index: 0, playing: false }),
    );

    this.slices.animations.subscribe(
      (state) => state.response,
      (animations) => {
        if (!this.state.id) return;
        const animation = animations?.[this.state.id];

        if (!animation) this.state = { id: "", index: 0, playing: false };
        else if (animation.sprites.length >= this.state.index)
          this.state = { ...this.state, index: animation.sprites.length - 1 };
      },
    );
  }

  private get spritesLength(): number {
    return this.slices.animations.response?.[this.state.id].sprites.length || 0;
  }

  get backwardIndexDisabled(): boolean {
    return this.spritesLength <= 1;
  }

  backwardIndex(): void {
    if (this.backwardIndexDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index:
        this.state.index > 0 ? this.state.index - 1 : this.spritesLength - 1,
      playing: false,
    };
  }

  get forwardIndexDisabled(): boolean {
    return this.spritesLength <= 1;
  }

  forwardIndex(): void {
    if (this.forwardIndexDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index:
        this.state.index < this.spritesLength - 1 ? this.state.index + 1 : 0,
      playing: false,
    };
  }

  get fps(): number {
    return this.slices.animations.response?.[this.state.id].fps || 0;
  }

  get minusFPSDisabled(): boolean {
    return this.fps <= 1 || this.spritesLength <= 1;
  }

  minusFPS(signal: AbortSignal): void {
    if (this.minusFPSDisabled) return;

    this.cancelIndexInterval();

    this.slices.animations.set(this.state.id, (animation) => ({
      ...animation,
      fps: animation.fps - 1,
    }));

    if (this.state.playing) this.setIndexInterval(signal);
  }

  get plusFPSDisabled(): boolean {
    return this.spritesLength <= 1;
  }

  plusFPS(signal: AbortSignal): void {
    if (this.plusFPSDisabled) return;

    this.cancelIndexInterval();

    this.slices.animations.set(this.state.id, (animation) => ({
      ...animation,
      fps: animation.fps + 1,
    }));

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

  setId(id: string, signal: AbortSignal): void {
    if (this.state.id === id) return;

    this.cancelIndexInterval();

    this.state = {
      id: id,
      index: 0,
      playing:
        (this.slices.animations.response?.[this.state.id].sprites.length || 0) >
        1,
    };

    if (this.state.playing) this.setIndexInterval(signal);
  }

  get setFPSDisabled(): boolean {
    return this.spritesLength <= 1;
  }

  setFPS(fps: number, signal: AbortSignal): void {
    if (this.setFPSDisabled || this.fps === fps || fps <= 0) return;

    this.cancelIndexInterval();

    this.slices.animations.set(this.state.id, (animation) => ({
      ...animation,
      fps,
    }));

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

  get toFirstIndexDisabled(): boolean {
    return this.spritesLength <= 1 || !this.state.index;
  }

  toFirstIndex(): void {
    if (this.toFirstIndexDisabled) return;

    this.cancelIndexInterval();
    this.state = { ...this.state, index: 0, playing: false };
  }

  get toLastIndexDisabled(): boolean {
    return (
      this.spritesLength <= 1 || this.spritesLength - 1 === this.state.index
    );
  }

  toLastIndex(): void {
    if (this.toLastIndexDisabled) return;

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
