import {
  useDevicePixelRatio,
  useDimensions,
} from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useRef } from "react";

import { useScale, useSpriteSheet, useSpriteSheetImage } from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent({
  animation: animationFromProps,
  index: indexFromProps,
  ...rest
}: MainContentProps) {
  const { spriteSheetImage } = useSpriteSheetImage();
  const { spriteSheet } = useSpriteSheet();
  const { scale: scaleFromStore } = useScale();

  const ref = useRef<HTMLDivElement>(null);
  const spriteCanvasRef = useRef<HTMLCanvasElement>(null);

  const { image } = useLoadImage(spriteSheetImage?.url || "");
  const dimensions = useDimensions(ref);
  const devicePixelRatio = useDevicePixelRatio();

  const sprites = useMemo(
    () =>
      animationFromProps.sprites
        .map((s) => {
          const sprite = spriteSheet?.[s.id];
          if (!sprite) return undefined;
          return { ...sprite, ...s };
        })
        .filter((s) => !!s),
    [animationFromProps.sprites, spriteSheet],
  );

  const currentSprite = useMemo<(typeof sprites)[number] | undefined>(
    () => sprites.at(indexFromProps),
    [indexFromProps, sprites],
  );

  const prevSprite = useMemo<(typeof sprites)[number] | undefined>(
    () =>
      sprites.length > 1 && indexFromProps > 0
        ? sprites[indexFromProps - 1]
        : undefined,
    [indexFromProps, sprites],
  );

  const maxSpriteSize = useMemo(() => {
    let maxWidth = -1;
    let maxHeight = -1;

    for (const sprite of sprites) {
      const width = sprite.width + Math.abs(sprite.center.offsetX) * 2;
      if (width > maxWidth) maxWidth = width;

      const height = sprite.height + Math.abs(sprite.center.offsetY) * 2;
      if (height > maxHeight) maxHeight = height;
    }

    return { height: maxHeight, width: maxWidth };
  }, [sprites]);

  useEffect(() => {
    if (!image) return;
    if (!currentSprite) return;
    if (!spriteSheetImage) return;

    const spriteCanvas = spriteCanvasRef.current;
    if (!spriteCanvas) return;

    const context = spriteCanvas.getContext("2d");
    if (!context) return;

    const scale = scaleFromStore * devicePixelRatio;

    spriteCanvas.width = Math.max(
      dimensions.width,
      maxSpriteSize.width * scale,
    );

    spriteCanvas.height = Math.max(
      dimensions.height,
      maxSpriteSize.height * scale,
    );

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);

    context.fillStyle = spriteSheetImage.backgroundColor;
    context.fillRect(0, 0, spriteCanvas.width, spriteCanvas.height);

    context.scale(scale, scale);

    if (!!animationFromProps.grid) {
      context.fillStyle = "#000000";
      context.globalAlpha = 0.75;

      for (let y = 0; y < spriteCanvas.height; y += 16)
        context.fillRect(0, y, spriteCanvas.width, 1);

      for (let x = 0; x < spriteCanvas.width; x += 16)
        context.fillRect(x, 0, 1, spriteCanvas.height);

      context.globalAlpha = 1;
    }

    context.drawImage(
      image,
      currentSprite.x,
      currentSprite.y,
      currentSprite.width,
      currentSprite.height,
      spriteCanvas.width / (2 * scale) -
        currentSprite.width / 2 -
        currentSprite.center.offsetX,
      spriteCanvas.height / (2 * scale) -
        currentSprite.height / 2 +
        currentSprite.center.offsetY,
      currentSprite.width,
      currentSprite.height,
    );

    if (!!prevSprite && animationFromProps.onion) {
      context.globalAlpha = 0.4;
      context.drawImage(
        image,
        prevSprite.x,
        prevSprite.y,
        prevSprite.width,
        prevSprite.height,
        spriteCanvas.width / (2 * scale) -
          prevSprite.width / 2 -
          prevSprite.center.offsetX,
        spriteCanvas.height / (2 * scale) -
          prevSprite.height / 2 +
          prevSprite.center.offsetY,
        prevSprite.width,
        prevSprite.height,
      );
      context.globalAlpha = 1;
    }

    if (currentSprite.center.visible) {
      context.beginPath();
      context.strokeStyle = animationFromProps.color;
      const centerX = spriteCanvas.width / (2 * scale);
      const centerY = spriteCanvas.height / (2 * scale);
      context.moveTo(centerX, centerY - 6);
      context.lineTo(centerX, centerY + 6);
      context.moveTo(centerX - 6, centerY);
      context.lineTo(centerX + 6, centerY);
      context.stroke();
    }
  }, [
    animationFromProps.color,
    animationFromProps.grid,
    animationFromProps.onion,
    currentSprite,
    devicePixelRatio,
    dimensions.height,
    dimensions.width,
    image,
    maxSpriteSize.height,
    maxSpriteSize.width,
    prevSprite,
    scaleFromStore,
    spriteSheetImage,
  ]);

  return { ...rest, ref, spriteCanvasRef };
}
