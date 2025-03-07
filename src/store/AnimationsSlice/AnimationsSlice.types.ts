import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

import { type SetValue } from "#src/utils";

type Animation = {
  fps: number;
  id: string;
  name: string;
  sprites: { index: number; offsetX: number; offsetY: number }[];
};

type AnimationsSlice = CreateGlobalSliceTypes.SliceOf<
  "animations",
  {
    animations: Animation[];
    createAnimation: AsyncFunc<string, [indices: number[]]>;
    resetAnimations: AsyncFunc;
    setAnimationName: AsyncFunc<void, [id: string, name: SetValue<string>]>;
  }
>;

export default AnimationsSlice;
