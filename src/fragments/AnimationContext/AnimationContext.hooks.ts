import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { type Animation, useAnimations } from "#src/store";

import type AnimationContextProps from "./AnimationContext.types";

export default function useAnimationContext(props: AnimationContextProps) {
  const params = useParams();
  const { replace } = useRouter();

  const { animations } = useAnimations();

  const animationIdFromParams = useMemo(() => params?.["id"], [params]);

  const value = useMemo<Animation | undefined>(
    () => animations?.find((a) => a.id === animationIdFromParams),
    [animations, animationIdFromParams],
  );

  useEffect(() => {
    if (!params) return;
    if (!!value) return;
    replace("/");
  }, [value, params, replace]);

  return { ...props, value };
}
