import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

import { type AnimationsSliceTypes } from "../AnimationsSlice";
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
