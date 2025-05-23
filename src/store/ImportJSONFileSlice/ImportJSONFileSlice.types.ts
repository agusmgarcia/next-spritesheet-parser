import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import { type SettingsSliceTypes } from "../SettingsSlice";
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
          settings: Omit<
            SettingsSliceTypes.default["settings"]["settings"],
            "image"
          >;
          spriteSheet: Omit<
            NonNullable<SpriteSheetSliceTypes.default["spriteSheet"]["data"]>,
            "imageURL"
          >;
        },
      ]
    >;
  }
>;

export default ImportJSONFileSlice;
