import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type SpriteSheetImageSliceTypes } from "../SpriteSheetImageSlice";

export type Request = {
  normalMapSettings:
    | Omit<NormalMapSettingsSliceTypes.Response, "name">
    | undefined;
  spriteSheetImage:
    | Pick<SpriteSheetImageSliceTypes.Response, "name" | "url">
    | undefined;
};

export type Response = {
  backgroundColor: string;
  height: number;
  type: string;
  url: string;
  width: number;
};
