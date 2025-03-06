import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
  type Tuple,
} from "@agusmgarcia/react-core";

import { type SetValue } from "#src/utils";

export type Animation = {
  fps: number;
  id: string;
  name: string;
  sprites: { index: number; offsetX: number; offsetY: number }[];
  zoom: number;
};

export type Sprite = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

type SpriteSheetSlice = CreateGlobalSliceTypes.SliceOf<
  "spriteSheet",
  {
    animations: Animation[];
    backgroundColor: Tuple<number, 3> | [];
    createAnimation: AsyncFunc<string>;
    imageURL: string;
    reset: AsyncFunc;
    set: AsyncFunc<void, [input: File]>;
    setAnimationName: AsyncFunc<
      void,
      [animationId: string, name: SetValue<string>]
    >;
    setAnimationZoom: AsyncFunc<
      void,
      [animationId: string, zoom: SetValue<number>]
    >;
    sprites: Sprite[];
    spritesSelected: number[];
    toggleSelectSprite: AsyncFunc<void, [spriteIndex: number]>;
    unselectAllSprites: AsyncFunc;
  }
>;

export default SpriteSheetSlice;
