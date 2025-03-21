import { useMemo } from "react";

import { type TypographyProps } from "#src/components";

import type ZoomItemProps from "./ZoomItem.types";

export default function useZoomItem(props: ZoomItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Zoom", variant: "h2" }),
    [],
  );

  return { ...props, heading };
}
