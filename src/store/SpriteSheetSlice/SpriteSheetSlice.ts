import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  type Tuple,
} from "@agusmgarcia/react-core";
import MSER from "blob-detection-ts";

import { getImageData } from "#src/utils";

import type SpriteSheetSlice from "./SpriteSheetSlice.types";
import { type Sprite } from "./SpriteSheetSlice.types";

export default createGlobalSlice<SpriteSheetSlice>("spriteSheet", () => ({
  animations: [],
  createAnimation,
  imageURL: "",
  reset,
  selected: [],
  set,
  sprites: [],
  toggleSelect,
}));

async function createAnimation(
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  if (!context.get().spriteSheet.selected.length) return;

  function sortSprites(spriteIndex1: number, spriteIndex2: number): number {
    const sprite1 = context.get().spriteSheet.sprites[spriteIndex1];
    const sprite2 = context.get().spriteSheet.sprites[spriteIndex2];

    return sprite1.top <= sprite2.top + sprite2.height &&
      sprite1.top + sprite1.height >= sprite2.top
      ? sprite1.left - sprite2.left
      : sprite1.top - sprite2.top;
  }

  context.set((prev) => ({
    ...prev,
    animations: [
      ...prev.animations,
      { fps: 12, name: "", spriteIndices: prev.selected.sort(sortSprites) },
    ],
    selected: [],
  }));
}

async function reset(
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  URL.revokeObjectURL(context.get().spriteSheet.imageURL);
  context.set(() => ({
    animations: [],
    imageURL: "",
    selected: [],
    sprites: [],
  }));
}

async function set(
  input: Parameters<SpriteSheetSlice["spriteSheet"]["set"]>[0],
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  URL.revokeObjectURL(context.get().spriteSheet.imageURL);
  const imageURL = URL.createObjectURL(input);

  try {
    const imageData = await getImageData(imageURL);
    const sprites = getSprites(imageData);
    context.set({ animations: [], imageURL, selected: [], sprites });
  } catch {
    URL.revokeObjectURL(imageURL);
  }
}

async function toggleSelect(
  spriteIndex: Parameters<SpriteSheetSlice["spriteSheet"]["toggleSelect"]>[0],
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  context.set((prev) => ({
    ...prev,
    selected:
      spriteIndex < 0 || spriteIndex >= prev.sprites.length
        ? prev.selected
        : prev.selected.includes(spriteIndex)
          ? prev.selected.filter((sI) => sI !== spriteIndex)
          : [...prev.selected, spriteIndex],
  }));
}

function getSprites(imageData: ImageData): Sprite[] {
  const imgData = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height,
  );

  const binaryImage = getBinaryImage(
    imgData,
    [imageData.data[0], imageData.data[1], imageData.data[2]],
    [255, 255, 255],
  );

  const mser = new MSER({
    delta: 0,
    maxArea: 0.5,
    maxVariation: 0.5,
    minArea: 0,
    minDiversity: 0.33,
  });

  return mser
    .mergeRects(mser.extract(binaryImage).map((r) => r.rect))
    .map((r) => ({
      bottom: r.bottom,
      focusX: (r.right - r.left) / 2,
      focusY: (r.bottom - r.top) / 2,
      height: r.bottom - r.top,
      left: r.left,
      right: r.right,
      top: r.top,
      width: r.right - r.left,
    }));
}

function getBinaryImage(
  image: ImageData,
  bgColor: Tuple<number, 3>,
  replaceColor: Tuple<number, 3>,
): ImageData {
  const binaryImage = new ImageData(
    new Uint8ClampedArray(image.data),
    image.width,
    image.height,
  );

  for (let i = 0; i < binaryImage.data.length; i += 4) {
    if (
      binaryImage.data[i] === bgColor[0] &&
      binaryImage.data[i + 1] === bgColor[1] &&
      binaryImage.data[i + 2] === bgColor[2]
    ) {
      binaryImage.data[i] = replaceColor[0];
      binaryImage.data[i + 1] = replaceColor[1];
      binaryImage.data[i + 2] = replaceColor[2];
      binaryImage.data[i + 3] = 255;
    } else {
      binaryImage.data[i] = 0;
      binaryImage.data[i + 1] = 0;
      binaryImage.data[i + 2] = 0;
      binaryImage.data[i + 3] = 255;
    }
  }

  return binaryImage;
}
