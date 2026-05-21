import { useMemo } from "react";

import { type LayoutProps, ZoomItem } from "#src/fragments";

import type AnimationPageProps from "./AnimationPage.types";

export default function useAnimationPage(props: AnimationPageProps) {
  const { instructions } = useInstructions();

  return { ...props, instructions };
}

function useInstructions() {
  const instructions = useMemo<LayoutProps["instructions"]>(
    () => [
      {
        keys: [
          {
            description: "Remove the animation",
            key: "r",
          },
        ],
        title: "Configurations",
      },
      {
        keys: [
          {
            description: "Play/Pause the animation",
            key: " ",
          },
          {
            description: "Move one sprite before",
            key: "ArrowLeft",
          },
          {
            description: "Move one sprite after",
            key: "ArrowRight",
          },
          {
            description: "Increase FPS",
            key: "\\+",
          },
          {
            description: "Decrease FPS",
            key: "\\-",
          },
        ],
        title: "Playing",
      },
      {
        keys: [
          {
            description: "Move the center up",
            key: "ArrowUp",
            options: { altKey: true },
          },
          {
            description: "Move the center right",
            key: "ArrowRight",
            options: { altKey: true },
          },
          {
            description: "Move the center down",
            key: "ArrowDown",
            options: { altKey: true },
          },
          {
            description: "Move the center left",
            key: "ArrowLeft",
            options: { altKey: true },
          },
          {
            description: "Toggle center visibility",
            key: "v",
          },
          {
            description: "Toggle grid visibility",
            key: "g",
          },
          {
            description: "Center the sprite",
            key: "c",
          },
          {
            description: "Toogle onion visibility",
            key: "o",
          },
        ],
        title: "Center",
      },
      ZoomItem.INSTRUCTIONS,
    ],
    [],
  );

  return { instructions };
}
