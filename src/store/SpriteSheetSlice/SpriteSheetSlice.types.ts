export type SpriteSheet = {
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

export type Request = {
  image: File | SpriteSheet["image"];
  settings: SpriteSheet["settings"];
};
