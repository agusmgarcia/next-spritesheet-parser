import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { type LayoutProps } from "#src/fragments";
import { type Animation, useAnimations } from "#src/store";

import type AnimationPageProps from "./AnimationPage.types";

export default function useAnimationPage(props: AnimationPageProps) {
  const { animation } = useAnimation();

  const { index, onIndexChange } = useIndex({ animation });

  const { instructions } = useInstructions();

  return {
    ...props,
    animation,
    index,
    instructions,
    onIndexChange,
  };
}

function useAnimation() {
  const params = useParams();
  const { replace } = useRouter();

  const { animations } = useAnimations();

  const animation = useMemo<Animation | undefined>(
    () => animations.find((a) => a.id === params?.id),
    [animations, params?.id],
  );

  useEffect(() => {
    if (!params) return;
    if (!!animation) return;
    replace("/");
  }, [animation, params, replace]);

  return { animation };
}

function useIndex({
  animation: animationFromProps,
}: Pick<ReturnType<typeof useAnimation>, "animation">) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!animationFromProps?.id) return;
    setIndex(0);
  }, [animationFromProps?.id]);

  return { index, onIndexChange: setIndex };
}

function useInstructions() {
  const instructions = useMemo<LayoutProps["instructions"]>(
    () => [
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
        ],
        title: "Playing",
      },
      {
        keys: [
          {
            description: "Increase FPS",
            key: "\\+",
          },
          {
            description: "Decrease FPS",
            key: "\\-",
          },
        ],
        title: "FPS",
      },
      {
        keys: [
          {
            description: "Move the sprite down",
            key: "ArrowUp",
            options: { altKey: true },
          },
          {
            description: "Move the sprite left",
            key: "ArrowRight",
            options: { altKey: true },
          },
          {
            description: "Move the sprite up",
            key: "ArrowDown",
            options: { altKey: true },
          },
          {
            description: "Move the sprite right",
            key: "ArrowLeft",
            options: { altKey: true },
          },
          {
            description: "Center the sprite",
            key: "c",
          },
          {
            description: "Enable/Disable onion feature",
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
