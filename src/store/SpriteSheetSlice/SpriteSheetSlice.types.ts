import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
  type Tuple,
} from "@agusmgarcia/react-core";

export type Animation = {
  fps: number;
  id: string;
  indices: number[];
  name: string;
};

export type Sprite = {
  bottom: number;
  focusX: number;
  focusY: number;
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
    selected: number[];
    set: AsyncFunc<void, [input: File]>;
    sprites: Sprite[];
    toggleSelect: AsyncFunc<void, [spriteIndex: number]>;
  }
>;

export default SpriteSheetSlice;
