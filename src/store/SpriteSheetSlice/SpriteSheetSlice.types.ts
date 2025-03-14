import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";

type SpriteSheet = {
  settings: {
    delta: number;
    maxArea: number;
    maxVariation: number;
    minArea: number;
    minDiversity: number;
  };
  sheet: {
    backgroundColor: string;
    color: string;
    imageURL: string;
    name: string;
  };
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

type SpriteSheetSlice = CreateGlobalSliceTypes.SliceOf<
  "spriteSheet",
  {
    createSpriteSheet: AsyncFunc<void, [input: File]>;
    mergeSpriteSheetSprites: AsyncFunc<void, [spriteIds: string[]]>;
    setSpriteSheet: AsyncFunc<
      void,
      [spriteSheet: Pick<SpriteSheet, "settings" | "sprites">]
    >;
    setSpriteSheetSettings: AsyncFunc<
      void,
      [settings: React.SetStateAction<SpriteSheet["settings"]>]
    >;
    spriteSheet: SpriteSheet | undefined;
  }
>;

export default SpriteSheetSlice;
