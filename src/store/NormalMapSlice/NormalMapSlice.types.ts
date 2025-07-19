import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";

export type NormalMap = {
  image: {
    backgroundColor: string;
    height: number;
    name: string;
    type: string;
    url: string;
    width: number;
  };
  settings: {
    colorSpace: "linear" | "sRGB";
    filterRadius: number;
    invertX: boolean;
    invertY: boolean;
    invertZ: boolean;
    strength: number;
  };
};

export type Request = {
  settings: NormalMap["settings"];
  spriteSheetImageURL: SpriteSheetSliceTypes.SpriteSheet["image"]["url"];
};
