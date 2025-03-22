import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations, useSpriteSheet } from "#src/store";

import type AnimationsItemProps from "./AnimationsItem.types";

export default function useAnimationsItem({
  animation: animationFromProps,
  ...rest
}: AnimationsItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({
      children: "Animations",
      variant: "h2",
    }),
    [],
  );

  const {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  } = useAnimationSelector({ animation: animationFromProps });

  return {
    ...rest,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
    heading,
  };
}

function useAnimationSelector({
  animation: animationFromProps,
}: Pick<AnimationsItemProps, "animation">) {
  const { push } = useRouter();

  const { spriteSheet } = useSpriteSheet();
  const { animations } = useAnimations();

  const [animationSelectorValue, setAnimationSelectorValue] = useState(
    animationFromProps.id,
  );

  const animationSelectorOptions = useMemo<{ id: string; name: string }[]>(
    () => [
      { id: "sheet", name: spriteSheet?.name || "Sprite sheet" },
      ...animations.map((a) => ({ id: a.id, name: a.name })),
    ],
    [animations, spriteSheet?.name],
  );

  const animationSelectorOnChange = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((event) => setAnimationSelectorValue(event.target.value), []);

  useEffect(() => {
    setAnimationSelectorValue(animationFromProps.id);
  }, [animationFromProps.id]);

  useEffect(() => {
    if (animationSelectorValue === "sheet") {
      push("/");
      return;
    }

    const animation = animations.find((a) => a.id === animationSelectorValue);
    if (!animation) return;

    push(`/animations/${animation.id}`);
  }, [animationSelectorValue, animations, push]);

  return {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  };
}
