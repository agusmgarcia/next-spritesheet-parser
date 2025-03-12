import { useMemo } from "react";

import { type TypographyProps } from "#src/components";

import type PlayingItemProps from "./PlayingItem.types";

export default function usePlayingItem(props: PlayingItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Playing", variant: "h2" }),
    [],
  );

  return { ...props, heading };
}
