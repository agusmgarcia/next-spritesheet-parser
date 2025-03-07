import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";
import { v4 as createUUID } from "uuid";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type AnimationsSlice from "./AnimationsSlice.types";

export default createGlobalSlice<AnimationsSlice>("animations", () => ({
  animations: [],
  createAnimation,
  resetAnimations,
  setAnimationName,
}));

async function createAnimation(
  indices: Parameters<AnimationsSlice["animations"]["createAnimation"]>[0],
  context: CreateGlobalSliceTypes.Context<
    AnimationsSlice,
    SpriteSheetSliceTypes.default
  >,
): Promise<string> {
  if (indices.length <= 0) throw new Error("Indices must be greater than 0");

  const spriteSheet = context.get().spriteSheet.spriteSheet;
  if (!spriteSheet) throw new Error("Sprite sheet is not defined");

  function sortSprites(): Func<number, [index1: number, index2: number]> {
    if (!spriteSheet) throw new Error("Sprite sheet is not defined");
    const sprites = spriteSheet.sprites;

    return (index1, index2) => {
      const sprite1 = sprites[index1];
      const sprite2 = sprites[index2];

      return sprite1.top <= sprite2.top + sprite2.height &&
        sprite1.top + sprite1.height >= sprite2.top
        ? sprite1.left - sprite2.left
        : sprite1.top - sprite2.top;
    };
  }

  function mapSprites(): Func<
    AnimationsSlice["animations"]["animations"][number]["sprites"][number],
    [index: number]
  > {
    if (!spriteSheet) throw new Error("Sprite sheet is not defined");
    const sprites = spriteSheet.sprites;

    const spritesSelected = indices.map((i) => ({ index: i, ...sprites[i] }));
    const maxHeight = Math.max(...spritesSelected.map((s) => s.height));

    const result = spritesSelected.reduce(
      (result, s) => {
        result[s.index] = {
          index: s.index,
          offsetX: 0,
          offsetY: maxHeight - s.height,
        };
        return result;
      },
      {} as Record<
        number,
        AnimationsSlice["animations"]["animations"][number]["sprites"][number]
      >,
    );

    return (index) => result[index];
  }

  const id = createUUID();

  context.set((prev) => ({
    animations: [
      ...prev.animations,
      {
        fps: 12,
        id,
        name: "New animation",
        sprites: indices.sort(sortSprites()).map(mapSprites()),
      },
    ],
  }));

  return id;
}

async function resetAnimations(
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): Promise<void> {
  context.set({ animations: [] });
}

async function setAnimationName(
  id: Parameters<AnimationsSlice["animations"]["setAnimationName"]>[0],
  name: Parameters<AnimationsSlice["animations"]["setAnimationName"]>[1],
  context: CreateGlobalSliceTypes.Context<AnimationsSlice>,
): Promise<void> {
  context.set((prev) => ({
    animations: prev.animations.map((a) =>
      a.id === id
        ? { ...a, name: name instanceof Function ? name(a.name) : name }
        : a,
    ),
  }));
}
