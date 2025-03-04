import { useMemo } from "react";

import { useSpriteSheet } from "#src/store";

import type AppPageProps from "./AppPage.types";

export default function useAppPage(props: AppPageProps) {
  const { backgroundColor } = useSpriteSheet();

  const backgroundStyle = useMemo(
    () =>
      !!backgroundColor.length
        ? {
            backgroundColor: `rgb(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`,
          }
        : undefined,
    [backgroundColor],
  );

  const version = useMemo(() => {
    const maybeVersion = process.env.NEXT_PUBLIC_APP_VERSION;
    if (!maybeVersion) return "v0.0.0";
    return `v${maybeVersion}`;
  }, []);

  return { ...props, backgroundStyle, version };
}
