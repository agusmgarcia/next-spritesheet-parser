import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useMemo } from "react";

import { useSpriteSheet } from "#src/store";
import { useKeyDown } from "#src/utils";

import type ZoomItemProps from "./ZoomItem.types";

export default function useZoomItem(props: ZoomItemProps) {
  const {
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  } = useZoom();

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

function useZoom() {
  const { setSpriteSheetScale, spriteSheet, spriteSheetLoading } =
    useSpriteSheet();

  const zoomOutDisabled = useMemo<boolean>(
    () => !spriteSheet || spriteSheet.scale <= 1 || spriteSheetLoading,
    [spriteSheet, spriteSheetLoading],
  );

  const zoomOutOnClick = useCallback<Func>(() => {
    if (zoomOutDisabled) return;
    setSpriteSheetScale((prev) => prev - 1 / 5);
  }, [setSpriteSheetScale, zoomOutDisabled]);

  const zoomInDisabled = useMemo<boolean>(
    () => !spriteSheet || spriteSheetLoading,
    [spriteSheet, spriteSheetLoading],
  );

  const zoomInOnClick = useCallback<Func>(() => {
    if (zoomInDisabled) return;
    setSpriteSheetScale((prev) => prev + 1 / 5);
  }, [setSpriteSheetScale, zoomInDisabled]);

  const resetZoomDisabled = useMemo<boolean>(
    () => !spriteSheet || spriteSheet.scale <= 1 || spriteSheetLoading,
    [spriteSheet, spriteSheetLoading],
  );

  const resetZoomOnClick = useCallback<Func>(() => {
    if (resetZoomDisabled) return;
    setSpriteSheetScale(1);
  }, [resetZoomDisabled, setSpriteSheetScale]);

  useKeyDown("ArrowUp", zoomInOnClick);
  useKeyDown("ArrowDown", zoomOutOnClick);
  useKeyDown("z", resetZoomOnClick);

  return {
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}
