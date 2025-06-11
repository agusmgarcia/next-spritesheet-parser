import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useMemo } from "react";

import { useScale, useSpriteSheet } from "#src/store";
import { useKeyDown } from "#src/utils";

import type ZoomItemProps from "./ZoomItem.types";

export default function useZoomItem(props: ZoomItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem();

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
    defaultCollapsed,
    disabled,
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}

function useSideBarItem() {
  const { spriteSheet } = useSpriteSheet();

  const disabled = useMemo<boolean>(
    () => !spriteSheet?.image.url,
    [spriteSheet?.image.url],
  );

  const defaultCollapsed = useMemo<boolean>(() => disabled, [disabled]);

  return { defaultCollapsed, disabled };
}

function useZoom() {
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
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}
