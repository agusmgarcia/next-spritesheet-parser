import { useEffect, useMemo, useRef, useState } from "react";

import { useSpriteSheet } from "#src/store";
import { loadImage } from "#src/utils";

import type SpriteAnimatorProps from "./SpriteAnimator.types";

export default function useSpriteAnimator({
  animation,
  index,
  ...props
}: SpriteAnimatorProps) {
  const { spriteSheet } = useSpriteSheet();

  const spriteCanvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();

  const sprites = useMemo(
    () =>
      animation.sprites
        .map((s) => {
          const sprite = spriteSheet?.sprites.at(s.index);
          if (!sprite) return undefined;
          return { ...sprite, ...s };
        })
        .filter((s) => s !== undefined),
    [animation.sprites, spriteSheet?.sprites],
  );

  const currentSprite = useMemo<(typeof sprites)[number] | undefined>(
    () => sprites.at(index),
    [index, sprites],
  );

  const spriteCanvasStyle = useMemo<React.CSSProperties>(
    () => ({
      left: "50%",
      position: "absolute",
      top: "50%",
      transform: "translate(-50%, -50%)",
    }),
    [],
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
    if (!currentSprite) return;
    if (!spriteSheet?.color) return;

    const spriteCanvas = spriteCanvasRef.current;
    if (!spriteCanvas) return;

    spriteCanvas.width =
      (currentSprite.width + currentSprite.offsetX) * animation.scale;
    spriteCanvas.height =
      (currentSprite.height + currentSprite.offsetY) * animation.scale;

    const context = spriteCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    context.scale(animation.scale, animation.scale);

    context.drawImage(
      image,
      currentSprite.left,
      currentSprite.top,
      currentSprite.width,
      currentSprite.height,
      currentSprite.offsetX,
      currentSprite.offsetY,
      currentSprite.width,
      currentSprite.height,
    );

    context.beginPath();
    context.strokeStyle = spriteSheet.color;
    const centerX = currentSprite.width / 2 + currentSprite.offsetX;
    const centerY = currentSprite.height / 2 + currentSprite.offsetY;
    context.moveTo(centerX, centerY - 6);
    context.lineTo(centerX, centerY + 6);
    context.moveTo(centerX - 6, centerY);
    context.lineTo(centerX + 6, centerY);
    context.stroke();
  }, [animation.scale, currentSprite, image, spriteSheet?.color]);

  return { ...props, spriteCanvasRef, spriteCanvasStyle };
}
