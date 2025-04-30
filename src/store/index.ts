import { createStore } from "@agusmgarcia/react-core";

import createAnimationsSlice, {
  type AnimationsSliceTypes,
} from "./AnimationsSlice";
import createErrorSlice, { type ErrorSliceTypes } from "./ErrorSlice";
import createSettingsSlice, { type SettingsSliceTypes } from "./SettingsSlice";
import createSpriteSelectionSlice, {
  type SpriteSelectionSliceTypes,
} from "./SpriteSelectionSlice";
import createSpriteSheetSlice, {
  type SpriteSheetSliceTypes,
} from "./SpriteSheetSlice";

export type Animations =
  AnimationsSliceTypes.default["animations"]["animations"];
export type Error = NonNullable<ErrorSliceTypes.default["error"]["error"]>;
export type Settings = SettingsSliceTypes.default["settings"]["settings"];
export type SpriteSelection =
  SpriteSelectionSliceTypes.default["spriteSelection"]["spriteSelection"];
export type SpriteSheet = NonNullable<
  SpriteSheetSliceTypes.default["spriteSheet"]["data"]
>;

const { useSelector, ...reactStore } = createStore(
  createAnimationsSlice,
  createErrorSlice,
  createSettingsSlice,
  createSpriteSelectionSlice,
  createSpriteSheetSlice,
);

export const StoreProvider = reactStore.StoreProvider;

export function useAnimations() {
  return {
    animations: useSelector((state) => state.animations.animations),
    createAnimation: useSelector((state) => state.animations.createAnimation),
    deleteAnimation: useSelector((state) => state.animations.deleteAnimation),
    resetAnimationOffset: useSelector(
      (state) => state.animations.resetAnimationOffset,
    ),
    setAnimationColor: useSelector(
      (state) => state.animations.setAnimationColor,
    ),
    setAnimationFPS: useSelector((state) => state.animations.setAnimationFPS),
    setAnimationName: useSelector((state) => state.animations.setAnimationName),
    setAnimationOffset: useSelector(
      (state) => state.animations.setAnimationOffset,
    ),
    setAnimations: useSelector((state) => state.animations.setAnimations),
    setAnimationScale: useSelector(
      (state) => state.animations.setAnimationScale,
    ),
  };
}

export function useError() {
  return {
    clearError: useSelector((state) => state.error.clearError),
    error: useSelector((state) => state.error.error),
    setError: useSelector((state) => state.error.setError),
  };
}

export function useSettings() {
  return {
    setImage: useSelector((state) => state.settings.setImage),
    setSettings: useSelector((state) => state.settings.setSettings),
    settings: useSelector((state) => state.settings.settings),
  };
}

export function useSpriteSelection() {
  return {
    selectSprite: useSelector((state) => state.spriteSelection.selectSprite),
    spriteSelection: useSelector(
      (state) => state.spriteSelection.spriteSelection,
    ),
    toggleSpriteSelection: useSelector(
      (state) => state.spriteSelection.toggleSpriteSelection,
    ),
    unselectAllSprites: useSelector(
      (state) => state.spriteSelection.unselectAllSprites,
    ),
  };
}

export function useSpriteSheet() {
  return {
    mergeSprites: useSelector((state) => state.spriteSheet.mergeSprites),
    setSpriteSheet: useSelector((state) => state.spriteSheet.setSpriteSheet),
    splitSprite: useSelector((state) => state.spriteSheet.splitSprite),
    spriteSheet: useSelector((state) => state.spriteSheet.data),
    spriteSheetLoading: useSelector((state) => state.spriteSheet.loading),
  };
}
