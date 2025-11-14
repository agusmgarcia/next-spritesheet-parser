import { type SpriteSheetParserClientTypes } from "#src/apis";

import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";

export type Request = {
  spriteSheetImage: Pick<SpriteSheetImageSliceTypes.Response, "id"> | undefined;
};

export type Response = NonNullable<
  SpriteSheetParserClientTypes.GetStateResponse["animations"]
>;
