import { useCallback, useEffect, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";
import { useDevicePixelRatio } from "#src/utils";

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
  const devicePixelRatio = useDevicePixelRatio();

  const { setAnimationScale } = useAnimations();

  const zoomOutDisabled = useMemo<boolean>(
    () => animationFromProps.scale <= devicePixelRatio,
    [animationFromProps.scale, devicePixelRatio],
  );

  const zoomOutOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    () =>
      setAnimationScale(
        animationFromProps.id,
        (prev) => prev - devicePixelRatio / 5,
      ),
    [animationFromProps.id, devicePixelRatio, setAnimationScale],
  );

  const zoomInDisabled = useMemo<boolean>(() => false, []);

  const zoomInOnClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () =>
      setAnimationScale(
        animationFromProps.id,
        (prev) => prev + devicePixelRatio / 5,
      ),
    [animationFromProps.id, devicePixelRatio, setAnimationScale],
  );

  const resetZoomDisabled = useMemo<boolean>(
    () => animationFromProps.scale <= devicePixelRatio,
    [animationFromProps.scale, devicePixelRatio],
  );

  const resetZoomOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    () => setAnimationScale(animationFromProps.id, devicePixelRatio),
    [animationFromProps.id, devicePixelRatio, setAnimationScale],
  );

  useEffect(() => {
    setAnimationScale(animationFromProps.id, (prev) =>
      prev >= devicePixelRatio ? prev : devicePixelRatio,
    );
  }, [animationFromProps.id, devicePixelRatio, setAnimationScale]);

  return {
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}
