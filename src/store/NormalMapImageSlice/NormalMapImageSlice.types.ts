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
  normalMapSettings:
    | Omit<NormalMapSettingsSliceTypes.NormalMapSettings, "name">
    | undefined;
  spriteSheetImage:
    | Pick<SpriteSheetImageSliceTypes.SpriteSheetImage, "name" | "url">
    | undefined;
};
