import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";

type ImportJSONFileSlice = CreateGlobalSliceTypes.SliceOf<
  "importJSONFile",
  {
    importJSONFile: AsyncFunc<
      void,
      [
        jsonFile: {
          animations: AnimationsSliceTypes.default["animations"]["animations"];
          normalMap: Omit<
            NonNullable<NormalMapSliceTypes.default["normalMap"]["data"]>,
            "imageURL"
          >;
          normalMapSettings: NormalMapSettingsSliceTypes.default["normalMapSettings"]["normalMapSettings"];
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

export default ImportJSONFileSlice;
