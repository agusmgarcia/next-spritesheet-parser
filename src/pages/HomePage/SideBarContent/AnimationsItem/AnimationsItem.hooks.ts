import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations, useSpriteSheet } from "#src/store";

import type AnimationsItemProps from "./AnimationsItem.types";

export default function useAnimationsItem({
  indices: indicesFromProps,
  indicesOnUnselectAll: indicesOnUnselectAllFromProps,
  ...rest
}: AnimationsItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Animations", variant: "h2" }),
    [],
  );

  const {
    animationSelectorDisabled,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  } = useAnimationSelector();

  const { resetSelectionDisabled, resetSelectionOnClick } = useResetSelection({
    indices: indicesFromProps,
    indicesOnUnselectAll: indicesOnUnselectAllFromProps,
  });

  const { createAnimationDisabled, createAnimationOnClick } =
    useCreateAnimation({ indices: indicesFromProps });

  return {
    ...rest,
    animationSelectorDisabled,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
    createAnimationDisabled,
    createAnimationOnClick,
    heading,
    resetSelectionDisabled,
    resetSelectionOnClick,
  };
}

function useAnimationSelector() {
  const { push } = useRouter();

  const { spriteSheet } = useSpriteSheet();
  const { animations } = useAnimations();

  const [animationSelectorValue, setAnimationSelectorValue] = useState("sheet");
  const [animationSelectorLoading, setAnimationSelectorLoading] =
    useState(false);

  const animationSelectorDisabled = useMemo<boolean>(
    () => animationSelectorLoading,
    [animationSelectorLoading],
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
    if (animationSelectorValue === "sheet") return;

    const animation = animations.find((a) => a.id === animationSelectorValue);
    if (!animation) return;

    setAnimationSelectorLoading(true);
    try {
      push(`/animations/${animation.id}`);
    } finally {
      setAnimationSelectorLoading(false);
    }
  }, [animationSelectorValue, animations, push]);

  return {
    animationSelectorDisabled,
    animationSelectorLoading,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  };
}

function useResetSelection({
  indices: indicesFromProps,
  indicesOnUnselectAll: indicesOnUnselectAllFromProps,
}: Pick<AnimationsItemProps, "indices" | "indicesOnUnselectAll">) {
  const resetSelectionDisabled = useMemo<boolean>(
    () => !indicesFromProps.length,
    [indicesFromProps.length],
  );

  const resetSelectionOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => indicesOnUnselectAllFromProps(), [indicesOnUnselectAllFromProps]);

  return { resetSelectionDisabled, resetSelectionOnClick };
}

function useCreateAnimation({
  indices: indicesFromProps,
}: Pick<AnimationsItemProps, "indices">) {
  const { push } = useRouter();

  const { createAnimation } = useAnimations();

  const [createAnimationLoading, setCreateAnimationLoading] = useState(false);

  const createAnimationDisabled = useMemo<boolean>(
    () => !indicesFromProps.length || createAnimationLoading,
    [createAnimationLoading, indicesFromProps.length],
  );

  const createAnimationOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (!indicesFromProps.length) return;
    setCreateAnimationLoading(true);
    createAnimation(indicesFromProps)
      .then((id) => push(`/animations/${id}`))
      .finally(() => setCreateAnimationLoading(false));
  }, [createAnimation, indicesFromProps, push]);

  return { createAnimationDisabled, createAnimationOnClick };
}
