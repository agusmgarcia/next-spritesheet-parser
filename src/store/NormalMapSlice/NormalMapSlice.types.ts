import {
  type CreateServerSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

import { type NormalMapSettingsSliceTypes } from "../NormalMapSettingsSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";

type NormalMap = {
  backgroundColor: string;
  imageURL: string;
};

type NormalMapSlice = CreateServerSliceTypes.SliceOf<
  "normalMap",
  NormalMap | undefined,
  {
    imageURL:
      | NonNullable<
          SpriteSheetSliceTypes.default["spriteSheet"]["data"]
        >["imageURL"]
      | undefined;
    strength: NormalMapSettingsSliceTypes.default["normalMapSettings"]["normalMapSettings"]["strength"];
  },
  {
    __setNormalMap__: Func<void, [normalMap: NormalMap]>;
  }
>;

export default NormalMapSlice;
