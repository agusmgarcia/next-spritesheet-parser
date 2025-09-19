import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";
import { type SpriteSheetSettingsSliceTypes } from "../SpriteSheetSettingsSlice";

export type SpriteSheet = Record<
  string,
  {
    height: number;
    subsprites: SpriteSheet;
    width: number;
    x: number;
    y: number;
  }
>;

export type Request = {
  settings: Omit<SpriteSheetSettingsSliceTypes.SpriteSheetSettings, "name">;
  spriteSheetImage: SpriteSheetImageSliceTypes.SpriteSheetImage | undefined;
};
