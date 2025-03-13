import { createStore } from "@agusmgarcia/react-core";

import createAnimationsSlice, {
  type AnimationsSliceTypes,
} from "./AnimationsSlice";
import createSpriteSheetSlice, {
  type SpriteSheetSliceTypes,
} from "./SpriteSheetSlice";

export type Animations =
  AnimationsSliceTypes.default["animations"]["animations"];
export type SpriteSheet = NonNullable<
  SpriteSheetSliceTypes.default["spriteSheet"]["spriteSheet"]
>;

const { useSelector, ...reactStore } = createStore(
  createAnimationsSlice,
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
    resetAnimations: useSelector((state) => state.animations.resetAnimations),
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

export function useSpriteSheet() {
  return {
    createSpriteSheet: useSelector(
      (state) => state.spriteSheet.createSpriteSheet,
    ),
    resetSpriteSheet: useSelector(
      (state) => state.spriteSheet.resetSpriteSheet,
    ),
    setSpriteSheetSettings: useSelector(
      (state) => state.spriteSheet.setSpriteSheetSettings,
    ),
    spriteSheet: useSelector((state) => state.spriteSheet.spriteSheet),
  };
}
