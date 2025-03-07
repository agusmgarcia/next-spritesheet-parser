import { AsyncFunc, createStore } from "@agusmgarcia/react-core";

import createSpriteSheetSlice, {
  type SpriteSheetSliceTypes,
} from "./SpriteSheetSlice";
import { useCallback, useMemo } from "react";
import { SetValue } from "#src/utils";

export type SpriteSheet = SpriteSheetSliceTypes.default["spriteSheet"];

const { useSelector, ...reactStore } = createStore(createSpriteSheetSlice);

export const StoreProvider = reactStore.StoreProvider;

export function useAnimations() {
  return {
    animations: useSelector((state) => state.spriteSheet.animations),
    createAnimation: useSelector((state) => state.spriteSheet.createAnimation),
  };
}

export function useAnimation(animationId: string) {
  const animations = useSelector((state) => state.spriteSheet.animations);
  const setAnimationName = useSelector(
    (state) => state.spriteSheet.setAnimationName,
  );

  const animation = useMemo(
    () => animations.find((a) => a.id === animationId),
    [animationId, animations],
  );

  const setName = useCallback<AsyncFunc<void, [name: SetValue<string>]>>(
    (name) => setAnimationName(animationId, name),
    [animationId, setAnimationName],
  );

  return {
    animation,
    setName,
  };
}

export function useSpriteSheet() {
  return {
    backgroundColor: useSelector((state) => state.spriteSheet.backgroundColor),
    imageURL: useSelector((state) => state.spriteSheet.imageURL),
    reset: useSelector((state) => state.spriteSheet.reset),
    selected: useSelector((state) => state.spriteSheet.spritesSelected),
    set: useSelector((state) => state.spriteSheet.set),
    sprites: useSelector((state) => state.spriteSheet.sprites),
    toggleSelect: useSelector((state) => state.spriteSheet.toggleSelectSprite),
    unselectAll: useSelector((state) => state.spriteSheet.unselectAllSprites),
  };
}
