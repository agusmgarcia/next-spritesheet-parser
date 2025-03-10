import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type SetValue } from "#src/utils";

type Animation = {
  color: string;
  fps: number;
  id: string;
  name: string;
  scale: number;
  sprites: { index: number; offsetX: number; offsetY: number }[];
};

type AnimationsSlice = CreateGlobalSliceTypes.SliceOf<
  "animations",
  {
    animations: Animation[];
    createAnimation: AsyncFunc<string, [indices: number[]]>;
    resetAnimations: AsyncFunc;
    setAnimationColor: AsyncFunc<void, [id: string, color: SetValue<string>]>;
    setAnimationFPS: AsyncFunc<void, [id: string, fps: SetValue<number>]>;
    setAnimationName: AsyncFunc<void, [id: string, name: SetValue<string>]>;
    setAnimationOffset: AsyncFunc<
      void,
      [
        id: string,
        index: number,
        offsetX: SetValue<number>,
        offsetY: SetValue<number>,
      ]
    >;
    setAnimations: AsyncFunc<void, [animations: Animation[]]>;
    setAnimationScale: AsyncFunc<void, [id: string, name: SetValue<number>]>;
  }
>;

export default AnimationsSlice;
