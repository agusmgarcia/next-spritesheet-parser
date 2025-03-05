import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";
import MSER from "blob-detection-ts";
import { v4 as createUUID } from "uuid";

import { loadImage } from "#src/utils";

import type SpriteSheetSlice from "./SpriteSheetSlice.types";
import { type Sprite } from "./SpriteSheetSlice.types";

export default createGlobalSlice<SpriteSheetSlice>("spriteSheet", () => ({
  animations: [],
  backgroundColor: [],
  createAnimation,
  imageURL: "",
  reset,
  selected: [],
  set,
  setAnimationName,
  sprites: [],
  toggleSelect,
  unselectAll,
}));

async function createAnimation(
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<string> {
  if (!context.get().spriteSheet.selected.length) return "";

  function sortSprites(spriteIndex1: number, spriteIndex2: number): number {
    const sprite1 = context.get().spriteSheet.sprites[spriteIndex1];
    const sprite2 = context.get().spriteSheet.sprites[spriteIndex2];

    return sprite1.top <= sprite2.top + sprite2.height &&
      sprite1.top + sprite1.height >= sprite2.top
      ? sprite1.left - sprite2.left
      : sprite1.top - sprite2.top;
  }

  const id = createUUID();
  context.set((prev) => ({
    ...prev,
    animations: [
      ...prev.animations,
      {
        fps: 12,
        id,
        indices: prev.selected.sort(sortSprites),
        name: "New animation",
      },
    ],
    selected: [],
  }));

  return id;
}

async function reset(
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  URL.revokeObjectURL(context.get().spriteSheet.imageURL);
  context.set(() => ({
    animations: [],
    backgroundColor: [],
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

  function getImageData(image: HTMLImageElement): ImageData {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Context is not available");

    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  }

  function getSprites(imageData: ImageData): Sprite[] {
    const auxImageData = new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height,
    );

    const binaryImage = new ImageData(
      new Uint8ClampedArray(auxImageData.data),
      auxImageData.width,
      auxImageData.height,
    );

    for (let i = 0; i < binaryImage.data.length; i += 4) {
      if (
        binaryImage.data[i] === imageData.data[0] &&
        binaryImage.data[i + 1] === imageData.data[1] &&
        binaryImage.data[i + 2] === imageData.data[2]
      ) {
        binaryImage.data[i] = 255;
        binaryImage.data[i + 1] = 255;
        binaryImage.data[i + 2] = 255;
        binaryImage.data[i + 3] = 255;
      } else {
        binaryImage.data[i] = 0;
        binaryImage.data[i + 1] = 0;
        binaryImage.data[i + 2] = 0;
        binaryImage.data[i + 3] = 255;
      }
    }

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

  try {
    const imageData = getImageData(await loadImage(imageURL));
    const sprites = getSprites(imageData);
    context.set({
      animations: [],
      backgroundColor: [
        imageData.data[0],
        imageData.data[1],
        imageData.data[2],
      ],
      imageURL,
      selected: [],
      sprites,
    });
  } catch {
    URL.revokeObjectURL(imageURL);
  }
}

async function setAnimationName(
  id: Parameters<SpriteSheetSlice["spriteSheet"]["setAnimationName"]>[0][0],
  name: Parameters<SpriteSheetSlice["spriteSheet"]["setAnimationName"]>[0][1],
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  context.set((prev) => ({
    ...prev,
    animations: prev.animations.map((a) => (a.id === id ? { ...a, name } : a)),
  }));
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

async function unselectAll(
  context: CreateGlobalSliceTypes.Context<SpriteSheetSlice>,
): Promise<void> {
  context.set((prev) => ({ ...prev, selected: [] }));
}
