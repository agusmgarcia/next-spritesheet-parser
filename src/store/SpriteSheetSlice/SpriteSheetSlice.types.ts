import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
  type Tuple,
} from "@agusmgarcia/react-core";

type SpriteSheet = {
  backgroundColor: Tuple<number, 3>;
  imageURL: string;
  sprites: {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  }[];
};

type SpriteSheetSlice = CreateGlobalSliceTypes.SliceOf<
  "spriteSheet",
  {
    createSpriteSheet: AsyncFunc<void, [input: File]>;
    resetSpriteSheet: AsyncFunc;
    spriteSheet: SpriteSheet | undefined;
  }
>;

export default SpriteSheetSlice;
