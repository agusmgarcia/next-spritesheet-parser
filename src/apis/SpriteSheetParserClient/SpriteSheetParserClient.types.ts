export type GetStateRequest = { id: string };

export type State = {
  v1: {
    createdAt: number;
    updatedAt: number;
    version: "v1";
  } & Partial<{
    animations: {
      color: string;
      fps: number;
      grid: boolean | undefined;
      id: string;
      name: string;
      onion: boolean;
      playing: boolean;
      sprites: {
        center: {
          initialOffsetX: number;
          initialOffsetY: number;
          offsetX: number;
          offsetY: number;
          visible: boolean;
        };
        id: string;
      }[];
    }[];
    normalMapSettings: {
      colorSpace: "linear" | "sRGB";
      filterRadius: number;
      invertX: boolean;
      invertY: boolean;
      invertZ: boolean;
      name: string;
      strength: number;
    };
    spriteSheet: Record<
      string,
      {
        height: number;
        subsprites: NonNullable<State["v1"]["spriteSheet"]>;
        width: number;
        x: number;
        y: number;
      }
    >;
    spriteSheetSettings: {
      delta: number;
      maxVariation: number;
      minDiversity: number;
      name: string;
    };
  }>;

  v2: {
    createdAt: number;
    updatedAt: number;
    version: "v2";
  } & Partial<{
    animations: Record<
      string,
      Pick<
        NonNullable<State["v1"]["animations"]>[number],
        "fps" | "name" | "sprites"
      >
    >;
    normalMapSettings: NonNullable<State["v1"]["normalMapSettings"]>;
    spriteSheet: NonNullable<State["v1"]["spriteSheet"]>;
    spriteSheetSettings: NonNullable<State["v1"]["spriteSheetSettings"]>;
  }>;
};

export type GetStateResponse = State["v2"];

export type PatchStateRequest = { id: string } & Partial<
  Omit<GetStateResponse, "createdAt" | "updatedAt" | "version">
>;

export type PatchStateResponse = void;

export type DeleteStateRequest = { id: string };

export type DeleteStateResponse = void;
