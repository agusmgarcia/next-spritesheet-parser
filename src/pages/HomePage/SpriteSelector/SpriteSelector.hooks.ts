import { type Func } from "@agusmgarcia/react-core";
import invert from "invert-color";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useSpriteSheet } from "#src/store";
import { getImageData } from "#src/utils";

import type SpriteSelectorProps from "./SpriteSelector.types";

export default function useSpriteSelector(props: SpriteSelectorProps) {
  const { imageURL, selected, sprites, toggleSelect } = useSpriteSheet();

  const imageCanvasRef = useRef<HTMLCanvasElement>(null);
  const selectionCanvasRef = useRef<HTMLCanvasElement>(null);

  const [imageData, setImageData] = useState<ImageData>();

  const color = useMemo(
    () =>
      !imageData
        ? ""
        : invert([imageData.data[0], imageData.data[1], imageData.data[2]]),
    [imageData],
  );

  const getSpriteIndex = useCallback<
    Func<number | undefined, [x: number, y: number]>
  >(
    (x, y) => {
      const index = sprites.findIndex(
        (sprite) =>
          sprite.left < x &&
          sprite.right > x &&
          sprite.top < y &&
          sprite.bottom > y,
      );

      return index !== -1 ? index : undefined;
    },
    [sprites],
  );

  const onClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const rect = event.currentTarget.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const spriteIndex = getSpriteIndex(x, y);

      if (!spriteIndex) return;
      toggleSelect(spriteIndex);
    },
    [getSpriteIndex, toggleSelect],
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

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const spriteIndex = getSpriteIndex(x, y);

      button.style.cursor = !!spriteIndex ? "pointer" : "default";
    },
    [getSpriteIndex],
  );

  useEffect(() => {
    const controller = new AbortController();

    getImageData(imageURL)
      .then((image) => {
        if (controller.signal.aborted) return;
        setImageData(image);
      })
      .catch(() => {});

    return () => controller.abort();
  }, [imageURL, sprites]);

  useEffect(() => {
    if (!imageData) return;

    const imageCanvas = imageCanvasRef.current;
    if (!imageCanvas) return;

    imageCanvas.width = imageData.width;
    imageCanvas.height = imageData.height;

    const context = imageCanvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    context.putImageData(imageData, 0, 0);

    sprites.forEach((r) => {
      context.strokeStyle = color;
      context.strokeRect(r.left, r.top, r.width, r.height);
    });
  }, [color, imageData, sprites]);

  useEffect(() => {
    if (!imageData) return;

    const selectionCanvas = selectionCanvasRef.current;
    if (!selectionCanvas) return;

    selectionCanvas.width = imageData.width;
    selectionCanvas.height = imageData.height;

    const context = selectionCanvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, selectionCanvas.width, selectionCanvas.height);
    if (!selected.length) return;

    selected.forEach((spriteIndex) => {
      const sprite = sprites.at(spriteIndex);
      if (!sprite) return;

      context.globalAlpha = 0.4;
      context.fillStyle = color;
      context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height);
      context.globalAlpha = 1;
    });
  }, [color, imageData, selected, sprites]);

  return {
    ...props,
    imageCanvasRef,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    selectionCanvasRef,
  };
}
