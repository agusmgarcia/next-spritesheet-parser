import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";

export type DeletedSprites = (Pick<
  SpriteSheetSliceTypes.SpriteSheet[string],
  "height" | "width" | "x" | "y"
> & { id: string })[];

export type Request = {
  spriteSheetImage:
    | Pick<SpriteSheetImageSliceTypes.SpriteSheetImage, "id">
    | undefined;
};
