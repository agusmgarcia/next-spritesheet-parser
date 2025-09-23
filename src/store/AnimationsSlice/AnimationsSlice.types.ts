import { type SpriteSheetParserClientTypes } from "#src/apis";

import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";

export type Animations = NonNullable<
  SpriteSheetParserClientTypes.GetStateResponse["animations"]
>;

export type Request = {
  spriteSheetImage:
    | Pick<SpriteSheetImageSliceTypes.SpriteSheetImage, "id">
    | undefined;
};
