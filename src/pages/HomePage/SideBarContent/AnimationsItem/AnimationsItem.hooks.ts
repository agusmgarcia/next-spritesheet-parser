import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations, useSpriteSheet } from "#src/store";

import type AnimationsItemProps from "./AnimationsItem.types";

export default function useAnimationsItem(props: AnimationsItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Animations", variant: "h2" }),
    [],
  );

  const {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  } = useAnimationSelector();

  return {
    ...props,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
    heading,
  };
}

function useAnimationSelector() {
  const { push } = useRouter();

  const { spriteSheet } = useSpriteSheet();
  const { animations } = useAnimations();

  const [animationSelectorValue, setAnimationSelectorValue] = useState("sheet");

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
    if (animationSelectorValue === "sheet") return;

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
