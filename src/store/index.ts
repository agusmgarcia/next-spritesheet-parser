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
    resetAnimations: useSelector((state) => state.animations.resetAnimations),
    setAnimationName: useSelector((state) => state.animations.setAnimationName),
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
    spriteSheet: useSelector((state) => state.spriteSheet.spriteSheet),
  };
}
