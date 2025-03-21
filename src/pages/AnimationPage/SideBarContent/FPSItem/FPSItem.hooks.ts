import { useMemo } from "react";

import { type TypographyProps } from "#src/components";

import type FPSItemProps from "./FPSItem.types";

export default function useFPSItem(props: FPSItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "FPS", variant: "h2" }),
    [],
  );

  return { ...props, heading };
}
