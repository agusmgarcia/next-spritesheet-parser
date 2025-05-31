import { sorts } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { useAnimations, useSpriteSheet } from "#src/store";

import type AnimationsItemProps from "./AnimationsItem.types";

export default function useAnimationsItem({
  animation: animationFromProps,
  ...rest
}: AnimationsItemProps) {
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
  };
}

function useAnimationSelector({
  animation: animationFromProps,
}: Pick<AnimationsItemProps, "animation">) {
  const navigate = useNavigate();

  const { spriteSheet } = useSpriteSheet();
  const { animations } = useAnimations();

  const [animationSelectorValue, setAnimationSelectorValue] = useState(
    animationFromProps.id,
  );

  const animationSelectorOptions = useMemo<{ id: string; name: string }[]>(
    () => [
      { id: "sheet", name: spriteSheet?.image.name || "Sprite sheet" },
      ...animations
        .map((a) => ({ id: a.id, name: a.name }))
        .sort((a1, a2) => sorts.byStringAsc(a1.name, a2.name)),
    ],
    [animations, spriteSheet?.image.name],
  );

  const animationSelectorOnChange = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((event) => setAnimationSelectorValue(event.target.value), []);

  useEffect(() => {
    setAnimationSelectorValue(animationFromProps.id);
  }, [animationFromProps.id]);

  useEffect(() => {
    if (animationSelectorValue === "sheet") {
      navigate("/");
      return;
    }

    const animation = animations.find((a) => a.id === animationSelectorValue);
    if (!animation) return;

    navigate(`/animations/${animation.id}`);
  }, [animationSelectorValue, animations, navigate]);

  return {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  };
}
