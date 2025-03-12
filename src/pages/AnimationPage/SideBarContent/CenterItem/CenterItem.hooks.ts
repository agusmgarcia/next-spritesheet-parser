import { useCallback, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";

import type CenterItemProps from "./CenterItem.types";

export default function useCenterItem({
  animation: animationFromProps,
  index: indexFromProps,
  playing: playingFromProps,
  ...rest
}: CenterItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({
      children: "Center",
      variant: "h2",
    }),
    [],
  );

  const { disabled: resetCenterDisabled, onClick: resetCenterOnClick } =
    useResetCenter({
      animation: animationFromProps,
      index: indexFromProps,
      playing: playingFromProps,
    });

  const {
    disabled: colorDisabled,
    onChange: colorOnChange,
    value: colorValue,
  } = useColor({ animation: animationFromProps });

  return {
    ...rest,
    colorDisabled,
    colorOnChange,
    colorValue,
    heading,
    resetCenterDisabled,
    resetCenterOnClick,
  };
}

function useResetCenter({
  animation: animationFromProps,
  index: indexFromProps,
  playing: playingFromProps,
}: Pick<CenterItemProps, "animation" | "index"> & { playing: boolean }) {
  const { resetAnimationOffset } = useAnimations();

  const disabled = useMemo<boolean>(
    () =>
      playingFromProps ||
      (animationFromProps.sprites[indexFromProps].offsetX ===
        animationFromProps.sprites[indexFromProps].initialOffsetX &&
        animationFromProps.sprites[indexFromProps].offsetY ===
          animationFromProps.sprites[indexFromProps].initialOffsetY),
    [animationFromProps.sprites, indexFromProps, playingFromProps],
  );

  const onClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => resetAnimationOffset(animationFromProps.id, indexFromProps),
    [animationFromProps.id, indexFromProps, resetAnimationOffset],
  );

  return { disabled, onClick };
}

function useColor({
  animation: animationFromProps,
}: Pick<CenterItemProps, "animation">) {
  const { setAnimationColor } = useAnimations();

  const value = useMemo<string>(
    () => animationFromProps.color,
    [animationFromProps.color],
  );

  const disabled = useMemo<boolean>(() => false, []);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationColor(animationFromProps.id, event.target.value),
    [animationFromProps.id, setAnimationColor],
  );

  return { disabled, onChange, value };
}
