import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo } from "react";

import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

import type CenterItemProps from "./CenterItem.types";

export default function useCenterItem({
  animation: animationFromProps,
  index: indexFromProps,
  ...rest
}: CenterItemProps) {
  const { colorDisabled, colorOnChange, colorValue } = useColor({
    animation: animationFromProps,
  });

  const { onionActive, onionDisabled, onionOnClick } = useOnion({
    animation: animationFromProps,
  });

  const { resetCenterDisabled, resetCenterOnClick } = useResetCenter({
    animation: animationFromProps,
    index: indexFromProps,
  });

  return {
    ...rest,
    colorDisabled,
    colorOnChange,
    colorValue,
    onionActive,
    onionDisabled,
    onionOnClick,
    resetCenterDisabled,
    resetCenterOnClick,
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

function useOnion({
  animation: animationFromProps,
}: Pick<CenterItemProps, "animation">) {
  const { setAnimationOnion } = useAnimations();

  const onionDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const onionOnClick = useCallback<Func>(() => {
    if (onionDisabled) return;
    setAnimationOnion(animationFromProps.id, (prev) => !prev);
  }, [animationFromProps.id, onionDisabled, setAnimationOnion]);

  useEffect(() => {
    if (!onionDisabled) return;
    setAnimationOnion(animationFromProps.id, false);
  }, [animationFromProps.id, onionDisabled, setAnimationOnion]);

  useKeyDown("o", onionOnClick);

  return { onionActive: animationFromProps.onion, onionDisabled, onionOnClick };
}

function useResetCenter({
  animation: animationFromProps,
  index: indexFromProps,
}: Pick<CenterItemProps, "animation" | "index">) {
  const { resetAnimationOffset } = useAnimations();

  const resetCenterDisabled = useMemo<boolean>(
    () =>
      animationFromProps.playing ||
      !animationFromProps.sprites ||
      (animationFromProps.sprites[indexFromProps].offsetX ===
        animationFromProps.sprites[indexFromProps].initialOffsetX &&
        animationFromProps.sprites[indexFromProps].offsetY ===
          animationFromProps.sprites[indexFromProps].initialOffsetY),
    [animationFromProps.playing, animationFromProps.sprites, indexFromProps],
  );

  const resetCenterOnClick = useCallback<Func>(() => {
    if (resetCenterDisabled) return;
    resetAnimationOffset(animationFromProps.id, indexFromProps);
  }, [
    animationFromProps.id,
    indexFromProps,
    resetAnimationOffset,
    resetCenterDisabled,
  ]);

  useKeyDown("c", resetCenterOnClick);

  return { resetCenterDisabled, resetCenterOnClick };
}
