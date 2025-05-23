import { type Tuple } from "@agusmgarcia/react-core";

export async function createFile(
  imageData: ImageData,
  name: string,
  type: string | undefined,
  signal: AbortSignal,
): Promise<File> {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Context is not available");

  context.imageSmoothingEnabled = false;
  context.imageSmoothingQuality = "high";

  context.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob | undefined>((resolve) =>
    canvas.toBlob((blob) => resolve(blob || undefined), type),
  );

  signal.throwIfAborted();
  if (!blob) throw new Error("Unexpected scenario");

  return new File([blob], name, { type });
}

export function get(image: HTMLImageElement): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Context is not available");

  context.imageSmoothingEnabled = false;
  context.imageSmoothingQuality = "high";

  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

export function getBackground(imageData: ImageData): Tuple<number, 3> {
  return [imageData.data[0], imageData.data[1], imageData.data[2]];
}

export function getBackgroundColor(imageData: ImageData): string {
  const backgroundColor = getBackground(imageData);
  return `#${backgroundColor[0].toString(16)}${backgroundColor[1].toString(16)}${backgroundColor[2].toString(16)}`;
}

export function generateNormalMap(
  imageData: ImageData,
  strength: number,
): ImageData {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  const context = document.createElement("canvas").getContext("2d");
  if (!context) throw new Error("Context is not available");

  context.imageSmoothingEnabled = false;
  context.imageSmoothingQuality = "high";

  const outputImageData = context.createImageData(width, height);
  const outputData = outputImageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      const pX =
        getIntensity(x + 1, y, width, height, data) -
        getIntensity(x - 1, y, width, height, data);

      const pY =
        getIntensity(x, y + 1, width, height, data) -
        getIntensity(x, y - 1, width, height, data);

      const normalX = pX * strength + 128;
      const normalY = pY * strength + 128;

      outputData[i] = Math.max(0, Math.min(255, normalX));
      outputData[i + 1] = Math.max(0, Math.min(255, normalY));
      outputData[i + 2] = 255;
      outputData[i + 3] = 255;
    }
  }

  return outputImageData;
}

function getIntensity(
  x: number,
  y: number,
  width: number,
  height: number,
  data: Uint8ClampedArray<ArrayBufferLike>,
): number {
  if (x < 0 || x >= width || y < 0 || y >= height) return 0;
  const i = (y * width + x) * 4;
  return (data[i] + data[i + 1] + data[i + 2]) / 3;
}

export function removeBackground(imageData: ImageData): ImageData {
  const background = getBackground(imageData);

  imageData = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height,
  );

  for (let i = 0; i < imageData.data.length; i += 4) {
    if (
      imageData.data[i] === background[0] &&
      imageData.data[i + 1] === background[1] &&
      imageData.data[i + 2] === background[2]
    ) {
      imageData.data[i] = 0;
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = 0;
    }
  }

  return imageData;
}
