import { type SpriteSheetParserClientTypes } from "#src/apis";

import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";
import { type SpriteSheetSettingsSliceTypes } from "../SpriteSheetSettingsSlice";

export type Request = {
  spriteSheetImage:
    | Pick<SpriteSheetImageSliceTypes.Response, "id" | "url">
    | undefined;
  spriteSheetSettings:
    | Omit<SpriteSheetSettingsSliceTypes.Response, "name">
    | undefined;
};

export type Response = NonNullable<
  SpriteSheetParserClientTypes.GetStateResponse["spriteSheet"]
>;
