import { useMemo } from "react";

import { type TypographyProps } from "#src/components";

import type SideBarContentProps from "./SideBarContent.types";

export default function useSideBarContent(props: SideBarContentProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Home", variant: "h1" }),
    [],
  );

  return { ...props, heading };
}
