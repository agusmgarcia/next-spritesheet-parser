import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type SetValue } from "#src/utils";

type SpriteSheet = {
  backgroundColor: string;
  color: string;
  imageURL: string;
  name: string;
  settings: {
    delta: number;
    maxArea: number;
    maxVariation: number;
    minArea: number;
    minDiversity: number;
  };
  sprites: {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  }[];
};

type SpriteSheetSlice = CreateGlobalSliceTypes.SliceOf<
  "spriteSheet",
  {
    createSpriteSheet: AsyncFunc<void, [input: File]>;
    resetSpriteSheet: AsyncFunc;
    setSpriteSheetSettings: AsyncFunc<
      void,
      [settings: SetValue<SpriteSheet["settings"]>]
    >;
    spriteSheet: SpriteSheet | undefined;
  }
>;

export default SpriteSheetSlice;
