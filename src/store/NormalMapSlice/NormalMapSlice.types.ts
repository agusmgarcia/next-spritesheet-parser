import { type CreateServerSliceTypes } from "@agusmgarcia/react-essentials-store";
import { type AsyncFunc, type Func } from "@agusmgarcia/react-essentials-utils";

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
    setNormalMapName: Func<void, [name: string]>;
    setNormalMapSettings: AsyncFunc<void, [settings: NormalMap["settings"]]>;
  }
>;

export default NormalMapSlice;
