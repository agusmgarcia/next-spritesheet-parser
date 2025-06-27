import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-essentials-store";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type SpriteSelectionSlice from "./SpriteSelectionSlice.types";

export default createGlobalSlice<
  SpriteSelectionSlice,
  AnimationsSliceTypes.default & SpriteSheetSliceTypes.default
>("spriteSelection", (subscribe) => {
  subscribe(
    (context) => context.get().spriteSelection.unselectAllSprites(),
    (state) => state.spriteSheet.data?.sprites,
  );

  subscribe(
    (context) => context.get().spriteSelection.unselectAllSprites(),
    (state) => state.animations.animations.length,
  );

  return {
    selectSprite,
    spriteSelection: [],
    toggleSpriteSelection,
    unselectAllSprites,
  };
});

function selectSprite(
  spriteId: Parameters<
    SpriteSelectionSlice["spriteSelection"]["selectSprite"]
  >[0],
  context: CreateGlobalSliceTypes.Context<
    SpriteSelectionSlice,
    SpriteSheetSliceTypes.default
  >,
): void {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.sprites[spriteId])
    throw new Error("The selected sprite is not present in the sprite sheet");

  context.set((prev) => ({
    spriteSelection: prev.spriteSelection.includes(spriteId)
      ? prev.spriteSelection
      : [...prev.spriteSelection, spriteId],
  }));
}

function toggleSpriteSelection(
  spriteId: Parameters<
    SpriteSelectionSlice["spriteSelection"]["toggleSpriteSelection"]
  >[0],
  context: CreateGlobalSliceTypes.Context<
    SpriteSelectionSlice,
    SpriteSheetSliceTypes.default
  >,
): void {
  const spriteSheet = context.get().spriteSheet.data;
  if (!spriteSheet?.sprites[spriteId])
    throw new Error("The selected sprite is not present in the sprite sheet");

  context.set((prev) => ({
    spriteSelection: prev.spriteSelection.includes(spriteId)
      ? prev.spriteSelection.filter((sId) => sId !== spriteId)
      : [...prev.spriteSelection, spriteId],
  }));
}

function unselectAllSprites(
  context: CreateGlobalSliceTypes.Context<SpriteSelectionSlice>,
): void {
  context.set({ spriteSelection: [] });
}
