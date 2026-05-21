import { useContext } from "react";

import { AnimationContext } from "#src/fragments";

import type SideBarContentProps from "./SideBarContent.types";

export default function useSideBarContent(props: SideBarContentProps) {
  const animation = useContext(AnimationContext.Context);

  return { ...props, animation };
}
