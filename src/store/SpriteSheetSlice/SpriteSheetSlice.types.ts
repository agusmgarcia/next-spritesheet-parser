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
    maxVariation: number;
    minDiversity: number;
  };
  sprites: Record<
    string,
    {
      height: number;
      subsprites: SpriteSheet["sprites"];
      width: number;
      x: number;
      y: number;
    }
  >;
};

export type Request = {
  image: File | SpriteSheet["image"];
  settings: SpriteSheet["settings"];
};
