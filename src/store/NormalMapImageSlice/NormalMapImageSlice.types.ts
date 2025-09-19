import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";

export type NormalMapImage = {
  backgroundColor: string;
  height: number;
  type: string;
  url: string;
  width: number;
};

export type Request = {
  settings: Omit<NormalMapSettingsSliceTypes.NormalMapSettings, "name">;
  spriteSheetImage: SpriteSheetImageSliceTypes.SpriteSheetImage | undefined;
};
