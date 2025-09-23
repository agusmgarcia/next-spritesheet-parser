import { type SpriteSheetParserClientTypes } from "#src/apis";

import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";
import { type SpriteSheetSettingsSliceTypes } from "../SpriteSheetSettingsSlice";

export type SpriteSheet = NonNullable<
  SpriteSheetParserClientTypes.GetStateResponse["spriteSheet"]
>;

export type Request = {
  spriteSheetImage:
    | Pick<SpriteSheetImageSliceTypes.SpriteSheetImage, "id" | "url">
    | undefined;
  spriteSheetSettings:
    | Omit<SpriteSheetSettingsSliceTypes.SpriteSheetSettings, "name">
    | undefined;
};
