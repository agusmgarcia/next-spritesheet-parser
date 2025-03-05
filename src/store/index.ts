import { createStore } from "@agusmgarcia/react-core";

import createSpriteSheetSlice, {
  type SpriteSheetSliceTypes,
} from "./SpriteSheetSlice";

export type SpriteSheet = SpriteSheetSliceTypes.default["spriteSheet"];

const { useSelector, ...reactStore } = createStore(createSpriteSheetSlice);

export const StoreProvider = reactStore.StoreProvider;

export function useSpriteSheet() {
  return {
    backgroundColor: useSelector((state) => state.spriteSheet.backgroundColor),
    createAnimation: useSelector((state) => state.spriteSheet.createAnimation),
    imageURL: useSelector((state) => state.spriteSheet.imageURL),
    reset: useSelector((state) => state.spriteSheet.reset),
    selected: useSelector((state) => state.spriteSheet.selected),
    set: useSelector((state) => state.spriteSheet.set),
    sprites: useSelector((state) => state.spriteSheet.sprites),
    toggleSelect: useSelector((state) => state.spriteSheet.toggleSelect),
  };
}
