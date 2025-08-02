export type GetStateRequest = { id: string };

export type GetStateResponseV2 = {
  createdAt: number;
  updatedAt: number;
  version: "v2";
} & Partial<{
  animations: {
    color: string;
    fps: number;
    id: string;
    name: string;
    onion: boolean;
    playing: boolean;
    sprites: {
      boundingBoxes: {
        color: string;
        height: number;
        id: string;
        offsetX: number;
        offsetY: number;
        visible: boolean;
        width: number;
      }[];
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
      subsprites: NonNullable<GetStateResponseV2["spriteSheet"]>;
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

export type GetStateResponseV1 = {
  createdAt: number;
  updatedAt: number;
  version: "v1";
} & Partial<{
  animations: {
    color: string;
    fps: number;
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
      subsprites: NonNullable<GetStateResponseV1["spriteSheet"]>;
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

export type GetStateResponse = GetStateResponseV2;

export type PatchStateRequest = { id: string } & Partial<
  Omit<GetStateResponse, "createdAt" | "updatedAt" | "version">
>;

export type PatchStateResponse = void;

export type DeleteStateRequest = { id: string };

export type DeleteStateResponse = void;
