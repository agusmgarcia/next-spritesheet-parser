import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useSpriteSheet } from "#src/store";

import type AnimationPageProps from "./AnimationPage.types";

export default function useAnimationPage(props: AnimationPageProps) {
  const params = useParams();
  const { replace } = useRouter();

  const { animations } = useSpriteSheet();

  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);

  const animation = useMemo(
    () => animations.find((a) => a.id === params?.id),
    [animations, params?.id],
  );

  useEffect(() => {
    if (!params) return;
    if (!!animation) return;
    replace("/");
  }, [animation, params, replace]);

  return {
    ...props,
    animation,
    index,
    onIndexChange: setIndex,
    onScaleChange: setScale,
    scale,
  };
}
