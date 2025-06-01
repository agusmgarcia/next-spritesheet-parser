import { useMemo } from "react";

import { useSpriteSheet } from "#src/store";
import { useViewport } from "#src/utils";

import type LayoutProps from "./Layout.types";

export default function useLayout({
  sideBarCollapsable: sideBarCollapsableFromProps,
  ...rest
}: LayoutProps) {
  const viewport = useViewport();

  const { spriteSheet } = useSpriteSheet();

  const collapseHidden = useMemo<boolean>(
    () => !sideBarCollapsableFromProps || !spriteSheet?.image.url,
    [sideBarCollapsableFromProps, spriteSheet?.image.url],
  );

  const version = useMemo<string>(() => {
    const maybeVersion = process.env.NEXT_PUBLIC_APP_VERSION;
    if (!maybeVersion) return "v0.0.0";
    return `v${maybeVersion}`;
  }, []);

  return { ...rest, collapseHidden, version, viewport };
}
