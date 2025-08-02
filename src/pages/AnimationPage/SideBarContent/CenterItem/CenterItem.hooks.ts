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
    centerToDownDisabled,
    centerToDownOnClick,
    centerToLeftDisabled,
    centerToLeftOnClick,
    centerToRightDisabled,
    centerToRightOnClick,
    centerToUpDisabled,
    centerToUpOnClick,
  } = useCenter({
    animation: animationFromProps,
    index: indexFromProps,
  });

  const { centerVisible, toggleVisibilityDisabled, toggleVisibilityOnClick } =
    useVisibility({
      animation: animationFromProps,
      index: indexFromProps,
    });

  return {
    ...rest,
    centerToDownDisabled,
    centerToDownOnClick,
    centerToLeftDisabled,
    centerToLeftOnClick,
    centerToRightDisabled,
    centerToRightOnClick,
    centerToUpDisabled,
    centerToUpOnClick,
    centerVisible,
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
    toggleVisibilityDisabled,
    toggleVisibilityOnClick,
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

  const centerToUpDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const centerToRightDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const centerToDownDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const centerToLeftDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const centerToUpOnClick = useCallback<Func>(() => {
    if (centerToUpDisabled) return;
    setAnimationCenter(animationFromProps.id, indexFromProps, (center) => ({
      offsetX: center.offsetX,
      offsetY: center.offsetY + devicePixelRatio,
    }));
  }, [
    animationFromProps.id,
    centerToUpDisabled,
    indexFromProps,
    setAnimationCenter,
  ]);

  const centerToRightOnClick = useCallback<Func>(() => {
    if (centerToRightDisabled) return;
    setAnimationCenter(animationFromProps.id, indexFromProps, (center) => ({
      offsetX: center.offsetX + devicePixelRatio,
      offsetY: center.offsetY,
    }));
  }, [
    animationFromProps.id,
    centerToRightDisabled,
    indexFromProps,
    setAnimationCenter,
  ]);

  const centerToDownOnClick = useCallback<Func>(() => {
    if (centerToDownDisabled) return;
    setAnimationCenter(animationFromProps.id, indexFromProps, (center) => ({
      offsetX: center.offsetX,
      offsetY: center.offsetY - devicePixelRatio,
    }));
  }, [
    animationFromProps.id,
    centerToDownDisabled,
    indexFromProps,
    setAnimationCenter,
  ]);

  const centerToLeftOnClick = useCallback<Func>(() => {
    if (centerToLeftDisabled) return;
    setAnimationCenter(animationFromProps.id, indexFromProps, (center) => ({
      offsetX: center.offsetX - devicePixelRatio,
      offsetY: center.offsetY,
    }));
  }, [
    animationFromProps.id,
    centerToLeftDisabled,
    indexFromProps,
    setAnimationCenter,
  ]);

  useKeyDown("ArrowUp", centerToUpOnClick, { altKey: true });
  useKeyDown("ArrowRight", centerToRightOnClick, { altKey: true });
  useKeyDown("ArrowDown", centerToDownOnClick, { altKey: true });
  useKeyDown("ArrowLeft", centerToLeftOnClick, { altKey: true });

  return {
    centerToDownDisabled,
    centerToDownOnClick,
    centerToLeftDisabled,
    centerToLeftOnClick,
    centerToRightDisabled,
    centerToRightOnClick,
    centerToUpDisabled,
    centerToUpOnClick,
  };
}

function useVisibility({
  animation: animationFromProps,
  index: indexFromProps,
}: Pick<CenterItemProps, "animation" | "index">) {
  const { toggleAnimationCenterVisibility } = useAnimations();

  const toggleVisibilityDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const centerVisible = useMemo<boolean>(
    () => !!animationFromProps.sprites[indexFromProps]?.center.visible,
    [animationFromProps.sprites, indexFromProps],
  );

  const toggleVisibilityOnClick = useCallback<Func>(() => {
    if (toggleVisibilityDisabled) return;
    toggleAnimationCenterVisibility(animationFromProps.id);
  }, [
    animationFromProps.id,
    toggleAnimationCenterVisibility,
    toggleVisibilityDisabled,
  ]);

  useKeyDown("v", toggleVisibilityOnClick);

  return { centerVisible, toggleVisibilityDisabled, toggleVisibilityOnClick };
}
