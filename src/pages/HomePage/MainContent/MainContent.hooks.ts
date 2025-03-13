import { type Func, type Tuple } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useRef, useState } from "react";

import { useSpriteSheet } from "#src/store";
import { loadImage, useDevicePixelRatio, useDimensions } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent({
  indices: indicesFromProps,
  select: selectFromProps,
  toggleSelection: toggleSelectionFromProps,
  ...rest
}: MainContentProps) {
  const { spriteSheet } = useSpriteSheet();

  const rootRef = useRef<HTMLDivElement>(null);
  const spriteSheetCanvasRef = useRef<HTMLCanvasElement>(null);
  const selectionCanvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();
  const [initialCursor, setInitialCursor] = useState<Tuple<number, 4>>();
  const [preSelectedSprites, setPreSelectedSprites] = useState<number[]>();

  const rootDimensions = useDimensions(rootRef);
  const devicePixelRatio = useDevicePixelRatio();

  const getSpriteIndex = useCallback<
    Func<number | undefined, [x: number, y: number]>
  >(
    (x, y) => {
      const sprites = spriteSheet?.sprites;
      if (!sprites) return undefined;

      const index = sprites.findIndex(
        (sprite) =>
          sprite.left < x &&
          sprite.right > x &&
          sprite.top < y &&
          sprite.bottom > y,
      );

      return index !== -1 ? index : undefined;
    },
    [spriteSheet?.sprites],
  );

  const getSpritesIndex = useCallback<
    Func<number[], [x: number, y: number, width: number, height: number]>
  >(
    (x, y, width, height) => {
      const sprites = spriteSheet?.sprites;
      if (!sprites) return [];

      const left = x;
      const right = x + width;
      const top = y;
      const bottom = y + height;

      return sprites
        .map((sprite, index) =>
          sprite.left < right &&
          sprite.right > left &&
          sprite.top < bottom &&
          sprite.bottom > top
            ? index
            : -1,
        )
        .filter((index) => index !== -1);
    },
    [spriteSheet?.sprites],
  );

  const onClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      setInitialCursor(undefined);

      if (!!preSelectedSprites) {
        preSelectedSprites.forEach(selectFromProps);
        setPreSelectedSprites(undefined);
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / devicePixelRatio;
      const y = (event.clientY - rect.top) / devicePixelRatio;

      const spriteIndex = getSpriteIndex(x, y);
      if (!spriteIndex) return;

      toggleSelectionFromProps(spriteIndex);
    },
    [
      devicePixelRatio,
      getSpriteIndex,
      preSelectedSprites,
      selectFromProps,
      toggleSelectionFromProps,
    ],
  );

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / devicePixelRatio;
      const y = (event.clientY - rect.top) / devicePixelRatio;

      setInitialCursor([x, y, x, y]);
    },
    [devicePixelRatio],
  );

  const onMouseEnter = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const button = event.currentTarget;
      button.dataset.prevCursor = button.style.cursor;
      button.style.cursor = "default";
    },
    [],
  );

  const onMouseLeave = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const button = event.currentTarget;
      button.style.cursor = button.dataset.prevCursor || "";
      delete button.dataset.prevCursor;
    },
    [],
  );

  const onMouseMove = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();

      const x = (event.clientX - rect.left) / devicePixelRatio;
      const y = (event.clientY - rect.top) / devicePixelRatio;

      if (initialCursor === undefined) {
        const spriteIndex = getSpriteIndex(x, y);
        button.style.cursor = !!spriteIndex ? "pointer" : "default";
        return;
      }

      setPreSelectedSprites(
        getSpritesIndex(
          Math.min(x, initialCursor[0]),
          Math.min(y, initialCursor[1]),
          Math.abs(x - initialCursor[0]),
          Math.abs(y - initialCursor[1]),
        ),
      );

      setInitialCursor((prev) =>
        !!prev ? [prev[0], prev[1], x, y] : [x, y, x, y],
      );
    },
    [devicePixelRatio, getSpriteIndex, getSpritesIndex, initialCursor],
  );

  useEffect(() => {
    if (!spriteSheet?.imageURL) return;
    const controller = new AbortController();

    loadImage(spriteSheet.imageURL, controller.signal)
      .then((image) => {
        if (controller.signal.aborted) return;
        setImage(image);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        // TODO: handle error
      });

    return () => controller.abort();
  }, [spriteSheet?.imageURL]);

  useEffect(() => {
    if (!image) return;

    const sprites = spriteSheet?.sprites;
    if (!sprites) return;

    const spriteSheetCanvas = spriteSheetCanvasRef.current;
    if (!spriteSheetCanvas) return;

    spriteSheetCanvas.width = Math.max(
      rootDimensions.width,
      image.width * devicePixelRatio,
    );
    spriteSheetCanvas.height = Math.max(
      rootDimensions.height,
      image.height * devicePixelRatio,
    );

    const context = spriteSheetCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, spriteSheetCanvas.width, spriteSheetCanvas.height);
    context.fillStyle = spriteSheet.backgroundColor;
    context.fillRect(0, 0, spriteSheetCanvas.width, spriteSheetCanvas.height);
    context.scale(devicePixelRatio, devicePixelRatio);
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

    sprites.forEach((r) => {
      context.strokeStyle = spriteSheet.color;
      context.strokeRect(r.left, r.top, r.width, r.height);
    });
  }, [
    devicePixelRatio,
    image,
    rootDimensions.height,
    rootDimensions.width,
    spriteSheet?.backgroundColor,
    spriteSheet?.color,
    spriteSheet?.sprites,
  ]);

  useEffect(() => {
    if (!image) return;

    const sprites = spriteSheet?.sprites;
    if (!sprites) return;

    const selectionCanvas = selectionCanvasRef.current;
    if (!selectionCanvas) return;

    selectionCanvas.width = Math.max(
      rootDimensions.width,
      image.width * devicePixelRatio,
    );
    selectionCanvas.height = Math.max(
      rootDimensions.height,
      image.height * devicePixelRatio,
    );

    const context = selectionCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, selectionCanvas.width, selectionCanvas.height);
    context.scale(devicePixelRatio, devicePixelRatio);

    indicesFromProps.forEach((index) => {
      const sprite = sprites.at(index);
      if (!sprite) return;

      context.globalAlpha = 0.4;
      context.fillStyle = spriteSheet.color;
      context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height);
      context.globalAlpha = 1;
    });

    preSelectedSprites?.forEach((index) => {
      const sprite = sprites.at(index);
      if (!sprite) return;

      if (indicesFromProps.includes(index)) return;

      context.globalAlpha = 0.4;
      context.fillStyle = spriteSheet.color;
      context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height);
      context.globalAlpha = 1;
    });

    if (!!initialCursor) {
      context.globalAlpha = 0.2;
      context.fillStyle = spriteSheet.color;
      context.fillRect(
        Math.min(initialCursor[2], initialCursor[0]),
        Math.min(initialCursor[3], initialCursor[1]),
        Math.abs(initialCursor[2] - initialCursor[0]),
        Math.abs(initialCursor[3] - initialCursor[1]),
      );
    }
  }, [
    devicePixelRatio,
    image,
    indicesFromProps,
    initialCursor,
    preSelectedSprites,
    rootDimensions.height,
    rootDimensions.width,
    spriteSheet?.color,
    spriteSheet?.sprites,
  ]);

  return {
    ...rest,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    rootRef,
    selectionCanvasRef,
    spriteSheetCanvasRef,
  };
}
