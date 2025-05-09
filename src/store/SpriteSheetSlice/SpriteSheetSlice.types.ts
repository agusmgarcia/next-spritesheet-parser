import {
  type CreateServerSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

import { type SettingsSliceTypes } from "../SettingsSlice";

type SpriteSheet = {
  backgroundColor: string;
  color: string;
  imageURL: string;
  name: string;
  sprites: Record<
    string,
    {
      bottom: number;
      height: number;
      left: number;
      right: number;
      subsprites: SpriteSheet["sprites"];
      top: number;
      width: number;
    }
  >;
};

type SpriteSheetSlice = CreateServerSliceTypes.SliceOf<
  "spriteSheet",
  SpriteSheet | undefined,
  SettingsSliceTypes.default["settings"]["settings"],
  {
    mergeSprites: Func<void, [spriteIds: string[]]>;
    setSpriteSheet: Func<void, [sprites: SpriteSheet]>;
    splitSprite: Func<void, [spriteId: string]>;
  }
>;

export default SpriteSheetSlice;
