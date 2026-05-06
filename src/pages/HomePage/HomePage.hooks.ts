import { useEffect, useMemo } from "react";

import { type LayoutProps, ZoomItem } from "#src/fragments";
import { useSpriteSelection } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { unselectAllSprites } = useSpriteSelection();

  const instructions = useMemo<LayoutProps["instructions"]>(
    () => [
      {
        keys: [
          {
            description: "Remove sprite sheet",
            key: "r",
          },
          {
            description: "Import image or configuration",
            key: "i",
          },
          {
            description: "Export configuration",
            key: "e",
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
        ],
        title: "Animations",
      },
      {
        keys: [
          {
            description: "Clear sprite selection",
            key: "l",
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
        title: "Sprites",
      },
      ZoomItem.INSTRUCTIONS,
    ],
    [],
  );

  useEffect(() => {
    unselectAllSprites();
  }, [unselectAllSprites]);

  return { ...props, instructions };
}
