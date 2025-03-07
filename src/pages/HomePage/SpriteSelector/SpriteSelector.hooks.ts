import { type Func } from "@agusmgarcia/react-core";
import invert from "invert-color";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useSpriteSheet } from "#src/store";
import { loadImage, useViewport } from "#src/utils";

import type SpriteSelectorProps from "./SpriteSelector.types";

export default function useSpriteSelector({
  indices,
  toggleSelection,
  ...props
}: SpriteSelectorProps) {
  const viewport = useViewport();

  const { spriteSheet } = useSpriteSheet();

  const spriteSheetCanvasRef = useRef<HTMLCanvasElement>(null);
  const selectionCanvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();

  const color = useMemo(
    () =>
      !spriteSheet?.backgroundColor.length
        ? ""
        : invert([
            spriteSheet.backgroundColor[0],
            spriteSheet.backgroundColor[1],
            spriteSheet.backgroundColor[2],
          ]),
    [spriteSheet?.backgroundColor],
  );

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

  const onClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const rect = event.currentTarget.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const spriteIndex = getSpriteIndex(x, y);

      if (!spriteIndex) return;
      toggleSelection(spriteIndex);
    },
    [getSpriteIndex, toggleSelection],
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
      if (viewport === "Mobile") return;

      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const spriteIndex = getSpriteIndex(x, y);

      button.style.cursor = !!spriteIndex ? "pointer" : "default";
    },
    [getSpriteIndex, viewport],
  );

  useEffect(() => {
    if (!spriteSheet?.imageURL) return;
    const controller = new AbortController();

    loadImage(spriteSheet.imageURL)
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

    spriteSheetCanvas.width = image.naturalWidth;
    spriteSheetCanvas.height = image.naturalHeight;

    const context = spriteSheetCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, spriteSheetCanvas.width, spriteSheetCanvas.height);
    context.drawImage(
      image,
      0,
      0,
      spriteSheetCanvas.width,
      spriteSheetCanvas.height,
    );

    sprites.forEach((r) => {
      context.strokeStyle = color;
      context.strokeRect(r.left, r.top, r.width, r.height);
    });
  }, [color, image, spriteSheet?.sprites]);

  useEffect(() => {
    if (!image) return;

    const sprites = spriteSheet?.sprites;
    if (!sprites) return;

    const selectionCanvas = selectionCanvasRef.current;
    if (!selectionCanvas) return;

    selectionCanvas.width = image.width;
    selectionCanvas.height = image.height;

    const context = selectionCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, selectionCanvas.width, selectionCanvas.height);

    indices.forEach((index) => {
      const sprite = sprites.at(index);
      if (!sprite) return;

      context.globalAlpha = 0.4;
      context.fillStyle = color;
      context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height);
      context.globalAlpha = 1;
    });
  }, [color, image, indices, spriteSheet?.sprites]);

  return {
    ...props,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    selectionCanvasRef,
    spriteSheetCanvasRef,
  };
}
