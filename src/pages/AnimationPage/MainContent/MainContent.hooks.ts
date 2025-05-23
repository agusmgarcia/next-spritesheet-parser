import { useDevicePixelRatio, useDimensions } from "@agusmgarcia/react-core";
import { useEffect, useMemo, useRef } from "react";

import { useScale, useSpriteSheet } from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent({
  animation: animationFromProps,
  index: indexFromProps,
  ...rest
}: MainContentProps) {
  const { spriteSheet } = useSpriteSheet();
  const { scale: scaleFromStore } = useScale();

  const ref = useRef<HTMLDivElement>(null);
  const spriteCanvasRef = useRef<HTMLCanvasElement>(null);

  const { image } = useLoadImage(spriteSheet?.image.url || "");
  const dimensions = useDimensions(ref);
  const devicePixelRatio = useDevicePixelRatio();

  const sprites = useMemo(
    () =>
      animationFromProps.sprites
        .map((s) => {
          const sprite = spriteSheet?.sprites[s.id];
          if (!sprite) return undefined;
          return { ...sprite, ...s };
        })
        .filter((s) => !!s),
    [animationFromProps.sprites, spriteSheet?.sprites],
  );

  const currentSprite = useMemo<(typeof sprites)[number] | undefined>(
    () => sprites.at(indexFromProps),
    [indexFromProps, sprites],
  );

  const prevSprite = useMemo<(typeof sprites)[number] | undefined>(
    () => (sprites.length > 1 ? sprites.at(indexFromProps - 1) : undefined),
    [indexFromProps, sprites],
  );

  useEffect(() => {
    if (!image) return;
    if (!currentSprite) return;
    if (!spriteSheet) return;

    const spriteCanvas = spriteCanvasRef.current;
    if (!spriteCanvas) return;

    const context = spriteCanvas.getContext("2d");
    if (!context) return;

    const scale = scaleFromStore * devicePixelRatio;

    spriteCanvas.width = dimensions.width - 360;
    spriteCanvas.height = dimensions.height;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    context.fillStyle = spriteSheet.image.backgroundColor;
    context.fillRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    context.scale(scale, scale);

    context.drawImage(
      image,
      currentSprite.left,
      currentSprite.top,
      currentSprite.width,
      currentSprite.height,
      (dimensions.width - 360) / (2 * scale) -
        currentSprite.width / 2 -
        currentSprite.offsetX,
      dimensions.height / (2 * scale) -
        currentSprite.height / 2 -
        currentSprite.offsetY,
      currentSprite.width,
      currentSprite.height,
    );

    if (!!prevSprite && animationFromProps.onion) {
      context.globalAlpha = 0.4;
      context.drawImage(
        image,
        prevSprite.left,
        prevSprite.top,
        prevSprite.width,
        prevSprite.height,
        (dimensions.width - 360) / (2 * scale) -
          prevSprite.width / 2 -
          prevSprite.offsetX,
        dimensions.height / (2 * scale) -
          prevSprite.height / 2 -
          prevSprite.offsetY,
        prevSprite.width,
        prevSprite.height,
      );
      context.globalAlpha = 1;
    }

    context.beginPath();
    context.strokeStyle = animationFromProps.color;
    const centerX = (dimensions.width - 360) / (2 * scale);
    const centerY = dimensions.height / (2 * scale);
    context.moveTo(centerX, centerY - 6);
    context.lineTo(centerX, centerY + 6);
    context.moveTo(centerX - 6, centerY);
    context.lineTo(centerX + 6, centerY);
    context.stroke();
  }, [
    animationFromProps.color,
    animationFromProps.onion,
    currentSprite,
    devicePixelRatio,
    dimensions.height,
    dimensions.width,
    image,
    prevSprite,
    scaleFromStore,
    spriteSheet,
  ]);

  return { ...rest, ref, spriteCanvasRef };
}
