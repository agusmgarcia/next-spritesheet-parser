import {
  type Func,
  type Tuple,
  useDevicePixelRatio,
  useDimensions,
} from "@agusmgarcia/react-core";
import invert from "invert-color";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useScale, useSpriteSelection, useSpriteSheet } from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent(props: MainContentProps) {
  const { scale: scaleFromStore } = useScale();
  const { spriteSheet } = useSpriteSheet();
  const { selectSprite, spriteSelection, toggleSpriteSelection } =
    useSpriteSelection();

  const ref = useRef<HTMLDivElement>(null);
  const spriteSheetCanvasRef = useRef<HTMLCanvasElement>(null);
  const selectionCanvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedArea, setSelectedArea] = useState<Tuple<number, 4>>();
  const [preSelectedSprites, setPreSelectedSprites] = useState<string[]>();
  const [spriteHovered, setSpriteHovered] = useState<string>();

  const { image } = useLoadImage(spriteSheet?.image.url || "");
  const rootDimensions = useDimensions(ref);
  const scale = useDevicePixelRatio() * scaleFromStore;

  const color = useMemo<string>(
    () =>
      spriteSheet?.image.backgroundColor
        ? invert(spriteSheet.image.backgroundColor)
        : "",
    [spriteSheet?.image.backgroundColor],
  );

  const sprites = useMemo(
    () =>
      !!spriteSheet?.sprites
        ? Object.entries(spriteSheet.sprites).map(([id, sprite]) => ({
            id,
            ...sprite,
          }))
        : undefined,
    [spriteSheet?.sprites],
  );

  const findSprite = useCallback<
    Func<
      NonNullable<typeof sprites>[number] | undefined,
      [x: number, y: number]
    >
  >(
    (x, y) =>
      sprites?.find(
        (sprite) =>
          sprite.left < x &&
          sprite.right > x &&
          sprite.top < y &&
          sprite.bottom > y,
      ),
    [sprites],
  );

  const findSprites = useCallback<
    Func<
      NonNullable<typeof sprites>,
      [x: number, y: number, width: number, height: number]
    >
  >(
    (x, y, width, height) => {
      const left = x;
      const right = x + width;
      const top = y;
      const bottom = y + height;

      return (
        sprites
          ?.map((sprite) =>
            sprite.left < right &&
            sprite.right > left &&
            sprite.top < bottom &&
            sprite.bottom > top
              ? sprite
              : undefined,
          )
          .filter((sprite) => !!sprite) || []
      );
    },
    [sprites],
  );

  const onClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      setSelectedArea(undefined);
      setSpriteHovered(undefined);

      if (!!preSelectedSprites) {
        preSelectedSprites.forEach((spriteId) => selectSprite(spriteId));
        setPreSelectedSprites(undefined);
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / scale;
      const y = (event.clientY - rect.top) / scale;

      const sprite = findSprite(x, y);
      if (!sprite) return;

      toggleSpriteSelection(sprite.id);
    },
    [
      scale,
      findSprite,
      preSelectedSprites,
      selectSprite,
      toggleSpriteSelection,
    ],
  );

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      if (!spriteSheet?.image.url) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / scale;
      const y = (event.clientY - rect.top) / scale;
      setSelectedArea([x, y, x, y]);
    },
    [scale, spriteSheet?.image.url],
  );

  const onMouseLeave = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    () => setSpriteHovered(undefined),
    [],
  );

  const onMouseMove = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const canvas = event.currentTarget;
      const rect = canvas.getBoundingClientRect();

      const x = (event.clientX - rect.left) / scale;
      const y = (event.clientY - rect.top) / scale;

      if (!selectedArea) {
        const sprite = findSprite(x, y);
        canvas.style.cursor = !!sprite ? "pointer" : "default";
        setSpriteHovered(sprite?.id);
        return;
      }

      setPreSelectedSprites(
        findSprites(
          Math.min(x, selectedArea[0]),
          Math.min(y, selectedArea[1]),
          Math.abs(x - selectedArea[0]),
          Math.abs(y - selectedArea[1]),
        ).map((s) => s.id),
      );

      if (!!spriteSheet?.image.url)
        setSelectedArea((prev) =>
          !!prev ? [prev[0], prev[1], x, y] : [x, y, x, y],
        );
    },
    [scale, selectedArea, findSprites, spriteSheet?.image.url, findSprite],
  );

  useEffect(() => {
    const spriteSheetCanvas = spriteSheetCanvasRef.current;
    if (!spriteSheetCanvas) return;

    spriteSheetCanvas.width =
      Math.max(rootDimensions.width, (image?.width || 0) * scale) +
      (!!image ? 360 : 0);
    spriteSheetCanvas.height = Math.max(
      rootDimensions.height,
      (image?.height || 0) * scale,
    );

    const context = spriteSheetCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, spriteSheetCanvas.width, spriteSheetCanvas.height);
    context.fillStyle = spriteSheet?.image.backgroundColor || "#ffffff";
    context.fillRect(0, 0, spriteSheetCanvas.width, spriteSheetCanvas.height);
    context.scale(scale, scale);
    if (!!image)
      context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

    if (!!sprites?.length)
      sprites.forEach((r) => {
        context.strokeStyle = color;
        context.strokeRect(r.left, r.top, r.width, r.height);
      });
  }, [
    scale,
    image,
    rootDimensions.height,
    rootDimensions.width,
    spriteSheet,
    sprites,
    color,
  ]);

  useEffect(() => {
    const selectionCanvas = selectionCanvasRef.current;
    if (!selectionCanvas) return;

    selectionCanvas.width =
      Math.max(rootDimensions.width, (image?.width || 0) * scale) +
      (!!image ? 360 : 0);
    selectionCanvas.height = Math.max(
      rootDimensions.height,
      (image?.height || 0) * scale,
    );

    const context = selectionCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, selectionCanvas.width, selectionCanvas.height);
    context.scale(scale, scale);

    spriteSelection.forEach((spriteId) => {
      const sprite = spriteSheet?.sprites[spriteId];
      if (!sprite) return;
      if (spriteHovered === spriteId) return;

      context.globalAlpha = 0.4;
      context.fillStyle = color;
      context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height);
      context.globalAlpha = 1;
    });

    if (!!spriteHovered) {
      const sprite = spriteSheet?.sprites[spriteHovered];
      if (!sprite) return;

      context.globalAlpha = spriteSelection.includes(spriteHovered) ? 0.3 : 0.2;
      context.fillStyle = color;
      context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height);
      context.globalAlpha = 1;
    }

    preSelectedSprites?.forEach((spriteId) => {
      const sprite = spriteSheet?.sprites[spriteId];
      if (!sprite) return;

      if (spriteSelection.includes(spriteId)) return;

      context.globalAlpha = 0.4;
      context.fillStyle = color;
      context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height);
      context.globalAlpha = 1;
    });

    if (!!selectedArea) {
      context.globalAlpha = 0.2;
      context.fillStyle = color;
      context.fillRect(
        Math.min(selectedArea[2], selectedArea[0]),
        Math.min(selectedArea[3], selectedArea[1]),
        Math.abs(selectedArea[2] - selectedArea[0]),
        Math.abs(selectedArea[3] - selectedArea[1]),
      );
    }
  }, [
    scale,
    image,
    spriteSelection,
    selectedArea,
    preSelectedSprites,
    rootDimensions.height,
    rootDimensions.width,
    spriteSheet,
    spriteHovered,
    color,
  ]);

  return {
    ...props,
    onClick,
    onMouseDown,
    onMouseLeave,
    onMouseMove,
    ref,
    selectionCanvasRef,
    spriteSheetCanvasRef,
  };
}
