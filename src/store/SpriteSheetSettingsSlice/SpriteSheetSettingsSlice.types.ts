import { type SpriteSheetParserClientTypes } from "#src/clients";

import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";

export type SpriteSheetSettings = NonNullable<
  SpriteSheetParserClientTypes.GetStateResponse["spriteSheetSettings"]
>;

export type Request = {
  spriteSheetImage:
    | Pick<SpriteSheetImageSliceTypes.SpriteSheetImage, "id" | "name">
    | undefined;
};
