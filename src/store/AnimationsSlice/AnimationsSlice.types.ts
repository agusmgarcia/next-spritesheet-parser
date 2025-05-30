import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type Animation = {
  color: string;
  fps: number;
  id: string;
  name: string;
  onion: boolean;
  playing: boolean;
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
    __updateAnimations__: Func;
    animations: Animation[];
    createAnimation: Func<string | undefined, [spriteIds: string[]]>;
    deleteAnimation: AsyncFunc<boolean, [id: string]>;
    resetAnimationOffset: Func<void, [id: string, index: number]>;
    setAnimationColor: Func<
      void,
      [id: string, color: React.SetStateAction<string>]
    >;
    setAnimationFPS: Func<
      void,
      [id: string, fps: React.SetStateAction<number>]
    >;
    setAnimationName: Func<
      void,
      [id: string, name: React.SetStateAction<string>]
    >;
    setAnimationOffset: Func<
      void,
      [
        id: string,
        index: number,
        offsetX: React.SetStateAction<number>,
        offsetY: React.SetStateAction<number>,
      ]
    >;
    setAnimationOnion: Func<
      void,
      [id: string, onion: React.SetStateAction<boolean>]
    >;
    setAnimationPlaying: Func<
      void,
      [id: string, playing: React.SetStateAction<boolean>]
    >;
    setAnimations: AsyncFunc<void, [animations: Animation[]]>;
  }
>;

export default AnimationsSlice;
