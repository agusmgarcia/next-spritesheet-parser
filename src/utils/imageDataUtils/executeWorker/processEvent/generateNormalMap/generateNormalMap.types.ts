export type Input = [
  imageData: ImageData,
  settings: {
    colorSpace: "linear" | "sRGB";
    filterRadius: number;
    invertX: boolean;
    invertY: boolean;
    invertZ: boolean;
    strength: number;
  },
];

export type Output = ImageData;
