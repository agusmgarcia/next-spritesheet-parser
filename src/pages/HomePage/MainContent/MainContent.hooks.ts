import {
  type Func,
  type Tuple,
  useDevicePixelRatio,
  useDimensions,
} from "@agusmgarcia/react-essentials-utils";
import invert from "invert-color";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Layout } from "#src/fragments";
import {
  useScale,
  useSpriteSelection,
  useSpriteSheet,
  useSpriteSheetImage,
} from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent(props: MainContentProps) {
  const { scale: scaleFromStore } = useScale();
  const { spriteSheet } = useSpriteSheet();
  const { spriteSheetImage } = useSpriteSheetImage();
  const { selectSprite, spriteSelection, toggleSpriteSelection } =
    useSpriteSelection();

  const ref = useRef<HTMLDivElement>(null);
  const spriteSheetCanvasRef = useRef<HTMLCanvasElement>(null);
  const selectionCanvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedArea, setSelectedArea] = useState<Tuple<number, 4>>();
  const [preSelectedSprites, setPreSelectedSprites] = useState<string[]>();
  const [spriteHovered, setSpriteHovered] = useState<string>();

  const { image } = useLoadImage(spriteSheetImage?.url || "");
  const dimensions = useDimensions(ref);
  const scale = useDevicePixelRatio() * scaleFromStore;

  const color = useMemo<string>(
    () =>
      spriteSheetImage?.backgroundColor
        ? invert(spriteSheetImage.backgroundColor)
        : "",
    [spriteSheetImage?.backgroundColor],
  );

  const sprites = useMemo(
    () =>
      Object.entries(spriteSheet).map(([id, sprite]) => ({
        bottom: sprite.y + sprite.height,
        height: sprite.height,
        id,
        left: sprite.x,
        right: sprite.x + sprite.width,
        top: sprite.y,
        width: sprite.width,
      })),
    [spriteSheet],
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
      if (!spriteSheetImage?.url) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / scale;
      const y = (event.clientY - rect.top) / scale;
      setSelectedArea([x, y, x, y]);
    },
    [scale, spriteSheetImage?.url],
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

      if (!!spriteSheetImage?.url)
        setSelectedArea((prev) =>
          !!prev ? [prev[0], prev[1], x, y] : [x, y, x, y],
        );
    },
    [scale, selectedArea, findSprites, spriteSheetImage?.url, findSprite],
  );

  useEffect(() => {
    const spriteSheetCanvas = spriteSheetCanvasRef.current;
    if (!spriteSheetCanvas) return;

    spriteSheetCanvas.width = Math.max(
      dimensions.width,
      (image?.width || 0) * scale,
    );
    spriteSheetCanvas.width +=
      (!!image ? Layout.SIDEBAR_WIDTH : 0) -
      (spriteSheetCanvas.width - (image?.width || 0) * scale);
    spriteSheetCanvas.height = Math.max(
      dimensions.height,
      (image?.height || 0) * scale,
    );

    const context = spriteSheetCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, spriteSheetCanvas.width, spriteSheetCanvas.height);
    context.fillStyle = spriteSheetImage?.backgroundColor || "#ffffff";
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
    color,
    dimensions.height,
    dimensions.width,
    image,
    scale,
    spriteSheetImage?.backgroundColor,
    sprites,
  ]);

  useEffect(() => {
    const selectionCanvas = selectionCanvasRef.current;
    if (!selectionCanvas) return;

    selectionCanvas.width = Math.max(
      dimensions.width,
      (image?.width || 0) * scale,
    );
    selectionCanvas.width +=
      (!!image ? Layout.SIDEBAR_WIDTH : 0) -
      (selectionCanvas.width - (image?.width || 0) * scale);
    selectionCanvas.height = Math.max(
      dimensions.height,
      (image?.height || 0) * scale,
    );

    const context = selectionCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, selectionCanvas.width, selectionCanvas.height);
    context.scale(scale, scale);

    spriteSelection.forEach((spriteId) => {
      const sprite = spriteSheet[spriteId];
      if (!sprite) return;
      if (spriteHovered === spriteId) return;

      context.globalAlpha = 0.4;
      context.fillStyle = color;
      context.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
      context.globalAlpha = 1;
    });

    if (!!spriteHovered) {
      const sprite = spriteSheet[spriteHovered];
      if (!sprite) return;

      context.globalAlpha = spriteSelection.includes(spriteHovered) ? 0.3 : 0.2;
      context.fillStyle = color;
      context.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
      context.globalAlpha = 1;
    }

    preSelectedSprites?.forEach((spriteId) => {
      const sprite = spriteSheet[spriteId];
      if (!sprite) return;

      if (spriteSelection.includes(spriteId)) return;

      context.globalAlpha = 0.4;
      context.fillStyle = color;
      context.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
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
    dimensions.height,
    dimensions.width,
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
