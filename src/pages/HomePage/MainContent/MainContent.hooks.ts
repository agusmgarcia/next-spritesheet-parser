import {
  type Func,
  type Tuple,
  useDevicePixelRatio,
  useDimensions,
} from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useSpriteSheet } from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent({
  createAnimationDisabled: createAnimationDisabledFromProps,
  createAnimationOnClick: createAnimationOnClickFromProps,
  exportFileDisabled: exportFileDisabledFromProps,
  exportFileOnClick: exportFileOnClickFromProps,
  importFileDisabled: importFileDisabledFromProps,
  importFileOnClick: importFileOnClickFromProps,
  spriteIds: spriteIdsFromProps,
  spriteIdsOnSelect: spriteIdsOnSelectFromProps,
  spriteIdsOnToggle: spriteIdsOnToggleFromProps,
  ...rest
}: MainContentProps) {
  const { spriteSheet } = useSpriteSheet();

  const rootRef = useRef<HTMLDivElement>(null);
  const spriteSheetCanvasRef = useRef<HTMLCanvasElement>(null);
  const selectionCanvasRef = useRef<HTMLCanvasElement>(null);

  const [initialCursor, setInitialCursor] = useState<Tuple<number, 4>>();
  const [preSelectedSprites, setPreSelectedSprites] = useState<string[]>();

  const { image } = useLoadImage(spriteSheet?.sheet.imageURL || "");
  const rootDimensions = useDimensions(rootRef);
  const devicePixelRatio = useDevicePixelRatio();

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
      setInitialCursor(undefined);

      if (!!preSelectedSprites) {
        preSelectedSprites.forEach(spriteIdsOnSelectFromProps);
        setPreSelectedSprites(undefined);
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / devicePixelRatio;
      const y = (event.clientY - rect.top) / devicePixelRatio;

      const sprite = findSprite(x, y);
      if (!sprite) return;

      spriteIdsOnToggleFromProps(sprite.id);
    },
    [
      devicePixelRatio,
      findSprite,
      preSelectedSprites,
      spriteIdsOnSelectFromProps,
      spriteIdsOnToggleFromProps,
    ],
  );

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / devicePixelRatio;
      const y = (event.clientY - rect.top) / devicePixelRatio;

      setInitialCursor([x, y, x, y]);
    },
    [devicePixelRatio],
  );

  const onMouseEnter = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const button = event.currentTarget;
      button.dataset.prevCursor = button.style.cursor;
      button.style.cursor = "default";
    },
    [],
  );

  const onMouseLeave = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const button = event.currentTarget;
      button.style.cursor = button.dataset.prevCursor || "";
      delete button.dataset.prevCursor;
    },
    [],
  );

  const onMouseMove = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();

      const x = (event.clientX - rect.left) / devicePixelRatio;
      const y = (event.clientY - rect.top) / devicePixelRatio;

      if (initialCursor === undefined) {
        const sprite = findSprite(x, y);
        button.style.cursor = !!sprite ? "pointer" : "default";
        return;
      }

      setPreSelectedSprites(
        findSprites(
          Math.min(x, initialCursor[0]),
          Math.min(y, initialCursor[1]),
          Math.abs(x - initialCursor[0]),
          Math.abs(y - initialCursor[1]),
        ).map((s) => s.id),
      );

      setInitialCursor((prev) =>
        !!prev ? [prev[0], prev[1], x, y] : [x, y, x, y],
      );
    },
    [devicePixelRatio, findSprite, findSprites, initialCursor],
  );

  useEffect(() => {
    if (!image) return;
    if (!sprites) return;
    if (!spriteSheet) return;

    const spriteSheetCanvas = spriteSheetCanvasRef.current;
    if (!spriteSheetCanvas) return;

    spriteSheetCanvas.width = Math.max(
      rootDimensions.width,
      image.width * devicePixelRatio,
    );
    spriteSheetCanvas.height = Math.max(
      rootDimensions.height,
      image.height * devicePixelRatio,
    );

    const context = spriteSheetCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, spriteSheetCanvas.width, spriteSheetCanvas.height);
    context.fillStyle = spriteSheet.sheet.backgroundColor;
    context.fillRect(0, 0, spriteSheetCanvas.width, spriteSheetCanvas.height);
    context.scale(devicePixelRatio, devicePixelRatio);
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

    sprites.forEach((r) => {
      context.strokeStyle = spriteSheet.sheet.color;
      context.strokeRect(r.left, r.top, r.width, r.height);
    });
  }, [
    devicePixelRatio,
    image,
    rootDimensions.height,
    rootDimensions.width,
    spriteSheet,
    sprites,
  ]);

  useEffect(() => {
    if (!image) return;
    if (!sprites) return;
    if (!spriteSheet) return;

    const selectionCanvas = selectionCanvasRef.current;
    if (!selectionCanvas) return;

    selectionCanvas.width = Math.max(
      rootDimensions.width,
      image.width * devicePixelRatio,
    );
    selectionCanvas.height = Math.max(
      rootDimensions.height,
      image.height * devicePixelRatio,
    );

    const context = selectionCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, selectionCanvas.width, selectionCanvas.height);
    context.scale(devicePixelRatio, devicePixelRatio);

    spriteIdsFromProps.forEach((spriteId) => {
      const sprite = spriteSheet.sprites[spriteId];
      if (!sprite) return;

      context.globalAlpha = 0.4;
      context.fillStyle = spriteSheet.sheet.color;
      context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height);
      context.globalAlpha = 1;
    });

    preSelectedSprites?.forEach((spriteId) => {
      const sprite = spriteSheet.sprites[spriteId];
      if (!sprite) return;

      if (spriteIdsFromProps.includes(spriteId)) return;

      context.globalAlpha = 0.4;
      context.fillStyle = spriteSheet.sheet.color;
      context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height);
      context.globalAlpha = 1;
    });

    if (!!initialCursor) {
      context.globalAlpha = 0.2;
      context.fillStyle = spriteSheet.sheet.color;
      context.fillRect(
        Math.min(initialCursor[2], initialCursor[0]),
        Math.min(initialCursor[3], initialCursor[1]),
        Math.abs(initialCursor[2] - initialCursor[0]),
        Math.abs(initialCursor[3] - initialCursor[1]),
      );
    }
  }, [
    devicePixelRatio,
    image,
    spriteIdsFromProps,
    initialCursor,
    preSelectedSprites,
    rootDimensions.height,
    rootDimensions.width,
    spriteSheet,
    sprites,
  ]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "c":
          if (!!createAnimationDisabledFromProps) return;
          return createAnimationOnClickFromProps();

        case "e":
          if (!!exportFileDisabledFromProps) return;
          return exportFileOnClickFromProps();

        case "i":
          if (!!importFileDisabledFromProps) return;
          return importFileOnClickFromProps();
      }
    };

    root.addEventListener("keydown", handleKeyDown);
    return () => root.removeEventListener("keydown", handleKeyDown);
  }, [
    createAnimationDisabledFromProps,
    createAnimationOnClickFromProps,
    exportFileDisabledFromProps,
    exportFileOnClickFromProps,
    importFileDisabledFromProps,
    importFileOnClickFromProps,
  ]);

  return {
    ...rest,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    rootRef,
    selectionCanvasRef,
    spriteSheetCanvasRef,
  };
}
