import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { type Animation, useAnimations } from "#src/store";

import type AnimationPageProps from "./AnimationPage.types";

export default function useAnimationPage(props: AnimationPageProps) {
  const { animation } = useAnimation();

  const { index, onIndexChange } = useIndex({ animation });

  return {
    ...props,
    animation,
    index,
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
