import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useEffect, useMemo } from "react";

import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

import type CenterItemProps from "./CenterItem.types";

export default function useCenterItem({
  animation: animationFromProps,
  index: indexFromProps,
  ...rest
}: CenterItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem({
    animation: animationFromProps,
  });

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

  const {
    animationCenterDownDisabled,
    animationCenterDownOnClick,
    animationCenterLeftDisabled,
    animationCenterLeftOnClick,
    animationCenterRightDisabled,
    animationCenterRightOnClick,
    animationCenterUpDisabled,
    animationCenterUpOnClick,
  } = useCenter({
    animation: animationFromProps,
    index: indexFromProps,
  });

  return {
    ...rest,
    animationCenterDownDisabled,
    animationCenterDownOnClick,
    animationCenterLeftDisabled,
    animationCenterLeftOnClick,
    animationCenterRightDisabled,
    animationCenterRightOnClick,
    animationCenterUpDisabled,
    animationCenterUpOnClick,
    colorDisabled,
    colorOnChange,
    colorValue,
    defaultCollapsed,
    disabled,
    onionActive,
    onionDisabled,
    onionOnClick,
    resetCenterDisabled,
    resetCenterOnClick,
  };
}

function useSideBarItem({
  animation: animationFromProps,
}: Pick<CenterItemProps, "animation">) {
  const disabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const defaultCollapsed = useMemo<boolean>(() => disabled, [disabled]);

  return { defaultCollapsed, disabled };
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
    () => animationFromProps.playing || animationFromProps.sprites.length <= 1,
    [animationFromProps.playing, animationFromProps.sprites.length],
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
  const { resetAnimationCenter } = useAnimations();

  const resetCenterDisabled = useMemo<boolean>(
    () =>
      animationFromProps.playing ||
      !animationFromProps.sprites[indexFromProps] ||
      (animationFromProps.sprites[indexFromProps].center.offsetX ===
        animationFromProps.sprites[indexFromProps].center.initialOffsetX &&
        animationFromProps.sprites[indexFromProps].center.offsetY ===
          animationFromProps.sprites[indexFromProps].center.initialOffsetY),
    [animationFromProps.playing, animationFromProps.sprites, indexFromProps],
  );

  const resetCenterOnClick = useCallback<Func>(() => {
    if (resetCenterDisabled) return;
    resetAnimationCenter(animationFromProps.id, indexFromProps);
  }, [
    animationFromProps.id,
    indexFromProps,
    resetAnimationCenter,
    resetCenterDisabled,
  ]);

  useKeyDown("c", resetCenterOnClick);

  return { resetCenterDisabled, resetCenterOnClick };
}

function useCenter({
  animation: animationFromProps,
  index: indexFromProps,
}: Pick<CenterItemProps, "animation" | "index">) {
  const { setAnimationCenter } = useAnimations();

  const animationCenterUpDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const animationCenterRightDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const animationCenterDownDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const animationCenterLeftDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const animationCenterUpOnClick = useCallback<Func>(() => {
    if (animationCenterUpDisabled) return;
    setAnimationCenter(animationFromProps.id, indexFromProps, (center) => ({
      offsetX: center.offsetX,
      offsetY: center.offsetY + devicePixelRatio,
    }));
  }, [
    animationFromProps.id,
    animationCenterUpDisabled,
    indexFromProps,
    setAnimationCenter,
  ]);

  const animationCenterRightOnClick = useCallback<Func>(() => {
    if (animationCenterRightDisabled) return;
    setAnimationCenter(animationFromProps.id, indexFromProps, (center) => ({
      offsetX: center.offsetX + devicePixelRatio,
      offsetY: center.offsetY,
    }));
  }, [
    animationFromProps.id,
    animationCenterRightDisabled,
    indexFromProps,
    setAnimationCenter,
  ]);

  const animationCenterDownOnClick = useCallback<Func>(() => {
    if (animationCenterDownDisabled) return;
    setAnimationCenter(animationFromProps.id, indexFromProps, (center) => ({
      offsetX: center.offsetX,
      offsetY: center.offsetY - devicePixelRatio,
    }));
  }, [
    animationFromProps.id,
    animationCenterDownDisabled,
    indexFromProps,
    setAnimationCenter,
  ]);

  const animationCenterLeftOnClick = useCallback<Func>(() => {
    if (animationCenterLeftDisabled) return;
    setAnimationCenter(animationFromProps.id, indexFromProps, (center) => ({
      offsetX: center.offsetX - devicePixelRatio,
      offsetY: center.offsetY,
    }));
  }, [
    animationFromProps.id,
    animationCenterLeftDisabled,
    indexFromProps,
    setAnimationCenter,
  ]);

  useKeyDown("ArrowUp", animationCenterUpOnClick, { altKey: true });
  useKeyDown("ArrowRight", animationCenterRightOnClick, { altKey: true });
  useKeyDown("ArrowDown", animationCenterDownOnClick, { altKey: true });
  useKeyDown("ArrowLeft", animationCenterLeftOnClick, { altKey: true });

  return {
    animationCenterDownDisabled,
    animationCenterDownOnClick,
    animationCenterLeftDisabled,
    animationCenterLeftOnClick,
    animationCenterRightDisabled,
    animationCenterRightOnClick,
    animationCenterUpDisabled,
    animationCenterUpOnClick,
  };
}
