import { useEffect, useMemo, useRef, useState } from "react";

import { useAnimations, useSpriteSheet } from "#src/store";
import { loadImage, useDimensions } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent({
  animation: animationFromProps,
  index: indexFromProps,
  onionActive: onionActiveFromProps,
  playing: playingFromProps,
  ...rest
}: MainContentProps) {
  const { spriteSheet } = useSpriteSheet();
  const { setAnimationOffset } = useAnimations();

  const rootRef = useRef<HTMLDivElement>(null);
  const spriteCanvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();

  const dimensions = useDimensions(rootRef);

  const sprites = useMemo(
    () =>
      animationFromProps.sprites
        .map((s) => {
          const sprite = spriteSheet?.sprites[s.id];
          if (!sprite) return undefined;
          return { ...sprite, ...s };
        })
        .filter((s) => s !== undefined),
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
    if (!spriteSheet?.sheet.imageURL) return;
    const controller = new AbortController();

    loadImage(spriteSheet.sheet.imageURL, controller.signal)
      .then((image) => {
        if (controller.signal.aborted) return;
        setImage(image);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        // TODO: handle errors.
      });

    return () => controller.abort();
  }, [spriteSheet?.sheet.imageURL]);

  useEffect(() => {
    if (!image) return;
    if (!currentSprite) return;
    if (!spriteSheet) return;

    const spriteCanvas = spriteCanvasRef.current;
    if (!spriteCanvas) return;

    const context = spriteCanvas.getContext("2d");
    if (!context) return;

    spriteCanvas.width = dimensions.width;
    spriteCanvas.height = dimensions.height;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    context.fillStyle = spriteSheet.sheet.backgroundColor;
    context.fillRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    context.scale(animationFromProps.scale, animationFromProps.scale);

    if (!!prevSprite && onionActiveFromProps) {
      context.globalAlpha = 0.4;
      context.drawImage(
        image,
        prevSprite.left,
        prevSprite.top,
        prevSprite.width,
        prevSprite.height,
        dimensions.width / (2 * animationFromProps.scale) -
          prevSprite.width / 2 -
          prevSprite.offsetX,
        dimensions.height / (2 * animationFromProps.scale) -
          prevSprite.height / 2 -
          prevSprite.offsetY,
        prevSprite.width,
        prevSprite.height,
      );
    }

    context.globalAlpha = 1;
    context.drawImage(
      image,
      currentSprite.left,
      currentSprite.top,
      currentSprite.width,
      currentSprite.height,
      dimensions.width / (2 * animationFromProps.scale) -
        currentSprite.width / 2 -
        currentSprite.offsetX,
      dimensions.height / (2 * animationFromProps.scale) -
        currentSprite.height / 2 -
        currentSprite.offsetY,
      currentSprite.width,
      currentSprite.height,
    );

    context.beginPath();
    context.strokeStyle = animationFromProps.color;
    const centerX = dimensions.width / (2 * animationFromProps.scale);
    const centerY = dimensions.height / (2 * animationFromProps.scale);
    context.moveTo(centerX, centerY - 6);
    context.lineTo(centerX, centerY + 6);
    context.moveTo(centerX - 6, centerY);
    context.lineTo(centerX + 6, centerY);
    context.stroke();
  }, [
    animationFromProps.color,
    animationFromProps.scale,
    currentSprite,
    dimensions.height,
    dimensions.width,
    image,
    onionActiveFromProps,
    prevSprite,
    spriteSheet,
  ]);

  useEffect(() => {
    if (playingFromProps) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey) return;

      switch (event.key) {
        case "ArrowUp":
          return setAnimationOffset(
            animationFromProps.id,
            indexFromProps,
            (offsetX) => offsetX,
            (offsetY) => offsetY - window.devicePixelRatio,
          );

        case "ArrowRight":
          return setAnimationOffset(
            animationFromProps.id,
            indexFromProps,
            (offsetX) => offsetX + window.devicePixelRatio,
            (offsetY) => offsetY,
          );

        case "ArrowDown":
          return setAnimationOffset(
            animationFromProps.id,
            indexFromProps,
            (offsetX) => offsetX,
            (offsetY) => offsetY + window.devicePixelRatio,
          );

        case "ArrowLeft":
          return setAnimationOffset(
            animationFromProps.id,
            indexFromProps,
            (offsetX) => offsetX - window.devicePixelRatio,
            (offsetY) => offsetY,
          );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    animationFromProps.id,
    indexFromProps,
    playingFromProps,
    setAnimationOffset,
  ]);

  return { ...rest, rootRef, spriteCanvasRef };
}
