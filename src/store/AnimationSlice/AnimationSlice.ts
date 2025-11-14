import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";

import {
  type AnimationsSlice,
  type AnimationsSliceTypes,
} from "../AnimationsSlice";
import { type NotificationSlice } from "../NotificationSlice";
import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
import { type State } from "./AnimationSlice.types";

export default class AnimationSlice extends GlobalSlice<
  State,
  {
    animations: AnimationsSlice;
    notification: NotificationSlice;
    spriteSheetImage: SpriteSheetImageSlice;
  }
> {
  private cancelIndexInterval: Func;

  constructor() {
    super({
      color: "",
      grid: false,
      id: "",
      index: 0,
      onion: false,
      playing: false,
    });

    this.cancelIndexInterval = emptyFunction;
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.slices.spriteSheetImage.subscribe(
      (state) => state.response,
      () => {
        this.cancelIndexInterval();
        this.state = {
          ...this.state,
          color: "",
          id: "",
          index: 0,
          onion: false,
          playing: false,
        };
      },
    );

    this.slices.animations.subscribe(
      (state) => state.response,
      (animations, signal) => {
        const animation = animations?.[this.id];

        if (!animation) {
          this.cancelIndexInterval();
          this.state = {
            ...this.state,
            color: "",
            id: "",
            index: 0,
            onion: false,
            playing: false,
          };
          return;
        }

        if (animation.sprites.length <= this.index) {
          this.cancelIndexInterval();

          this.state = {
            ...this.state,
            index: animation.sprites.length - 1,
            onion: this.onion ? animation.sprites.length - 1 > 0 : false,
            playing: animation.sprites.length > 1,
          };

          if (this.playing) this.setIndexInterval(signal);
          return;
        }
      },
    );
  }

  private get animation(): AnimationsSliceTypes.Response[string] | undefined {
    return this.slices.animations.response?.[this.id];
  }

  get sprites(): AnimationsSliceTypes.Response[string]["sprites"] {
    return this.animation?.sprites || [];
  }

  // <================================ COLOR =================================>

  get color(): string {
    return this.state.color;
  }

  get setColorDisabled(): boolean {
    return !this.id;
  }

  setColor(color: string): void {
    if (this.setColorDisabled) return;

    this.state = { ...this.state, color };
  }

  // <================================ ONION =================================>

  get onion(): boolean {
    return this.state.onion;
  }

  get enableOnionDisabled(): boolean {
    return !this.id || !this.index || this.onion;
  }

  enableOnion(): void {
    if (this.enableOnionDisabled) return;
    this.state = { ...this.state, onion: true };
  }

  get disableOnionDisabled(): boolean {
    return !this.id || !this.onion;
  }

  disabledOnion(): void {
    if (this.disableOnionDisabled) return;
    this.state = { ...this.state, onion: false };
  }

  // <================================ GRID =================================>

  get grid(): boolean {
    return this.state.grid;
  }

  get enableGridDisabled(): boolean {
    return !this.id || this.grid;
  }

  enableGrid(): void {
    if (this.enableGridDisabled) return;
    this.state = { ...this.state, grid: true };
  }

  get disableGridDisabled(): boolean {
    return !this.id || !this.grid;
  }

  disabledGrid(): void {
    if (this.disableGridDisabled) return;
    this.state = { ...this.state, grid: false };
  }

  // <================================ INDEX =================================>

  get index(): number {
    return this.state.index;
  }

  get backwardIndexDisabled(): boolean {
    return this.sprites.length <= 1;
  }

  backwardIndex(): void {
    if (this.backwardIndexDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index: this.index > 0 ? this.index - 1 : this.sprites.length - 1,
      onion: this.onion
        ? (this.index > 0 ? this.index - 1 : this.sprites.length - 1) > 0
        : false,
      playing: false,
    };
  }

  get forwardIndexDisabled(): boolean {
    return this.sprites.length <= 1;
  }

  forwardIndex(): void {
    if (this.forwardIndexDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index: this.index < this.sprites.length - 1 ? this.index + 1 : 0,
      onion: this.onion
        ? (this.index < this.sprites.length - 1 ? this.index + 1 : 0) > 0
        : false,
      playing: false,
    };
  }

  get toFirstIndexDisabled(): boolean {
    return this.sprites.length <= 1 || !this.index;
  }

  toFirstIndex(): void {
    if (this.toFirstIndexDisabled) return;

    this.cancelIndexInterval();
    this.state = { ...this.state, index: 0, onion: false, playing: false };
  }

  get toLastIndexDisabled(): boolean {
    return this.sprites.length <= 1 || this.sprites.length - 1 === this.index;
  }

  toLastIndex(): void {
    if (this.toLastIndexDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index: this.sprites.length - 1,
      onion: this.onion ? this.sprites.length - 1 > 0 : false,
      playing: false,
    };
  }

  // <================================= NAME =================================>

  get name(): string {
    return this.animation?.name || "";
  }

  get setNameDisabled(): boolean {
    return !this.id;
  }

  setName(name: string): void {
    if (this.setNameDisabled) return;

    this.slices.animations._update(this.id, (animation) => ({
      ...animation,
      name: name,
    }));
  }

  // <================================= FPS ==================================>

  get fps(): number {
    return this.animation?.fps || 0;
  }

  get minusFPSDisabled(): boolean {
    return this.fps <= 1 || this.sprites.length <= 1;
  }

  minusFPS(signal: AbortSignal): void {
    if (this.minusFPSDisabled) return;

    this.cancelIndexInterval();

    this.slices.animations._update(this.id, (animation) => ({
      ...animation,
      fps: animation.fps - 1,
    }));

    if (this.playing) this.setIndexInterval(signal);
  }

  get plusFPSDisabled(): boolean {
    return this.sprites.length <= 1;
  }

  plusFPS(signal: AbortSignal): void {
    if (this.plusFPSDisabled) return;

    this.cancelIndexInterval();

    this.slices.animations._update(this.id, (animation) => ({
      ...animation,
      fps: animation.fps + 1,
    }));

    if (this.playing) this.setIndexInterval(signal);
  }

  get setFPSDisabled(): boolean {
    return this.sprites.length <= 1;
  }

  setFPS(fps: number, signal: AbortSignal): void {
    if (this.setFPSDisabled || this.fps === fps || fps <= 0) return;

    this.cancelIndexInterval();

    this.slices.animations._update(this.id, (animation) => ({
      ...animation,
      fps,
    }));

    if (this.playing) this.setIndexInterval(signal);
  }

  // <================================== ID ==================================>

  get id(): string {
    return this.state.id;
  }

  get removeDisabled(): boolean {
    return !this.id;
  }

  async remove(signal: AbortSignal): Promise<boolean> {
    if (this.removeDisabled) return false;

    this.cancelIndexInterval();

    const response = await this.slices.notification.set(
      "warning",
      `Are you sure you want to delete the animation **${this.name}**? This action cannot be undone`,
      signal,
    );
    if (!response) return false;

    this.slices.animations.remove(this.id);

    await this.slices.notification.set("success", "Animation deleted!", signal);
    return true;
  }

  get setIdDisabled(): boolean {
    return !this.slices.spriteSheetImage.response;
  }

  setId(id: string, signal: AbortSignal): void {
    if (this.id === id) return;

    const spriteSheetImage = this.slices.spriteSheetImage.response;
    if (!spriteSheetImage) throw new Error("Unexpected scenario");

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      color: spriteSheetImage.backgroundColor,
      id: id,
      index: 0,
      onion: false,
      playing: this.sprites.length > 1,
    };

    if (this.playing) this.setIndexInterval(signal);
  }

  // <=============================== PLAYING ================================>

  get playing(): boolean {
    return this.state.playing;
  }

  get resumeDisabled(): boolean {
    return this.sprites.length <= 1 || this.playing;
  }

  resume(signal: AbortSignal): void {
    if (this.resumeDisabled) return;

    this.state = { ...this.state, playing: true };
    this.setIndexInterval(signal);
  }

  get stopDisabled(): boolean {
    return this.sprites.length <= 1 || !this.playing;
  }

  stop(): void {
    if (this.stopDisabled) return;

    this.cancelIndexInterval();
    this.state = { ...this.state, playing: false };
  }

  // <============================ SET INTERVAL ==============================>

  private setIndexInterval(signal: AbortSignal): void {
    this.cancelIndexInterval = this.setInterval(
      () =>
        (this.state = {
          ...this.state,
          index: this.index < this.sprites.length - 1 ? this.index + 1 : 0,
          onion: this.onion
            ? (this.index < this.sprites.length - 1 ? this.index + 1 : 0) > 0
            : false,
        }),
      1000 / this.fps,
      signal,
    );
  }
}
