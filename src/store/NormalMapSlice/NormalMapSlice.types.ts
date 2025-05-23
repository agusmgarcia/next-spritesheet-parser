import {
  type AsyncFunc,
  type CreateServerSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";

type NormalMap = {
  image: {
    backgroundColor: string;
    name: string;
    type: string;
    url: string;
  };
  settings: {
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
    setNormalMapName: Func<void, [name: React.SetStateAction<string>]>;
    setNormalMapSettings: AsyncFunc<
      void,
      [settings: React.SetStateAction<NormalMap["settings"]>]
    >;
  }
>;

export default NormalMapSlice;
