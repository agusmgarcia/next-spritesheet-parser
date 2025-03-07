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
  const { spriteSheet } = useSpriteSheet();

  const spriteCanvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();

  const sprites = useMemo(
    () =>
      animation.sprites.map((s) => ({
        ...spriteSheet?.sprites[s.index],
        ...s,
      })),
    [animation.sprites, spriteSheet?.sprites],
  );

  const currentSprite = useMemo(() => sprites.at(index), [index, sprites]);

  const spriteCanvasStyle = useMemo<React.CSSProperties>(
    () => ({
      left: `calc(50% + ${currentSprite?.offsetX || 0}px)`,
      position: "absolute",
      top: `calc(50% + ${currentSprite?.offsetY || 0}px)`,
      transform: "translate(-50%, -50%)",
    }),
    [currentSprite?.offsetX, currentSprite?.offsetY],
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
        // TODO: handle errors.
      });

    return () => controller.abort();
  }, [spriteSheet?.imageURL]);

  useEffect(() => {
    if (!image) return;
    if (
      !currentSprite?.height ||
      !currentSprite?.left ||
      !currentSprite?.top ||
      !currentSprite?.width
    )
      return;

    const spriteCanvas = spriteCanvasRef.current;
    if (!spriteCanvas) return;

    spriteCanvas.width = currentSprite.width * scale;
    spriteCanvas.height = currentSprite.height * scale;

    const context = spriteCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
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
    currentSprite?.height,
    currentSprite?.left,
    currentSprite?.top,
    currentSprite?.width,
    image,
    scale,
  ]);

  return { ...props, spriteCanvasRef, spriteCanvasStyle };
}
