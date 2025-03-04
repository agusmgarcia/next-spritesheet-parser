import { useEffect, useMemo, useRef, useState } from "react";

import { useSpriteSheet } from "#src/store";
import { loadImage } from "#src/utils";

import type SpriteAnimatorProps from "./SpriteAnimator.types";

export default function useSpriteAnimator({
  animation,
  index,
  scale,
  ...props
}: SpriteAnimatorProps) {
  const { imageURL, sprites: spritesFromStore } = useSpriteSheet();

  const spriteCanvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();

  const sprites = useMemo(
    () => animation.indices.map((i) => spritesFromStore[i]),
    [animation.indices, spritesFromStore],
  );

  const currentSprite = useMemo(() => sprites[index], [index, sprites]);

  const spriteCanvasStyle = useMemo<React.CSSProperties>(
    () => ({
      left: `calc(50% + ${currentSprite.width / 2 - currentSprite.focusX}px)`,
      position: "absolute",
      top: `calc(50% + ${currentSprite.height / 2 - currentSprite.focusY}px)`,
      transform: "translate(-50%, -50%)",
    }),
    [
      currentSprite.focusX,
      currentSprite.focusY,
      currentSprite.height,
      currentSprite.width,
    ],
  );

  useEffect(() => {
    const controller = new AbortController();

    loadImage(imageURL)
      .then((image) => {
        if (controller.signal.aborted) return;
        setImage(image);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        // TODO: handle errors.
      });

    return () => controller.abort();
  }, [imageURL, sprites]);

  useEffect(() => {
    if (!image) return;

    const spriteCanvas = spriteCanvasRef.current;
    if (!spriteCanvas) return;

    spriteCanvas.width = currentSprite.width * scale;
    spriteCanvas.height = currentSprite.height * scale;

    const context = spriteCanvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    context.scale(scale, scale);
    context.drawImage(
      image,
      currentSprite.left,
      currentSprite.top,
      currentSprite.width,
      currentSprite.height,
      0,
      0,
      currentSprite.width,
      currentSprite.height,
    );
  }, [
    currentSprite.height,
    currentSprite.left,
    currentSprite.top,
    currentSprite.width,
    image,
    scale,
  ]);

  return { ...props, spriteCanvasRef, spriteCanvasStyle };
}
