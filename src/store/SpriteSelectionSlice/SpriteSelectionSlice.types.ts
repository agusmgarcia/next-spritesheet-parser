import {
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type SpriteSelectionSlice = CreateGlobalSliceTypes.SliceOf<
  "spriteSelection",
  {
    selectSprite: Func<void, [spriteId: string]>;
    spriteSelection: string[];
    toggleSpriteSelection: Func<void, [spriteId: string]>;
    unselectAllSprites: Func;
  }
>;

export default SpriteSelectionSlice;
