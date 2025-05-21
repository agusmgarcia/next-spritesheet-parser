import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type NormalMapSliceTypes } from "../NormalMapSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";

type Settings = {
  delta: number;
  image: { name: string; type: string; url: string } | undefined;
  maxArea: number;
  maxVariation: number;
  minArea: number;
  minDiversity: number;
};

type SettingsSlice = CreateGlobalSliceTypes.SliceOf<
  "settings",
  {
    setImage: AsyncFunc<void, [image: File]>;
    setJSONFile: AsyncFunc<
      void,
      [
        jsonFile: {
          animations: AnimationsSliceTypes.default["animations"]["animations"];
          normalMap: Omit<
            NonNullable<NormalMapSliceTypes.default["normalMap"]["data"]>,
            "imageURL"
          >;
          normalMapSettings: NormalMapSettingsSliceTypes.default["normalMapSettings"]["normalMapSettings"];
          settings: Omit<Settings, "image">;
          spriteSheet: Omit<
            NonNullable<SpriteSheetSliceTypes.default["spriteSheet"]["data"]>,
            "imageURL"
          >;
        },
      ]
    >;
    setSettings: Func<
      void,
      [settings: React.SetStateAction<Omit<Settings, "image">>]
    >;
    settings: Settings;
  }
>;

export default SettingsSlice;
