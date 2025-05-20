import {
  type AsyncFunc,
  type CreateServerSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

import { type SettingsSliceTypes } from "../SettingsSlice";

type SpriteSheet = {
  backgroundColor: string;
  color: string;
  imageURL: string;
  name: string;
  scale: number;
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
    __setSpriteSheet__: Func<void, [sprites: SpriteSheet]>;
    mergeSprites: AsyncFunc<void, [spriteIds: string[]]>;
    setSpriteSheetScale: Func<void, [scale: React.SetStateAction<number>]>;
    splitSprite: AsyncFunc<void, [spriteId: string]>;
  }
>;

export default SpriteSheetSlice;
