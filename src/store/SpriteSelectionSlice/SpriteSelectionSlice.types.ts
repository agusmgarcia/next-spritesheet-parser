import { type CreateGlobalSliceTypes } from "@agusmgarcia/react-essentials-store";
import { type Func } from "@agusmgarcia/react-essentials-utils";

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
