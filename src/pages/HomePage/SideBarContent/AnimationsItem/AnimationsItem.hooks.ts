import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations, useSpriteSheet } from "#src/store";

import type AnimationsItemProps from "./AnimationsItem.types";

export default function useAnimationsItem({
  indices: indicesFromProps,
  unselectAll: unselectAllFromProps,
  ...rest
}: AnimationsItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Animations", variant: "h2" }),
    [],
  );

  const {
    disabled: animationSelectorDisabled,
    onChange: animationSelectorOnChange,
    options: animationSelectorOptions,
    value: animationSelectorValue,
  } = useAnimationSelector();

  const { disabled: resetSelectionDisabled, onClick: resetSelectionOnClick } =
    useResetSelection({
      indices: indicesFromProps,
      unselectAll: unselectAllFromProps,
    });

  const { disabled: createAnimationDisabled, onClick: createAnimationOnClick } =
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

  const [value, setValue] = useState("sheet");
  const [loading, setLoading] = useState(false);

  const options = useMemo<{ id: string; name: string }[]>(
    () => [
      { id: "sheet", name: spriteSheet?.name || "Sprite sheet" },
      ...animations.map((a) => ({ id: a.id, name: a.name })),
    ],
    [animations, spriteSheet?.name],
  );

  const onChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
    (event) => setValue(event.target.value),
    [],
  );

  useEffect(() => {
    if (value === "sheet") return;

    const animation = animations.find((a) => a.id === value);
    if (!animation) return;

    setLoading(true);
    try {
      push(`/animations/${animation.id}`);
    } finally {
      setLoading(false);
    }
  }, [value, animations, push]);

  return { disabled: loading, onChange, options, value };
}

function useResetSelection({
  indices: indicesFromProps,
  unselectAll: unselectAllFromProps,
}: Pick<AnimationsItemProps, "indices" | "unselectAll">) {
  const onClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => unselectAllFromProps(),
    [unselectAllFromProps],
  );

  return { disabled: !indicesFromProps.length, onClick };
}

function useCreateAnimation({
  indices: indicesFromProps,
}: Pick<AnimationsItemProps, "indices">) {
  const { push } = useRouter();

  const { createAnimation } = useAnimations();

  const [loading, setLoading] = useState(false);

  const onClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (!indicesFromProps.length) return;
    setLoading(true);
    createAnimation(indicesFromProps)
      .then((id) => push(`/animations/${id}`))
      .finally(() => setLoading(false));
  }, [createAnimation, indicesFromProps, push]);

  return { disabled: !indicesFromProps.length || loading, onClick };
}
