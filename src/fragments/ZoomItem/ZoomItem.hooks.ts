import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useMemo } from "react";

import { useScale, useSpriteSheet, useSpriteSheetImage } from "#src/store";
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
  const { spriteSheetImage } = useSpriteSheetImage();

  const disabled = useMemo<boolean>(
    () => !spriteSheetImage?.url,
    [spriteSheetImage?.url],
  );

  const defaultCollapsed = useMemo<boolean>(() => disabled, [disabled]);

  return { defaultCollapsed, disabled };
}

function useZoom() {
  const { scale, setScale } = useScale();
  const { spriteSheetLoading } = useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();

  const zoomOutDisabled = useMemo<boolean>(
    () =>
      scale <= 1 ||
      !spriteSheetImage?.url ||
      spriteSheetImageLoading ||
      spriteSheetLoading,
    [scale, spriteSheetImage?.url, spriteSheetImageLoading, spriteSheetLoading],
  );

  const zoomOutOnClick = useCallback<Func>(() => {
    if (zoomOutDisabled) return;
    setScale((prev) => prev - 1 / 5);
  }, [setScale, zoomOutDisabled]);

  const zoomInDisabled = useMemo<boolean>(
    () =>
      !spriteSheetImage?.url || spriteSheetImageLoading || spriteSheetLoading,
    [spriteSheetImage?.url, spriteSheetImageLoading, spriteSheetLoading],
  );

  const zoomInOnClick = useCallback<Func>(() => {
    if (zoomInDisabled) return;
    setScale((prev) => prev + 1 / 5);
  }, [setScale, zoomInDisabled]);

  const resetZoomDisabled = useMemo<boolean>(
    () =>
      scale <= 1 ||
      !spriteSheetImage?.url ||
      spriteSheetImageLoading ||
      spriteSheetLoading,
    [scale, spriteSheetImage?.url, spriteSheetImageLoading, spriteSheetLoading],
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
