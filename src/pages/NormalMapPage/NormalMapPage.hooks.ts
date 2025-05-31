import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

import { type LayoutProps } from "#src/fragments";
import { useSpriteSheet } from "#src/store";

import type NormalMapPageProps from "./NormalMapPage.types";

export default function useNormalMapPage(props: NormalMapPageProps) {
  const navigate = useNavigate();

  const { spriteSheet } = useSpriteSheet();

  const { instructions } = useInstructions();

  useEffect(() => {
    if (!!spriteSheet) return;
    navigate("/", { replace: true });
  }, [navigate, spriteSheet]);

  return { ...props, instructions };
}

function useInstructions() {
  const instructions = useMemo<LayoutProps["instructions"]>(
    () => [
      {
        keys: [
          {
            description: "Zoom in",
            key: "ArrowUp",
          },
          {
            description: "Zoom out",
            key: "ArrowDown",
          },
          {
            description: "Reset zoom",
            key: "z",
          },
        ],
        title: "Zoom",
      },
    ],
    [],
  );

  return { instructions };
}
