import { type SpriteSheetParserClientTypes } from "#src/apis";

import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";

export type NormalMapSettings = NonNullable<
  SpriteSheetParserClientTypes.GetStateResponse["normalMapSettings"]
>;

export type Request = {
  spriteSheetImage:
    | Pick<SpriteSheetImageSliceTypes.SpriteSheetImage, "id" | "name">
    | undefined;
};
