import {
  type AsyncFunc,
  type CreateServerSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type SpriteSheet = {
  image: {
    backgroundColor: string;
    name: string;
    type: string;
    url: string;
  };
  settings: {
    delta: number;
    maxArea: number;
    maxVariation: number;
    minArea: number;
    minDiversity: number;
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

type SpriteSheetSlice = CreateServerSliceTypes.SliceOf<
  "spriteSheet",
  SpriteSheet,
  Pick<SpriteSheet, "settings"> & { image: File | SpriteSheet["image"] },
  {
    mergeSpriteSheetSprites: AsyncFunc<void, [spriteIds: string[]]>;
    removeSpriteSheet: AsyncFunc;
    setSpriteSheetImage: AsyncFunc<void, [image: File]>;
    setSpriteSheetName: Func<void, [name: React.SetStateAction<string>]>;
    setSpriteSheetSettings: AsyncFunc<
      void,
      [settings: React.SetStateAction<SpriteSheet["settings"]>]
    >;
    setSpriteSheetSprites: Func<void, [sprites: SpriteSheet["sprites"]]>;
    splitSpriteSheetSprite: AsyncFunc<void, [spriteId: string]>;
  }
>;

export default SpriteSheetSlice;
