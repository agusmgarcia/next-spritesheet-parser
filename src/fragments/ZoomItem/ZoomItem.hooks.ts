import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useMemo } from "react";

import { useScale, useSpriteSheet } from "#src/store";
import { useKeyDown } from "#src/utils";

import type ZoomItemProps from "./ZoomItem.types";

export default function useZoomItem(props: ZoomItemProps) {
  const { scale, setScale } = useScale();
  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();

  const zoomOutDisabled = useMemo<boolean>(
    () => scale <= 1 || !spriteSheet?.image.url || spriteSheetLoading,
    [scale, spriteSheet?.image.url, spriteSheetLoading],
  );

  const zoomOutOnClick = useCallback<Func>(() => {
    if (zoomOutDisabled) return;
    setScale((prev) => prev - 1 / 5);
  }, [setScale, zoomOutDisabled]);

  const zoomInDisabled = useMemo<boolean>(
    () => !spriteSheet?.image.url || spriteSheetLoading,
    [spriteSheet?.image.url, spriteSheetLoading],
  );

  const zoomInOnClick = useCallback<Func>(() => {
    if (zoomInDisabled) return;
    setScale((prev) => prev + 1 / 5);
  }, [setScale, zoomInDisabled]);

  const resetZoomDisabled = useMemo<boolean>(
    () => scale <= 1 || !spriteSheet?.image.url || spriteSheetLoading,
    [scale, spriteSheet?.image.url, spriteSheetLoading],
  );

  const resetZoomOnClick = useCallback<Func>(() => {
    if (resetZoomDisabled) return;
    setScale(1);
  }, [resetZoomDisabled, setScale]);

  useKeyDown("ArrowUp", zoomInOnClick);
  useKeyDown("ArrowDown", zoomOutOnClick);
  useKeyDown("z", resetZoomOnClick);

  return {
    ...props,
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}
