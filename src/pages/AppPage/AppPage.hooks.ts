import { useMemo } from "react";

import { useSpriteSheet } from "#src/store";

import type AppPageProps from "./AppPage.types";

export default function useAppPage(props: AppPageProps) {
  const { spriteSheet } = useSpriteSheet();

  const backgroundStyle = useMemo<React.CSSProperties>(
    () => ({ backgroundColor: spriteSheet?.backgroundColor }),
    [spriteSheet?.backgroundColor],
  );

  const version = useMemo<string>(() => {
    const maybeVersion = process.env.NEXT_PUBLIC_APP_VERSION;
    if (!maybeVersion) return "v0.0.0";
    return `v${maybeVersion}`;
  }, []);

  return { ...props, backgroundStyle, version };
}
