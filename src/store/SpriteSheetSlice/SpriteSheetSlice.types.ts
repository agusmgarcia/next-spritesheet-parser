export type SpriteSheet = Record<
  string,
  {
    height: number;
    subsprites: SpriteSheet;
    width: number;
    x: number;
    y: number;
  }
>;
