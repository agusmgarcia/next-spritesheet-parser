import { sorts } from "@agusmgarcia/react-essentials-utils";

export default function stackRectangles<TRectangle extends BaseRectangle>(
  input: TRectangle[],
): { length: number; rectangles: (TRectangle & Rectangle)[] } {
  const aux = input
    .map((r) => ({ ...r, height: r.height + 1, width: r.width + 1 }))
    .map((r) => ({ ...r, area: r.width * r.height }))
    .sort((r1, r2) => sorts.byNumberDesc(r1.area, r2.area));

  let length = 1;
  let image = new Array<boolean>(length * length).fill(true);

  const rectangles: (TRectangle & Rectangle)[] = [];

  for (const rect of aux) {
    while (true) {
      const updRect = insertRectangle(rect, image, length);

      if (!!updRect) {
        rectangles.push({
          ...updRect,
          height: updRect.height - 1,
          width: updRect.width - 1,
        });
        break;
      }

      image = increaseImageLength(image, length, length * 2);
      length *= 2;
    }
  }

  return { length, rectangles };
}

type BaseRectangle = { height: number; width: number };

type Rectangle = BaseRectangle & { x: number; y: number };

function insertRectangle<TRectangle extends BaseRectangle>(
  rect: TRectangle,
  image: Array<boolean>,
  length: number,
): (TRectangle & Rectangle) | undefined {
  const limitY = length - rect.height + 1;
  const limitX = length - rect.width + 1;

  for (let y = 0; y < limitY; y++) {
    for (let x = 0; x < limitX; x++) {
      if (!isSpaceAvailable(rect, x, y, image, length)) continue;

      fillSpace(rect, x, y, image, length);
      return { ...rect, x, y };
    }
  }

  return undefined;
}

function isSpaceAvailable<TRectangle extends BaseRectangle>(
  rect: TRectangle,
  x: number,
  y: number,
  image: Array<boolean>,
  length: number,
): boolean {
  const limitY = y + rect.height;
  const limitX = x + rect.width;

  for (let yAux = y; yAux < limitY; yAux++) {
    const yAxis = yAux * length;

    for (let xAux = x; xAux < limitX; xAux++)
      if (!image[xAux + yAxis]) return false;
  }

  return true;
}

function fillSpace<TRectangle extends BaseRectangle>(
  rect: TRectangle,
  x: number,
  y: number,
  image: Array<boolean>,
  length: number,
) {
  const limitY = y + rect.height;
  const limitX = x + rect.width;

  for (let yAux = y; yAux < limitY; yAux++) {
    const yAxis = yAux * length;
    for (let xAux = x; xAux < limitX; xAux++) image[xAux + yAxis] = false;
  }
}

function increaseImageLength(
  image: Array<boolean>,
  length: number,
  newLength: number,
): Array<boolean> {
  const newImage = new Array(newLength * newLength).fill(true);

  for (let y = 0; y < length; y++) {
    const yAxisOld = y * length;
    const yAxisNew = y * newLength;

    for (let x = 0; x < length; x++)
      newImage[x + yAxisNew] = image[x + yAxisOld];
  }

  return newImage;
}
