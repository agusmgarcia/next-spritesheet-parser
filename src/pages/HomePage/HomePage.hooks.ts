import { useEffect, useMemo } from "react";

import { type LayoutProps } from "#src/fragments";
import { useSpriteSelection } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { unselectAllSprites } = useSpriteSelection();

  const instructions = useMemo<LayoutProps["instructions"]>(
    () => [
      {
        keys: [
          {
            description: "Import image or configuration",
            key: "i",
          },
          {
            description: "Export configuration",
            key: "e",
          },
          {
            description: "Remove sprite sheet",
            key: "r",
          },
        ],
        title: "Files",
      },
      {
        keys: [
          {
            description: "Create a new animation",
            key: "c",
          },
          {
            description: "Reset sprite selection",
            key: "r",
          },
          {
            description: "Merge sprite selection into single one",
            key: "m",
          },
          {
            description: "Split sprite selection into multiple ones",
            key: "s",
          },
        ],
        title: "Animations",
      },
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

  useEffect(() => {
    unselectAllSprites();
  }, [unselectAllSprites]);

  return { ...props, instructions };
}
