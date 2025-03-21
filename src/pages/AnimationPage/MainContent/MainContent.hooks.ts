import { useDevicePixelRatio, useDimensions } from "@agusmgarcia/react-core";
import { useEffect, useMemo, useRef } from "react";

import { useAnimations, useSpriteSheet } from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent({
  animation: animationFromProps,
  backwardOnClick: backwardOnClickFromProps,
  forwardOnClick: forwardOnClickFromProps,
  index: indexFromProps,
  minusFPSDisabled: minusFPSDisabledFromProps,
  minusFPSOnClick: minusFPSOnClickFromProps,
  onionActive: onionActiveFromProps,
  onionDisabled: onionDisabledFromProps,
  onionOnClick: onionOnClickFromProps,
  playing: playingFromProps,
  playingDisabled: playingDisabledFromProps,
  playOnClick: playOnClickFromProps,
  plusFPSDisabled: plusFPSDisabledFromProps,
  plusFPSOnClick: plusFPSOnClickFromProps,
  resetZoomDisabled: resetZoomDisabledFromProps,
  resetZoomOnClick: resetZoomOnClickFromProps,
  zoomInDisabled: zoomInDisabledFromProps,
  zoomInOnClick: zoomInOnClickFromProps,
  zoomOutDisabled: zoomOutDisabledFromProps,
  zoomOutOnClick: zoomOutOnClickFromProps,
  ...rest
}: MainContentProps) {
  const { spriteSheet } = useSpriteSheet();
  const { setAnimationOffset } = useAnimations();

  const rootRef = useRef<HTMLDivElement>(null);
  const spriteCanvasRef = useRef<HTMLCanvasElement>(null);

  const { image } = useLoadImage(spriteSheet?.sheet.imageURL || "");
  const dimensions = useDimensions(rootRef);
  const devicePixelRatio = useDevicePixelRatio();

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
      context.globalAlpha = 1;
    }

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
    const root = rootRef.current;
    if (!root) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case " ":
          if (!!playingDisabledFromProps) return;
          return playOnClickFromProps();

        case "ArrowUp":
          if (!!event.altKey) return;
          if (!!zoomInDisabledFromProps) return;
          return zoomInOnClickFromProps();

        case "ArrowDown":
          if (!!event.altKey) return;
          if (!!zoomOutDisabledFromProps) return;
          return zoomOutOnClickFromProps();

        case "z":
          if (!!resetZoomDisabledFromProps) return;
          return resetZoomOnClickFromProps();

        case "+":
          if (!!plusFPSDisabledFromProps) return;
          return plusFPSOnClickFromProps();

        case "-":
          if (!!minusFPSDisabledFromProps) return;
          return minusFPSOnClickFromProps();
      }
    };

    root.addEventListener("keydown", handleKeyDown);
    return () => root.removeEventListener("keydown", handleKeyDown);
  }, [
    minusFPSDisabledFromProps,
    minusFPSOnClickFromProps,
    playOnClickFromProps,
    playingDisabledFromProps,
    playingFromProps,
    plusFPSDisabledFromProps,
    plusFPSOnClickFromProps,
    resetZoomDisabledFromProps,
    resetZoomOnClickFromProps,
    zoomInDisabledFromProps,
    zoomInOnClickFromProps,
    zoomOutDisabledFromProps,
    zoomOutOnClickFromProps,
  ]);

  useEffect(() => {
    if (playingFromProps) return;

    const root = rootRef.current;
    if (!root) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (!event.altKey) return;
          return setAnimationOffset(
            animationFromProps.id,
            indexFromProps,
            (offsetX) => offsetX,
            (offsetY) => offsetY - devicePixelRatio,
          );

        case "ArrowRight":
          if (!event.altKey) return forwardOnClickFromProps();
          return setAnimationOffset(
            animationFromProps.id,
            indexFromProps,
            (offsetX) => offsetX + devicePixelRatio,
            (offsetY) => offsetY,
          );

        case "ArrowDown":
          if (!event.altKey) return;
          return setAnimationOffset(
            animationFromProps.id,
            indexFromProps,
            (offsetX) => offsetX,
            (offsetY) => offsetY + devicePixelRatio,
          );

        case "ArrowLeft":
          if (!event.altKey) return backwardOnClickFromProps();
          return setAnimationOffset(
            animationFromProps.id,
            indexFromProps,
            (offsetX) => offsetX - devicePixelRatio,
            (offsetY) => offsetY,
          );

        case "o":
          if (!!onionDisabledFromProps) return;
          return onionOnClickFromProps();
      }
    };

    root.addEventListener("keydown", handleKeyDown);
    return () => root.removeEventListener("keydown", handleKeyDown);
  }, [
    animationFromProps.id,
    backwardOnClickFromProps,
    devicePixelRatio,
    forwardOnClickFromProps,
    indexFromProps,
    onionDisabledFromProps,
    onionOnClickFromProps,
    playingFromProps,
    setAnimationOffset,
  ]);

  return { ...rest, rootRef, spriteCanvasRef };
}
