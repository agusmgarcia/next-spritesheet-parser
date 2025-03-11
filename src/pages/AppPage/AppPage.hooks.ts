import { useMemo } from "react";

import { useViewport } from "#src/utils";

import type AppPageProps from "./AppPage.types";

export default function useAppPage(props: AppPageProps) {
  const viewport = useViewport();

  const version = useMemo<string>(() => {
    const maybeVersion = process.env.NEXT_PUBLIC_APP_VERSION;
    if (!maybeVersion) return "v0.0.0";
    return `v${maybeVersion}`;
  }, []);

  return { ...props, version, viewport };
}
