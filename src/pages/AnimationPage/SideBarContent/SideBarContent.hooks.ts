import { useMemo } from "react";

import { useAnimation } from "#src/store";

import type SideBarContentProps from "./SideBarContent.types";

export default function useSideBarContent(props: SideBarContentProps) {
  const { animation } = useAnimation();

  const heading = useMemo<string>(
    () => animation.name || "Animation",
    [animation.name],
  );

  return { ...props, heading };
}
