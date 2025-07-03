import { type CreateGlobalSliceTypes } from "@agusmgarcia/react-essentials-store";
import { type AsyncFunc, type Func } from "@agusmgarcia/react-essentials-utils";

type Animation = {
  color: string;
  fps: number;
  id: string;
  name: string;
  onion: boolean;
  playing: boolean;
  sprites: {
    id: string;
    offset: {
      initialX: number;
      initialY: number;
      x: number;
      y: number;
    };
  }[];
};

type AnimationsSlice = CreateGlobalSliceTypes.SliceOf<
  "animations",
  {
    animations: Animation[];
    createAnimation: Func<string | undefined, [spriteIds: string[]]>;
    deleteAnimation: AsyncFunc<boolean, [id: string]>;
    resetAnimationOffset: Func<void, [id: string, index: number]>;
    setAnimationColor: Func<void, [id: string, color: string]>;
    setAnimationFPS: Func<
      void,
      [id: string, fps: React.SetStateAction<number>]
    >;
    setAnimationName: Func<void, [id: string, name: string]>;
    setAnimationOffset: Func<
      void,
      [
        id: string,
        index: number,
        offset: React.SetStateAction<{ x: number; y: number }>,
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
