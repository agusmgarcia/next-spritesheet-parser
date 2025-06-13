import getBackground from "./getBackground";

export default function rawRemoveBackground(imageData: ImageData): ImageData {
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
