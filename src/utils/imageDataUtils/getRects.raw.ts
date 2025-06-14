import MSER, { type MSEROptions, type Rect } from "blob-detection-ts";

import getBackground from "./getBackground";

export default function rawGetRects(
  imageData: ImageData,
  options: MSEROptions,
): Rect[] {
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
      imageData.data[i + 2] === background[2] &&
      imageData.data[i + 3] === background[3]
    ) {
      imageData.data[i] = 255;
      imageData.data[i + 1] = 255;
      imageData.data[i + 2] = 255;
      imageData.data[i + 3] = 255;
    } else {
      imageData.data[i] = 0;
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = 255;
    }
  }

  const mser = new MSER(options);
  return mser.mergeRects(mser.extract(imageData).map((r) => r.rect));
}
