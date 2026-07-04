import {
  type Func,
  type Tuple,
  useDevicePixelRatio,
} from "@agusmgarcia/react-essentials-utils";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { useScale, useSpriteSheet, useSpriteSheetImage } from "#src/store";
import { useKeyDown, useViewport } from "#src/utils";

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

  const {} = useKeepDistanceOnScaleChange({ rootRef });

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

function useKeepDistanceOnScaleChange({
  rootRef: childrenRef,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
}) {
  const viewport = useViewport();
  const devicePixelratio = useDevicePixelRatio();

  const prevScaleRef = useRef(1);
  const prevTopLeftPointRef = useRef<Tuple<number, 2>>(null);

  const { spriteSheetImage } = useSpriteSheetImage();
  const { scale: scaleFromProps } = useScale();

  const scale = useMemo<number>(
    () => scaleFromProps * devicePixelratio,
    [devicePixelratio, scaleFromProps],
  );

  useEffect(() => {
    const children = childrenRef.current;
    if (!children) return;

    children.scrollTo({ behavior: "instant", left: 0, top: 0 });
  }, [childrenRef, spriteSheetImage?.url]);

  useEffect(() => {
    const children = childrenRef.current;
    if (!children) return;

    const halfWidth = children.clientWidth * 0.5;
    const halfHeight = children.clientHeight * 0.5;

    const prevCenter = [
      (prevTopLeftPointRef.current?.[0] || 0) + halfWidth,
      (prevTopLeftPointRef.current?.[1] || 0) + halfHeight,
    ];

    const newCenter = [
      (prevCenter[0] * scale) / prevScaleRef.current,
      (prevCenter[1] * scale) / prevScaleRef.current,
    ];

    children.scrollTo({
      behavior: "instant",
      left: newCenter[0] - halfWidth,
      top: newCenter[1] - halfHeight,
    });

    prevScaleRef.current = scale;
    prevTopLeftPointRef.current = [
      newCenter[0] - halfWidth,
      newCenter[1] - halfHeight,
    ];
  }, [childrenRef, scale]);

  useEffect(() => {
    if (viewport === "Mobile") return;

    const children = childrenRef.current;
    if (!children) return;

    const handleScroll = () => {
      prevTopLeftPointRef.current = [children.scrollLeft, children.scrollTop];
    };

    handleScroll();

    children.addEventListener("scroll", handleScroll);
    return () => children.removeEventListener("scroll", handleScroll);
  }, [childrenRef, viewport]);

  return { childrenRef };
}
