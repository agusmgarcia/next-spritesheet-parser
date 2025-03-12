import { useMemo } from "react";

import { type TypographyProps } from "#src/components";

import type SideBarContentProps from "./SideBarContent.types";

export default function useSideBarContent(props: SideBarContentProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: props.animation.name, variant: "h1" }),
    [props.animation.name],
  );

  return { ...props, heading };
}
