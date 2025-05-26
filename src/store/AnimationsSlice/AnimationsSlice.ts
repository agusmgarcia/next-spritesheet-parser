import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  type Func,
  replaceString,
} from "@agusmgarcia/react-core";
import { v4 as createUUID } from "uuid";

import { type NotificationSliceTypes } from "../NotificationSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type AnimationsSlice from "./AnimationsSlice.types";

export default createGlobalSlice<
  AnimationsSlice,
  NotificationSliceTypes.default & SpriteSheetSliceTypes.default
>("animations", (subscribe) => {
  subscribe(
    (context) => context.get().animations.__updateAnimations__(),
    (state) => state.spriteSheet.data?.sprites,
  );

  return {
    __updateAnimations__,
    animations: [],
    createAnimation,
    deleteAnimation,
    resetAnimationOffset,
    setAnimationColor,
    setAnimationFPS,
    setAnimationName,
    setAnimationOffset,
    setAnimationOnion,
    setAnimationPlaying,
    setAnimations,
  };
});

function __updateAnimations__(
  context: CreateGlobalSliceTypes.Context<
    AnimationsSlice,
    SpriteSheetSliceTypes.default
  >,
): void {
  const sprites = context.get().spriteSheet.data?.sprites;
  if (!sprites) {
    context.set({ animations: [] });
    return;
  }

  context.set((prev) => ({
    animations: prev.animations.filter((a) =>
      a.sprites.every((s) => !!sprites[s.id]),
    ),
  }));
}

function createAnimation(
  spriteIds: Parameters<AnimationsSlice["animations"]["createAnimation"]>[0],
  context: CreateGlobalSliceTypes.Context<
    AnimationsSlice,
    SpriteSheetSliceTypes.default
  >,
): string | undefined {
  if (spriteIds.length <= 0)
    throw new Error(
      "You need to select at least one sprite to create the animation",
    );

  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet) throw new Error("Sprite sheet is not defined");

  function sortSprites(
    sprites: NonNullable<
      SpriteSheetSliceTypes.default["spriteSheet"]["data"]
    >["sprites"],
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
    sprites: NonNullable<
      SpriteSheetSliceTypes.default["spriteSheet"]["data"]
    >["sprites"],
  ): Func<
    AnimationsSlice["animations"]["animations"][number]["sprites"][number],
    [spriteId: string]
  > {
    const spritesSelected = spriteIds.map((spriteId) => ({
      id: spriteId,
      ...sprites[spriteId],
    }));

    const maxHeight = Math.max(...spritesSelected.map((s) => s.height));

    const result = spritesSelected.reduce(
      (result, s) => {
        result[s.id] = {
          id: s.id,
          initialOffsetX: 0,
          initialOffsetY: -(maxHeight - s.height) / 2,
          offsetX: 0,
          offsetY: -(maxHeight - s.height) / 2,
        };
        return result;
      },
      {} as Record<
        string,
        AnimationsSlice["animations"]["animations"][number]["sprites"][number]
      >,
    );

    return (spriteId) => result[spriteId];
  }

  function getLatestAnimationOrder(
    animations: AnimationsSlice["animations"]["animations"],
  ): number {
    return (
      animations
        .map((a) => +(a.name.match(/^New animation (\d+)$/)?.at(1) || "0"))
        .sort()
        .at(-1) || 0
    );
  }

  const animation: AnimationsSlice["animations"]["animations"][number] = {
    color: spriteSheet.image.backgroundColor,
    fps: 12,
    id: createUUID(),
    name: `New animation ${getLatestAnimationOrder(context.get().animations.animations) + 1}`,
    onion: false,
    playing: spriteIds.length > 1,
    sprites: spriteIds
      .sort(sortSprites(spriteSheet.sprites))
      .map(mapSprites(spriteSheet.sprites)),
  };

  context.set((prev) => ({ animations: [...prev.animations, animation] }));

  return animation.id;
}

async function deleteAnimation(
  id: Parameters<AnimationsSlice["animations"]["deleteAnimation"]>[0],
  context: CreateGlobalSliceTypes.Context<
    AnimationsSlice,
    NotificationSliceTypes.default
  >,
): Promise<boolean> {
  const animation = context
    .get()
    .animations.animations.find((a) => a.id === id);

  if (!animation) return true;

  const response = await context
    .get()
    .notification.setNotification(
      "warning",
      `Are you sure you want to delete the animation **${animation.name}**? This action cannot be undone.`,
    );

  if (!response) return false;

  context.set((prev) => ({
    animations: prev.animations.filter((a) => a.id !== id),
  }));

  context.get().notification.setNotification("success", "Animation deleted!");

  return true;
}

function resetAnimationOffset(
  id: Parameters<AnimationsSlice["animations"]["resetAnimationOffset"]>[0],
  index: Parameters<AnimationsSlice["animations"]["resetAnimationOffset"]>[1],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set((prev) => ({
    animations: prev.animations.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s, i) =>
              i === index
                ? {
                    ...s,
                    offsetX: s.initialOffsetX,
                    offsetY: s.initialOffsetY,
                  }
                : s,
            ),
          }
        : a,
    ),
  }));
}

function setAnimationFPS(
  id: Parameters<AnimationsSlice["animations"]["setAnimationFPS"]>[0],
  fps: Parameters<AnimationsSlice["animations"]["setAnimationFPS"]>[1],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set((prev) => ({
    animations: prev.animations.map((a) =>
      a.id === id
        ? { ...a, fps: Math.max(fps instanceof Function ? fps(a.fps) : fps, 1) }
        : a,
    ),
  }));
}

function setAnimationColor(
  id: Parameters<AnimationsSlice["animations"]["setAnimationColor"]>[0],
  color: Parameters<AnimationsSlice["animations"]["setAnimationColor"]>[1],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set((prev) => ({
    animations: prev.animations.map((a) =>
      a.id === id
        ? { ...a, color: color instanceof Function ? color(a.color) : color }
        : a,
    ),
  }));
}

function setAnimationName(
  id: Parameters<AnimationsSlice["animations"]["setAnimationName"]>[0],
  name: Parameters<AnimationsSlice["animations"]["setAnimationName"]>[1],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set((prev) => ({
    animations: prev.animations.map((a) =>
      a.id === id
        ? { ...a, name: name instanceof Function ? name(a.name) : name }
        : a,
    ),
  }));
}

function setAnimationOffset(
  id: Parameters<AnimationsSlice["animations"]["setAnimationOffset"]>[0],
  index: Parameters<AnimationsSlice["animations"]["setAnimationOffset"]>[1],
  offsetX: Parameters<AnimationsSlice["animations"]["setAnimationOffset"]>[2],
  offsetY: Parameters<AnimationsSlice["animations"]["setAnimationOffset"]>[3],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set((prev) => ({
    animations: prev.animations.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s, i) =>
              i === index
                ? {
                    ...s,
                    offsetX:
                      offsetX instanceof Function
                        ? offsetX(s.offsetX)
                        : offsetX,
                    offsetY:
                      offsetY instanceof Function
                        ? offsetY(s.offsetY)
                        : offsetY,
                  }
                : s,
            ),
          }
        : a,
    ),
  }));
}

function setAnimationOnion(
  id: Parameters<AnimationsSlice["animations"]["setAnimationOnion"]>[0],
  onion: Parameters<AnimationsSlice["animations"]["setAnimationOnion"]>[1],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set((prev) => ({
    animations: prev.animations.map((a) =>
      a.id === id
        ? {
            ...a,
            onion: onion instanceof Function ? onion(a.onion) : onion,
          }
        : a,
    ),
  }));
}

function setAnimationPlaying(
  id: Parameters<AnimationsSlice["animations"]["setAnimationPlaying"]>[0],
  playing: Parameters<AnimationsSlice["animations"]["setAnimationPlaying"]>[1],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set((prev) => ({
    animations: prev.animations.map((a) =>
      a.id === id
        ? {
            ...a,
            playing: playing instanceof Function ? playing(a.playing) : playing,
          }
        : a,
    ),
  }));
}

async function setAnimations(
  animations: Parameters<AnimationsSlice["animations"]["setAnimations"]>[0],
  context: CreateGlobalSliceTypes.Context<
    AnimationsSlice,
    NotificationSliceTypes.default & SpriteSheetSliceTypes.default
  >,
): Promise<void> {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.image.url)
    throw new Error("You need to provide an image first");

  const animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet = animations.filter(
    (a) => a.sprites.some((s) => !spriteSheet.sprites[s.id]),
  );

  if (!!animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet.length)
    await context.get().notification.setNotification(
      "error",
      replaceString(
        "The following ${animations?animation:animations}: ${animationsName} ${animations?contains:contain} at least one sprite that is not part of the sprite sheet",
        {
          animations: animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet.length,
          animationsName: animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet
            .map((a) => `**"${a.name}"**`)
            .join(", "),
        },
      ),
    );

  context.set({
    animations: animations.filter(
      (a) =>
        !animationsWhoseAtLeastOneSpriteIsNotInSpriteSheet.find(
          (b) => a.id === b.id,
        ),
    ),
  });
}
