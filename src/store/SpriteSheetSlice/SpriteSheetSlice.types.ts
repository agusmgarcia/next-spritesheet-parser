import {
  type AsyncFunc,
  type CreateServerSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type SpriteSheet = {
  image: {
    backgroundColor: string;
    height: number;
    name: string;
    type: string;
    url: string;
    width: number;
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
    setSpriteSheetName: Func<void, [name: string]>;
    setSpriteSheetSettings: AsyncFunc<
      boolean,
      [settings: SpriteSheet["settings"]]
    >;
    setSpriteSheetSprites: Func<void, [sprites: SpriteSheet["sprites"]]>;
    splitSpriteSheetSprite: AsyncFunc<void, [spriteId: string]>;
  }
>;

export default SpriteSheetSlice;
