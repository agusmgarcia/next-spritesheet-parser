import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import {
  emptyFunction,
  equals,
  type Func,
} from "@agusmgarcia/react-essentials-utils";

import { type AnimationsSlice } from "../AnimationsSlice";
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
      fps: 0,
      grid: false,
      id: "",
      index: 0,
      name: "",
      onion: false,
      playing: false,
      sprites: [],
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
          color: "",
          fps: 0,
          grid: this.state.grid,
          id: "",
          index: 0,
          name: "",
          onion: false,
          playing: false,
          sprites: [],
        };
      },
    );

    this.slices.animations.subscribe(
      (state) => state.response,
      (animations) => {
        const animation = animations?.[this.state.id];

        if (
          !!this.state.id &&
          (!animation ||
            !equals.deep(
              animation.sprites.map((s) => s.id),
              this.state.sprites.map((s) => s.id),
            ))
        ) {
          this.cancelIndexInterval();
          this.state = {
            color: "",
            fps: 0,
            grid: this.state.grid,
            id: "",
            index: 0,
            name: "",
            onion: false,
            playing: false,
            sprites: [],
          };
        }
      },
    );

    this.subscribe(
      (state) => ({
        fps: state.fps,
        id: state.id,
        name: state.name,
        sprites: state.sprites,
      }),
      ({ id, ...props }) =>
        this.slices.animations._update(id, (animation) => ({
          ...animation,
          ...props,
        })),
      equals.deep,
    );
  }

  // <================================ CENTER ================================>

  get resetCenterDisabled(): boolean {
    const center = this.state.sprites.at(this.state.index)?.center;
    return (
      !center ||
      (center.initialOffsetX === center.offsetX &&
        center.initialOffsetY === center.offsetY)
    );
  }

  resetCenter(): void {
    if (this.resetCenterDisabled) return;
    this.state = {
      ...this.state,
      sprites: this.state.sprites.map((sprite, index) =>
        index === this.state.index
          ? {
              ...sprite,
              center: {
                ...sprite.center,
                offsetX: sprite.center.initialOffsetX,
                offsetY: sprite.center.initialOffsetY,
              },
            }
          : sprite,
      ),
    };
  }

  // <================================ COLOR =================================>

  get setColorDisabled(): boolean {
    return !this.state.id;
  }

  setColor(color: string): void {
    if (this.setColorDisabled) return;
    this.state = { ...this.state, color };
  }

  // <================================ ONION =================================>

  get enableOnionDisabled(): boolean {
    return !this.state.id || !this.state.index || this.state.onion;
  }

  enableOnion(): void {
    if (this.enableOnionDisabled) return;
    this.state = { ...this.state, onion: true };
  }

  get disableOnionDisabled(): boolean {
    return !this.state.id || !this.state.onion;
  }

  disabledOnion(): void {
    if (this.disableOnionDisabled) return;
    this.state = { ...this.state, onion: false };
  }

  // <================================ GRID =================================>

  get enableGridDisabled(): boolean {
    return !this.state.id || this.state.grid;
  }

  enableGrid(): void {
    if (this.enableGridDisabled) return;
    this.state = { ...this.state, grid: true };
  }

  get disableGridDisabled(): boolean {
    return !this.state.id || !this.state.grid;
  }

  disabledGrid(): void {
    if (this.disableGridDisabled) return;
    this.state = { ...this.state, grid: false };
  }

  // <================================ INDEX =================================>

  get backwardIndexDisabled(): boolean {
    return this.state.sprites.length <= 1;
  }

  backwardIndex(): void {
    if (this.backwardIndexDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index:
        this.state.index > 0
          ? this.state.index - 1
          : this.state.sprites.length - 1,
      onion: this.state.onion
        ? (this.state.index > 0
            ? this.state.index - 1
            : this.state.sprites.length - 1) > 0
        : false,
      playing: false,
    };
  }

  get forwardIndexDisabled(): boolean {
    return this.state.sprites.length <= 1;
  }

  forwardIndex(): void {
    if (this.forwardIndexDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index:
        this.state.index < this.state.sprites.length - 1
          ? this.state.index + 1
          : 0,
      onion: this.state.onion
        ? (this.state.index < this.state.sprites.length - 1
            ? this.state.index + 1
            : 0) > 0
        : false,
      playing: false,
    };
  }

  get toFirstIndexDisabled(): boolean {
    return this.state.sprites.length <= 1 || !this.state.index;
  }

  toFirstIndex(): void {
    if (this.toFirstIndexDisabled) return;

    this.cancelIndexInterval();
    this.state = { ...this.state, index: 0, onion: false, playing: false };
  }

  get toLastIndexDisabled(): boolean {
    return (
      this.state.sprites.length <= 1 ||
      this.state.sprites.length - 1 === this.state.index
    );
  }

  toLastIndex(): void {
    if (this.toLastIndexDisabled) return;

    this.cancelIndexInterval();

    this.state = {
      ...this.state,
      index: this.state.sprites.length - 1,
      onion: this.state.onion ? this.state.sprites.length - 1 > 0 : false,
      playing: false,
    };
  }

  // <================================= NAME =================================>

  get setNameDisabled(): boolean {
    return !this.state.id;
  }

  setName(name: string): void {
    if (this.setNameDisabled) return;
    this.state = { ...this.state, name };
  }

  // <================================= FPS ==================================>

  get minusFPSDisabled(): boolean {
    return this.state.fps <= 1 || this.state.sprites.length <= 1;
  }

  minusFPS(signal: AbortSignal): void {
    if (this.minusFPSDisabled) return;

    this.cancelIndexInterval();
    this.state = { ...this.state, fps: this.state.fps - 1 };

    if (this.state.playing) this.setIndexInterval(signal);
  }

  get plusFPSDisabled(): boolean {
    return this.state.sprites.length <= 1;
  }

  plusFPS(signal: AbortSignal): void {
    if (this.plusFPSDisabled) return;

    this.cancelIndexInterval();
    this.state = { ...this.state, fps: this.state.fps + 1 };

    if (this.state.playing) this.setIndexInterval(signal);
  }

  get setFPSDisabled(): boolean {
    return this.state.sprites.length <= 1;
  }

  setFPS(fps: number, signal: AbortSignal): void {
    if (this.setFPSDisabled || this.state.fps === fps || fps <= 0) return;

    this.cancelIndexInterval();
    this.state = { ...this.state, fps };

    if (this.state.playing) this.setIndexInterval(signal);
  }

  // <================================== ID ==================================>

  get removeDisabled(): boolean {
    return !this.state.id;
  }

  async remove(signal: AbortSignal): Promise<boolean> {
    if (this.removeDisabled) return false;

    this.cancelIndexInterval();

    const response = await this.slices.notification.set(
      "warning",
      `Are you sure you want to delete the animation **${this.state.name}**? This action cannot be undone`,
      signal,
    );
    if (!response) return false;

    this.slices.animations.remove(this.state.id);

    await this.slices.notification.set("success", "Animation deleted!", signal);
    return true;
  }

  get setIdDisabled(): boolean {
    return !this.slices.spriteSheetImage.response;
  }

  setId(id: string, signal: AbortSignal): void {
    if (this.state.id === id) return;

    const spriteSheetImage = this.slices.spriteSheetImage.response;
    if (!spriteSheetImage) throw new Error("Unexpected scenario");

    const animation = this.slices.animations.response?.[id];
    if (!animation) throw new Error("Unexpected scenario");

    this.cancelIndexInterval();

    this.state = {
      color: spriteSheetImage.backgroundColor,
      fps: animation.fps,
      grid: this.state.grid,
      id: id,
      index: 0,
      name: animation.name,
      onion: false,
      playing: animation.sprites.length > 1,
      sprites: animation.sprites.map((s) => ({
        center: {
          initialOffsetX: s.center.offsetX,
          initialOffsetY: s.center.offsetY,
          offsetX: s.center.offsetX,
          offsetY: s.center.offsetY,
        },
        id: s.id,
      })),
    };

    if (this.state.playing) this.setIndexInterval(signal);
  }

  // <=============================== PLAYING ================================>

  get resumeDisabled(): boolean {
    return this.state.sprites.length <= 1 || this.state.playing;
  }

  resume(signal: AbortSignal): void {
    if (this.resumeDisabled) return;

    this.state = { ...this.state, playing: true };
    this.setIndexInterval(signal);
  }

  get stopDisabled(): boolean {
    return this.state.sprites.length <= 1 || !this.state.playing;
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
          index:
            this.state.index < this.state.sprites.length - 1
              ? this.state.index + 1
              : 0,
          onion: this.state.onion
            ? (this.state.index < this.state.sprites.length - 1
                ? this.state.index + 1
                : 0) > 0
            : false,
        }),
      1000 / this.state.fps,
      signal,
    );
  }
}
