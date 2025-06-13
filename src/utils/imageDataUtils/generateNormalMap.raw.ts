export default function rawGenerateNormalMap(
  imageData: ImageData,
  { colorSpace, filterRadius, invertX, invertY, invertZ, strength }: Settings,
): ImageData {
  const data = imageData.data;

  imageData = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height,
  );

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const i = (y * imageData.width + x) * 4;

      const pX =
        getIntensity(
          x + filterRadius,
          y,
          imageData.width,
          imageData.height,
          data,
          colorSpace,
        ) -
        getIntensity(
          x - filterRadius,
          y,
          imageData.width,
          imageData.height,
          data,
          colorSpace,
        );

      const pY =
        getIntensity(
          x,
          y + filterRadius,
          imageData.width,
          imageData.height,
          data,
          colorSpace,
        ) -
        getIntensity(
          x,
          y - filterRadius,
          imageData.width,
          imageData.height,
          data,
          colorSpace,
        );

      let normalX = pX * strength + 128;
      let normalY = pY * strength + 128;
      let normalZ = 255;

      if (invertX) normalX = 255 - normalX;
      if (invertY) normalY = 255 - normalY;
      if (invertZ) normalZ = 255 - normalZ;

      imageData.data[i] = Math.max(0, Math.min(255, normalX));
      imageData.data[i + 1] = Math.max(0, Math.min(255, normalY));
      imageData.data[i + 2] = Math.max(0, Math.min(255, normalZ));
      imageData.data[i + 3] = 255;
    }
  }

  return imageData;
}

function getIntensity(
  x: number,
  y: number,
  width: number,
  height: number,
  data: Uint8ClampedArray<ArrayBufferLike>,
  colorSpace: "linear" | "sRGB",
): number {
  if (x < 0 || x >= width || y < 0 || y >= height) {
    x = Math.max(0, Math.min(width - 1, x));
    y = Math.max(0, Math.min(height - 1, y));
  }

  const i = (y * width + x) * 4;
  let r = data[i];
  let g = data[i + 1];
  let b = data[i + 2];

  if (colorSpace === "sRGB") {
    r = Math.pow(r / 255, 2.2) * 255;
    g = Math.pow(g / 255, 2.2) * 255;
    b = Math.pow(b / 255, 2.2) * 255;
  }

  return (r + g + b) / 3;
}

type Settings = {
  colorSpace: "linear" | "sRGB";
  filterRadius: number;
  invertX: boolean;
  invertY: boolean;
  invertZ: boolean;
  strength: number;
};
