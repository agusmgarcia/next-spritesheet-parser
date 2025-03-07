import { useMemo } from "react";

import { useSpriteSheet } from "#src/store";

import type AppPageProps from "./AppPage.types";

export default function useAppPage(props: AppPageProps) {
  const { spriteSheet } = useSpriteSheet();

  const backgroundStyle = useMemo(
    () =>
      !!spriteSheet?.backgroundColor
        ? {
            backgroundColor: `rgb(${spriteSheet.backgroundColor[0]}, ${spriteSheet.backgroundColor[1]}, ${spriteSheet.backgroundColor[2]})`,
          }
        : undefined,
    [spriteSheet?.backgroundColor],
  );

  const version = useMemo(() => {
    const maybeVersion = process.env.NEXT_PUBLIC_APP_VERSION;
    if (!maybeVersion) return "v0.0.0";
    return `v${maybeVersion}`;
  }, []);

  return { ...props, backgroundStyle, version };
}
