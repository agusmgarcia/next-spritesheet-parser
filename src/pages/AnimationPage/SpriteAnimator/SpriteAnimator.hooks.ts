import { type Tuple } from "@agusmgarcia/react-core";
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

  const rootRef = useRef<HTMLDivElement>(null);
  const spriteCanvasRef = useRef<HTMLCanvasElement>(null);

  const [dimension, setDimension] = useState<Tuple<number, 2>>();
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
    const root = rootRef.current;
    if (!root) return;

    const observer = new ResizeObserver((entries) => {
      setDimension([
        entries[0].contentRect.width,
        entries[0].contentRect.height,
      ]);
    });

    observer.observe(root);
    return () => observer.unobserve(root);
  }, []);

  useEffect(() => {
    if (!image) return;
    if (!currentSprite) return;
    if (!dimension) return;

    const spriteCanvas = spriteCanvasRef.current;
    if (!spriteCanvas) return;

    const context = spriteCanvas.getContext("2d");
    if (!context) return;

    spriteCanvas.width = dimension[0];
    spriteCanvas.height = dimension[1];

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
      dimension[0] / (2 * animation.scale) -
        currentSprite.width / 2 -
        currentSprite.offsetX,
      dimension[1] / (2 * animation.scale) -
        currentSprite.height / 2 -
        currentSprite.offsetY,
      currentSprite.width,
      currentSprite.height,
    );

    context.beginPath();
    context.strokeStyle = animation.color;
    const centerX = dimension[0] / (2 * animation.scale);
    const centerY = dimension[1] / (2 * animation.scale);
    context.moveTo(centerX, centerY - 6);
    context.lineTo(centerX, centerY + 6);
    context.moveTo(centerX - 6, centerY);
    context.lineTo(centerX + 6, centerY);
    context.stroke();
  }, [animation.color, animation.scale, currentSprite, dimension, image]);

  return { ...props, rootRef, spriteCanvasRef };
}
