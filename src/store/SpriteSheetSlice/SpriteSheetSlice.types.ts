import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type SetValue } from "#src/utils";

type SpriteSheet = {
  settings: {
    delta: number;
    maxArea: number;
    maxVariation: number;
    minArea: number;
    minDiversity: number;
  };
  sheet: {
    backgroundColor: string;
    color: string;
    imageURL: string;
    name: string;
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
