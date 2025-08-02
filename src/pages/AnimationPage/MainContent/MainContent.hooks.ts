import {
  useDevicePixelRatio,
  useDimensions,
} from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useRef } from "react";

import { Layout } from "#src/fragments";
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
  const scale = useDevicePixelRatio() * scaleFromStore;

  const sprites = useMemo(
    () =>
      animationFromProps.sprites
        .map((spriteFromAnimation) => {
          const spriteFromSheet = spriteSheet?.[spriteFromAnimation.id];
          if (!spriteFromSheet) return undefined;
          return {
            boundingBoxes: spriteFromAnimation.boundingBoxes,
            center: spriteFromAnimation.center,
            height: spriteFromSheet.height,
            width: spriteFromSheet.width,
            x: spriteFromSheet.x,
            y: spriteFromSheet.y,
          };
        })
        .filter((s) => !!s),
    [animationFromProps.sprites, spriteSheet],
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
    if (!spriteSheetImage) return;

    const spriteCanvas = spriteCanvasRef.current;
    if (!spriteCanvas) return;

    const context = spriteCanvas.getContext("2d");
    if (!context) return;

    spriteCanvas.width = dimensions.width - Layout.SIDEBAR_WIDTH;
    spriteCanvas.height = dimensions.height;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    context.fillStyle = spriteSheetImage.backgroundColor;
    context.fillRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    context.scale(scale, scale);

    context.drawImage(
      image,
      currentSprite.x,
      currentSprite.y,
      currentSprite.width,
      currentSprite.height,
      (dimensions.width - Layout.SIDEBAR_WIDTH) / (2 * scale) -
        currentSprite.width / 2 -
        currentSprite.center.offsetX,
      dimensions.height / (2 * scale) -
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
        (dimensions.width - Layout.SIDEBAR_WIDTH) / (2 * scale) -
          prevSprite.width / 2 -
          prevSprite.center.offsetX,
        dimensions.height / (2 * scale) -
          prevSprite.height / 2 +
          prevSprite.center.offsetY,
        prevSprite.width,
        prevSprite.height,
      );
      context.globalAlpha = 1;
    }

    for (const boundingBox of currentSprite.boundingBoxes) {
      if (boundingBox.visible) {
        context.fillStyle = boundingBox.color;
        context.globalAlpha = 0.25;
        context.fillRect(
          (dimensions.width - Layout.SIDEBAR_WIDTH) / (2 * scale) -
            boundingBox.width / 2 -
            (currentSprite.center.offsetX - boundingBox.offsetX),
          dimensions.height / (2 * scale) -
            boundingBox.height / 2 +
            (currentSprite.center.offsetY - boundingBox.offsetY),
          boundingBox.width,
          boundingBox.height,
        );
        context.globalAlpha = 1;

        context.strokeStyle = boundingBox.color;
        context.strokeRect(
          (dimensions.width - Layout.SIDEBAR_WIDTH) / (2 * scale) -
            boundingBox.width / 2 -
            (currentSprite.center.offsetX - boundingBox.offsetX),
          dimensions.height / (2 * scale) -
            boundingBox.height / 2 +
            (currentSprite.center.offsetY - boundingBox.offsetY),
          boundingBox.width,
          boundingBox.height,
        );
      }
    }

    if (currentSprite.center.visible) {
      context.beginPath();
      context.strokeStyle = animationFromProps.color;
      const centerX = (dimensions.width - Layout.SIDEBAR_WIDTH) / (2 * scale);
      const centerY = dimensions.height / (2 * scale);
      context.moveTo(centerX, centerY - 6);
      context.lineTo(centerX, centerY + 6);
      context.moveTo(centerX - 6, centerY);
      context.lineTo(centerX + 6, centerY);
      context.stroke();
    }
  }, [
    animationFromProps.color,
    animationFromProps.onion,
    currentSprite,
    dimensions.height,
    dimensions.width,
    image,
    prevSprite,
    scale,
    spriteSheetImage,
  ]);

  return { ...rest, ref, spriteCanvasRef };
}
