import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { type Func, strings } from "@agusmgarcia/react-essentials-utils";
import { v4 as createUUID } from "uuid";

import type NotificationSlice from "../NotificationSlice";
import type SpriteSheetSlice from "../SpriteSheetSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import { type Animations } from "./AnimationsSlice.types";

export default class AnimationsSlice extends GlobalSlice<
  Animations,
  { notification: NotificationSlice; spriteSheet: SpriteSheetSlice }
> {
  constructor() {
    super([]);
  }

  get dirty(): boolean {
    return !!this.state.length;
  }

  protected override onInit(): void {
    super.onInit();

    this.slices.spriteSheet.subscribe(
      (state) => state.response?.sprites,
      (sprites) => {
        this.state = !!sprites
          ? this.state.filter((a) => a.sprites.every((s) => !!sprites[s.id]))
          : [];
      },
    );
  }

  create(spriteIds: string[]): string | undefined {
    if (spriteIds.length <= 0)
      throw new Error("You need to select at least one sprite");

    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

    const animation: Animations[number] = {
      color: spriteSheet.image.backgroundColor,
      fps: 12,
      id: createUUID(),
      name: `New animation ${getLatestAnimationOrder(this.state) + 1}`,
      onion: false,
      playing: spriteIds.length > 1,
      sprites: spriteIds
        .sort(sortSprites(spriteSheet.sprites))
        .map(mapSprites(spriteIds, spriteSheet.sprites)),
    };

    this.state = [...this.state, animation];
    return animation.id;
  }

  async remove(id: string): Promise<boolean> {
    const animation = this.state.find((a) => a.id === id);
    if (!animation) return true;

    const response = await this.slices.notification.set(
      "warning",
      `Are you sure you want to delete the animation **${animation.name}**? This action cannot be undone`,
    );
    if (!response) return false;

    this.state = this.state.filter((a) => a.id !== id);
    this.slices.notification.set("success", "Animation deleted!");
    return true;
  }

  resetCenter(id: string, index: number): void {
    this.setCenter(id, index, (center) => ({
      offsetX: center.initialOffsetX,
      offsetY: center.initialOffsetY,
    }));
  }

  setFPS(id: string, fps: React.SetStateAction<number>): void {
    this.state = this.state.map((a) =>
      a.id === id
        ? {
            ...a,
            fps: Math.max(fps instanceof Function ? fps(a.fps) : fps, 1),
          }
        : a,
    );
  }

  setColor(id: string, color: string): void {
    this.state = this.state.map((a) => (a.id === id ? { ...a, color } : a));
  }

  setName(id: string, name: string): void {
    this.state = this.state.map((a) => (a.id === id ? { ...a, name } : a));
  }

  setCenter(
    id: string,
    index: number,
    center:
      | Pick<
          Animations[number]["sprites"][number]["center"],
          "offsetX" | "offsetY"
        >
      | Func<
          Pick<
            Animations[number]["sprites"][number]["center"],
            "offsetX" | "offsetY"
          >,
          [center: Animations[number]["sprites"][number]["center"]]
        >,
  ): void {
    this.state = this.state.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s, i) =>
              i === index
                ? {
                    ...s,
                    center: {
                      ...s.center,
                      ...(center instanceof Function
                        ? center(s.center)
                        : center),
                      visible: true,
                    },
                  }
                : {
                    ...s,
                    center: { ...s.center, visible: true },
                  },
            ),
          }
        : a,
    );
  }

  setOnion(id: string, onion: React.SetStateAction<boolean>): void {
    this.state = this.state.map((a) =>
      a.id === id
        ? {
            ...a,
            onion: onion instanceof Function ? onion(a.onion) : onion,
          }
        : a,
    );
  }

  setPlaying(id: string, playing: React.SetStateAction<boolean>): void {
    this.state = this.state.map((a) =>
      a.id === id
        ? {
            ...a,
            playing: playing instanceof Function ? playing(a.playing) : playing,
          }
        : a,
    );
  }

  async setAnimations(animations: Animations): Promise<void> {
    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet?.image.url)
      throw new Error("You need to provide an image first");

    const animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet = animations.filter(
      (a) => a.sprites.some((s) => !spriteSheet.sprites[s.id]),
    );

    if (!!animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet.length)
      await this.slices.notification.set(
        "error",
        strings.replace(
          "The following ${animations?animation:animations}: ${animationsName} ${animations?contains:contain} at least one sprite that is not part of the sprite sheet",
          {
            animations:
              animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet.length,
            animationsName: animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet
              .map((a) => `**"${a.name}"**`)
              .join(", "),
          },
        ),
      );

    this.state = animations.filter(
      (a) =>
        !animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet.find(
          (b) => a.id === b.id,
        ),
    );
  }

  toggleCenterVisibility(id: string): void {
    this.state = this.state.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s) => ({
              ...s,
              center: { ...s.center, visible: !s.center.visible },
            })),
          }
        : a,
    );
  }
}

function sortSprites(
  sprites: SpriteSheetSliceTypes.SpriteSheet["sprites"],
): Func<number, [spriteId1: string, spriteId2: string]> {
  return (spriteId1, spriteId2) => {
    const sprite1 = sprites[spriteId1];
    const sprite2 = sprites[spriteId2];

    return sprite1.top <= sprite2.top + sprite2.height &&
      sprite1.top + sprite1.height >= sprite2.top
      ? sprite1.left - sprite2.left
      : sprite1.top - sprite2.top;
  };
}

function mapSprites(
  spriteIds: string[],
  sprites: SpriteSheetSliceTypes.SpriteSheet["sprites"],
): Func<Animations[number]["sprites"][number], [spriteId: string]> {
  const spritesSelected = spriteIds.map((spriteId) => ({
    id: spriteId,
    ...sprites[spriteId],
  }));

  const maxHeight = Math.max(...spritesSelected.map((s) => s.height));

  const result = spritesSelected.reduce(
    (result, s) => {
      result[s.id] = {
        center: {
          initialOffsetX: 0,
          initialOffsetY: (maxHeight - s.height) / 2,
          offsetX: 0,
          offsetY: (maxHeight - s.height) / 2,
          visible: false,
        },
        id: s.id,
      };
      return result;
    },
    {} as Record<string, Animations[number]["sprites"][number]>,
  );

  return (spriteId) => result[spriteId];
}

function getLatestAnimationOrder(animations: Animations): number {
  return (
    animations
      .map((a) => +(a.name.match(/^New animation (\d+)$/)?.at(1) || "0"))
      .sort()
      .at(-1) || 0
  );
}
