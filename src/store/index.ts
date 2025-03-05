import { createStore } from "@agusmgarcia/react-core";

import createSpriteSheetSlice, {
  type SpriteSheetSliceTypes,
} from "./SpriteSheetSlice";

export type SpriteSheet = SpriteSheetSliceTypes.default["spriteSheet"];

const { useSelector, ...reactStore } = createStore(createSpriteSheetSlice);

export const StoreProvider = reactStore.StoreProvider;

export function useSpriteSheet() {
  return {
    animations: useSelector((state) => state.spriteSheet.animations),
    backgroundColor: useSelector((state) => state.spriteSheet.backgroundColor),
    createAnimation: useSelector((state) => state.spriteSheet.createAnimation),
    imageURL: useSelector((state) => state.spriteSheet.imageURL),
    reset: useSelector((state) => state.spriteSheet.reset),
    selected: useSelector((state) => state.spriteSheet.selected),
    set: useSelector((state) => state.spriteSheet.set),
    setAnimationName: useSelector(
      (state) => state.spriteSheet.setAnimationName,
    ),
    sprites: useSelector((state) => state.spriteSheet.sprites),
    toggleSelect: useSelector((state) => state.spriteSheet.toggleSelect),
    unselectAll: useSelector((state) => state.spriteSheet.unselectAll),
  };
}
