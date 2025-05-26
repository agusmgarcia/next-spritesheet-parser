import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";

type UtilsSlice = CreateGlobalSliceTypes.SliceOf<
  "utils",
  {
    exportZip: AsyncFunc<File>;
    importJSONFile: AsyncFunc<
      void,
      [
        jsonFile: {
          animations: AnimationsSliceTypes.default["animations"]["animations"];
          normalMap: Pick<
            NonNullable<NormalMapSliceTypes.default["normalMap"]["data"]>,
            "settings"
          > & {
            image: Pick<
              NonNullable<
                NormalMapSliceTypes.default["normalMap"]["data"]
              >["image"],
              "name"
            >;
          };
          spriteSheet: Pick<
            NonNullable<SpriteSheetSliceTypes.default["spriteSheet"]["data"]>,
            "settings" | "sprites"
          > & {
            image: Pick<
              NonNullable<
                SpriteSheetSliceTypes.default["spriteSheet"]["data"]
              >["image"],
              "name"
            >;
          };
        },
      ]
    >;
  }
>;

export default UtilsSlice;
