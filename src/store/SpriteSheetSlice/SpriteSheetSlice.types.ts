import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

type SpriteSheet = {
  backgroundColor: string;
  color: string;
  imageURL: string;
  name: string;
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
