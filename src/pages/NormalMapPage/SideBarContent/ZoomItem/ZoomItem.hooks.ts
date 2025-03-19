import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useMemo } from "react";

import { useNormalMap } from "#src/store";
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
  const { normalMap, normalMapLoading, setNormalMapScale } = useNormalMap();

  const zoomOutDisabled = useMemo<boolean>(
    () => !normalMap || normalMap.scale <= 1 || normalMapLoading,
    [normalMap, normalMapLoading],
  );

  const zoomOutOnClick = useCallback<Func>(() => {
    if (zoomOutDisabled) return;
    setNormalMapScale((prev) => prev - 1 / 5);
  }, [setNormalMapScale, zoomOutDisabled]);

  const zoomInDisabled = useMemo<boolean>(
    () => !normalMap || normalMapLoading,
    [normalMap, normalMapLoading],
  );

  const zoomInOnClick = useCallback<Func>(() => {
    if (zoomInDisabled) return;
    setNormalMapScale((prev) => prev + 1 / 5);
  }, [setNormalMapScale, zoomInDisabled]);

  const resetZoomDisabled = useMemo<boolean>(
    () => !normalMap || normalMap.scale <= 1 || normalMapLoading,
    [normalMap, normalMapLoading],
  );

  const resetZoomOnClick = useCallback<Func>(() => {
    if (resetZoomDisabled) return;
    setNormalMapScale(1);
  }, [resetZoomDisabled, setNormalMapScale]);

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
