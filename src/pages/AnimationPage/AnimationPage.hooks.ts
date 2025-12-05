import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { type LayoutProps } from "#src/fragments";
import {
  useAnimation as useAnimationFromStore,
  useAnimations,
} from "#src/store";

import type AnimationPageProps from "./AnimationPage.types";

export default function useAnimationPage(props: AnimationPageProps) {
  const {} = useAnimation();

  const { instructions } = useInstructions();

  return { ...props, instructions };
}

function useAnimation() {
  const params = useParams();
  const { replace } = useRouter();

  const { animations } = useAnimations();
  const { setAnimationId } = useAnimationFromStore();

  useEffect(() => {
    if (!params?.id) return;
    if (Array.isArray(params.id)) return;
    setAnimationId(params.id);
  }, [params?.id, setAnimationId]);

  useEffect(() => {
    if (!params?.id) return; // TODO: does param start with undefined?
    if (Array.isArray(params.id)) return;
    if (!!animations?.[params.id]) return;
    replace("/");
  }, [animations, params?.id, replace]);

  return {};
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
