import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";
import { v4 as createUUID } from "uuid";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type AnimationsSlice from "./AnimationsSlice.types";

export default createGlobalSlice<
  AnimationsSlice,
  SpriteSheetSliceTypes.default
>("animations", (subscribe) => {
  subscribe(
    (context) => updateAnimations(context),
    (state) => state.spriteSheet.data?.sprites,
  );

  return {
    animations: [],
    createAnimation,
    deleteAnimation,
    resetAnimationOffset,
    setAnimationColor,
    setAnimationFPS,
    setAnimationName,
    setAnimationOffset,
    setAnimations,
    setAnimationScale,
  };
});

function createAnimation(
  spriteIds: Parameters<AnimationsSlice["animations"]["createAnimation"]>[0],
  context: CreateGlobalSliceTypes.Context<
    AnimationsSlice,
    SpriteSheetSliceTypes.default
  >,
): string | undefined {
  if (spriteIds.length <= 0) return undefined;

  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet) return undefined;

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

  const id = createUUID();

  context.set((prev) => ({
    animations: [
      ...prev.animations,
      {
        color: spriteSheet.backgroundColor,
        fps: 12,
        id,
        name: "New animation",
        scale: 0,
        sprites: spriteIds
          .sort(sortSprites(spriteSheet.sprites))
          .map(mapSprites(spriteSheet.sprites)),
      },
    ],
  }));

  return id;
}

function deleteAnimation(
  id: Parameters<AnimationsSlice["animations"]["deleteAnimation"]>[0],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set((prev) => ({
    animations: prev.animations.filter((a) => a.id !== id),
  }));
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

function updateAnimations(
  context: CreateGlobalSliceTypes.Context<
    AnimationsSlice,
    SpriteSheetSliceTypes.default
  >,
): void {
  context.set((prev) => {
    const sprites = context.get().spriteSheet.data?.sprites;
    if (!sprites) return { animations: [] };

    return {
      ...prev,
      animations: prev.animations
        .map((a) => ({
          ...a,
          sprites: a.sprites.filter((s) => !!sprites[s.id]),
        }))
        .filter((a) => !!a.sprites.length),
    };
  });
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

function setAnimations(
  animations: Parameters<AnimationsSlice["animations"]["setAnimations"]>[0],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set({ animations });
}

function setAnimationScale(
  id: Parameters<AnimationsSlice["animations"]["setAnimationScale"]>[0],
  scale: Parameters<AnimationsSlice["animations"]["setAnimationScale"]>[1],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): void {
  context.set((prev) => ({
    animations: prev.animations.map((a) =>
      a.id === id
        ? {
            ...a,
            scale: Math.max(
              scale instanceof Function ? scale(a.scale) : scale,
              1,
            ),
          }
        : a,
    ),
  }));
}
