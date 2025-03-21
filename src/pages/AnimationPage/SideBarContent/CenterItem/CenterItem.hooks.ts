import { useCallback, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";

import type CenterItemProps from "./CenterItem.types";

export default function useCenterItem({
  animation: animationFromProps,
  ...rest
}: CenterItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({
      children: "Center",
      variant: "h2",
    }),
    [],
  );

  const { colorDisabled, colorOnChange, colorValue } = useColor({
    animation: animationFromProps,
  });

  return {
    ...rest,
    colorDisabled,
    colorOnChange,
    colorValue,
    heading,
  };
}

function useColor({
  animation: animationFromProps,
}: Pick<CenterItemProps, "animation">) {
  const { setAnimationColor } = useAnimations();

  const colorValue = useMemo<string>(
    () => animationFromProps.color,
    [animationFromProps.color],
  );

  const colorDisabled = useMemo<boolean>(() => false, []);

  const colorOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationColor(animationFromProps.id, event.target.value),
    [animationFromProps.id, setAnimationColor],
  );

  return { colorDisabled, colorOnChange, colorValue };
}
