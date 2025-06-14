import {
  type AsyncFunc,
  type CreateServerSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";

type NormalMap = {
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

type NormalMapSlice = CreateServerSliceTypes.SliceOf<
  "normalMap",
  NormalMap,
  Pick<NormalMap, "settings"> &
    Pick<
      NonNullable<SpriteSheetSliceTypes.default["spriteSheet"]["data"]>,
      "image"
    >,
  {
    __updateNormalMapImage__: AsyncFunc;
    setNormalMapName: Func<void, [name: string]>;
    setNormalMapSettings: AsyncFunc<void, [settings: NormalMap["settings"]]>;
  }
>;

export default NormalMapSlice;
