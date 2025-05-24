import { useDevicePixelRatio } from "@agusmgarcia/react-core";
import { useEffect, useMemo, useRef, useState } from "react";

import { useScale, useSpriteSheet } from "#src/store";
import { useViewport } from "#src/utils";

import type LayoutProps from "./Layout.types";

export default function useLayout({ sideBarCollapse, ...rest }: LayoutProps) {
  const viewport = useViewport();
  const devicePixelratio = useDevicePixelRatio();

  const { spriteSheet } = useSpriteSheet();
  const { scale: scaleFromProps } = useScale();

  const [sideBarCollapsed, setSideBarCollapsed] = useState(
    typeof sideBarCollapse === "boolean" ? !sideBarCollapse : undefined,
  );

  const scale = useMemo<number>(
    () => scaleFromProps * devicePixelratio,
    [devicePixelratio, scaleFromProps],
  );

  const version = useMemo<string>(() => {
    const maybeVersion = process.env.NEXT_PUBLIC_APP_VERSION;
    if (!maybeVersion) return "v0.0.0";
    return `v${maybeVersion}`;
  }, []);

  const childrenRef = useRef<HTMLDivElement>(null);
  const prevScaleRef = useRef(scale);
  const prevSideBarCollapsed = useRef(sideBarCollapsed);

  useEffect(() => {
    const children = childrenRef.current;
    if (!children) return;

    children.scrollTo({ behavior: "instant", left: 0, top: 0 });
  }, [spriteSheet?.image.url]);

  useEffect(() => {
    const children = childrenRef.current;
    if (!children) return;

    if (scale !== prevScaleRef.current) {
      children.scrollTo({
        behavior: "instant",
        left:
          children.scrollLeft +
          (children.clientWidth / 2) * (scale - prevScaleRef.current),
        top:
          children.scrollTop +
          (children.clientHeight / 2) * (scale - prevScaleRef.current),
      });

      console.log({
        left: children.scrollLeft,
        prevScale: prevScaleRef.current,
        scale,
        top: children.scrollTop,
      });
    }

    prevScaleRef.current = scale;
    prevSideBarCollapsed.current = sideBarCollapsed;
  }, [scale, sideBarCollapsed]);

  return {
    ...rest,
    childrenRef,
    setSideBarCollapsed,
    sideBarCollapsed,
    version,
    viewport,
  };
}
