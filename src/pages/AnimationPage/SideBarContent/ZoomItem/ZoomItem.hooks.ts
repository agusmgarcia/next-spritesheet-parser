import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

import type ZoomItemProps from "./ZoomItem.types";

export default function useZoomItem({
  animation: animationFromProps,
  ...rest
}: ZoomItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Zoom", variant: "h2" }),
    [],
  );

  const {
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  } = useZoom({ animation: animationFromProps });

  return {
    ...rest,
    heading,
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}

function useZoom({
  animation: animationFromProps,
}: Pick<ZoomItemProps, "animation">) {
  const { setAnimationScale } = useAnimations();

  const zoomOutDisabled = useMemo<boolean>(
    () => animationFromProps.scale <= 1,
    [animationFromProps.scale],
  );

  const zoomOutOnClick = useCallback<Func>(() => {
    if (zoomOutDisabled) return;
    setAnimationScale(animationFromProps.id, (prev) => prev - 1 / 5);
  }, [animationFromProps.id, setAnimationScale, zoomOutDisabled]);

  const zoomInDisabled = useMemo<boolean>(() => false, []);

  const zoomInOnClick = useCallback<Func>(() => {
    if (zoomInDisabled) return;
    setAnimationScale(animationFromProps.id, (prev) => prev + 1 / 5);
  }, [animationFromProps.id, setAnimationScale, zoomInDisabled]);

  const resetZoomDisabled = useMemo<boolean>(
    () => animationFromProps.scale <= 1,
    [animationFromProps.scale],
  );

  const resetZoomOnClick = useCallback<Func>(() => {
    if (resetZoomDisabled) return;
    setAnimationScale(animationFromProps.id, 1);
  }, [animationFromProps.id, resetZoomDisabled, setAnimationScale]);

  useEffect(() => {
    setAnimationScale(animationFromProps.id, (prev) => (prev >= 1 ? prev : 1));
  }, [animationFromProps.id, setAnimationScale]);

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
