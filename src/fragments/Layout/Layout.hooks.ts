import { type Func, useDevicePixelRatio } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useScale, useSpriteSheet } from "#src/store";
import { useKeyDown, useViewport } from "#src/utils";

import type LayoutProps from "./Layout.types";

export default function useLayout({
  instructions: instructionsFromProps,
  sideBarCollapsable: sideBarCollapsableFromProps,
  ...rest
}: LayoutProps) {
  const viewport = useViewport();

  const { sideBarCollapsed, sideBarCollapsedOnChange } = useSidebarCollapsed({
    sideBarCollapsable: sideBarCollapsableFromProps,
  });

  const { childrenRef } = useScroll({ sideBarCollapsed });

  const { instructions } = useInstructions({
    instructions: instructionsFromProps,
    sideBarCollapsed,
  });

  const version = useMemo<string>(() => {
    const maybeVersion = process.env.NEXT_PUBLIC_APP_VERSION;
    if (!maybeVersion) return "v0.0.0";
    return `v${maybeVersion}`;
  }, []);

  return {
    ...rest,
    childrenRef,
    instructions,
    sideBarCollapsed,
    sideBarCollapsedOnChange,
    version,
    viewport,
  };
}

const INITIAL_PREV_CENTER = [0, 0];

function useScroll({
  sideBarCollapsed: sideBarCollapsedFromProps,
}: {
  sideBarCollapsed: boolean | undefined;
}) {
  const viewport = useViewport();
  const devicePixelratio = useDevicePixelRatio();

  const childrenRef = useRef<HTMLDivElement>(null);
  const prevScaleRef = useRef(1);
  const prevTopLeftPointRef = useRef(INITIAL_PREV_CENTER);

  const { spriteSheet } = useSpriteSheet();
  const { scale: scaleFromProps } = useScale();

  const scale = useMemo<number>(
    () => scaleFromProps * devicePixelratio,
    [devicePixelratio, scaleFromProps],
  );

  useEffect(() => {
    const children = childrenRef.current;
    if (!children) return;

    children.scrollTo({ behavior: "instant", left: 0, top: 0 });
  }, [spriteSheet?.image.url]);

  useEffect(() => {
    const children = childrenRef.current;
    if (!children) return;

    const halfWidth =
      (children.clientWidth - (!sideBarCollapsedFromProps ? 360 : 0)) * 0.5;
    const halfHeight = children.clientHeight * 0.5;

    const prevCenter = [
      prevTopLeftPointRef.current[0] + halfWidth,
      prevTopLeftPointRef.current[1] + halfHeight,
    ];

    const newCenter = [
      (prevCenter[0] * scale) / prevScaleRef.current,
      (prevCenter[1] * scale) / prevScaleRef.current,
    ];

    children.scrollTo({
      behavior: "instant",
      left: newCenter[0] - halfWidth,
      top: newCenter[1] - halfHeight,
    });

    prevScaleRef.current = scale;
    prevTopLeftPointRef.current = [
      newCenter[0] - halfWidth,
      newCenter[1] - halfHeight,
    ];
  }, [scale, sideBarCollapsedFromProps]);

  useEffect(() => {
    if (viewport === "Mobile") return;

    const children = childrenRef.current;
    if (!children) return;

    const handleScroll = () => {
      prevTopLeftPointRef.current = [children.scrollLeft, children.scrollTop];
    };

    handleScroll();

    children.addEventListener("scroll", handleScroll);
    return () => children.removeEventListener("scroll", handleScroll);
  }, [viewport]);

  return { childrenRef };
}

function useSidebarCollapsed({
  sideBarCollapsable: sideBarCollapsableFromProps,
}: Pick<LayoutProps, "sideBarCollapsable">) {
  const { spriteSheet } = useSpriteSheet();

  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  const sideBarHidden = useMemo<boolean>(
    () => !sideBarCollapsableFromProps || !spriteSheet?.image.url,
    [sideBarCollapsableFromProps, spriteSheet?.image.url],
  );

  const toggleSideBar = useCallback<Func>(() => {
    if (sideBarHidden) return;
    setSideBarCollapsed((prev) => !prev);
  }, [sideBarHidden]);

  useKeyDown("s", toggleSideBar);

  useEffect(() => {
    setSideBarCollapsed((prev) => (sideBarHidden ? false : prev));
  }, [sideBarHidden]);

  return {
    sideBarCollapsed: !sideBarHidden ? sideBarCollapsed : undefined,
    sideBarCollapsedOnChange: !sideBarHidden ? setSideBarCollapsed : undefined,
  };
}

function useInstructions({
  instructions: instructionsFromProps,
  sideBarCollapsed: sideBarCollapsedFromProps,
}: Pick<LayoutProps, "instructions"> & {
  sideBarCollapsed: boolean | undefined;
}) {
  const instructions = useMemo<LayoutProps["instructions"]>(
    () =>
      typeof sideBarCollapsedFromProps !== "undefined"
        ? instructionsFromProps?.concat({
            keys: [
              {
                description: "Collapse/Expand the side bar",
                key: "S",
              },
            ],
            title: "Others",
          })
        : instructionsFromProps,
    [instructionsFromProps, sideBarCollapsedFromProps],
  );

  return { instructions };
}
