import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

type Animation = {
  color: string;
  fps: number;
  id: string;
  name: string;
  scale: number;
  sprites: {
    id: string;
    initialOffsetX: number;
    initialOffsetY: number;
    offsetX: number;
    offsetY: number;
  }[];
};

type AnimationsSlice = CreateGlobalSliceTypes.SliceOf<
  "animations",
  {
    animations: Animation[];
    createAnimation: AsyncFunc<string, [spriteIds: string[]]>;
    deleteAnimation: AsyncFunc<void, [id: string]>;
    resetAnimationOffset: AsyncFunc<void, [id: string, index: number]>;
    resetAnimations: AsyncFunc;
    setAnimationColor: AsyncFunc<
      void,
      [id: string, color: React.SetStateAction<string>]
    >;
    setAnimationFPS: AsyncFunc<
      void,
      [id: string, fps: React.SetStateAction<number>]
    >;
    setAnimationName: AsyncFunc<
      void,
      [id: string, name: React.SetStateAction<string>]
    >;
    setAnimationOffset: AsyncFunc<
      void,
      [
        id: string,
        index: number,
        offsetX: React.SetStateAction<number>,
        offsetY: React.SetStateAction<number>,
      ]
    >;
    setAnimations: AsyncFunc<void, [animations: Animation[]]>;
    setAnimationScale: AsyncFunc<
      void,
      [id: string, name: React.SetStateAction<number>]
    >;
  }
>;

export default AnimationsSlice;
