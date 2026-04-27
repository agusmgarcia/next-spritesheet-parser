export type Input = [
  imageData: ImageData,
  name: string,
  type: string | undefined,
  signal: AbortSignal,
];

export type Output = File;
