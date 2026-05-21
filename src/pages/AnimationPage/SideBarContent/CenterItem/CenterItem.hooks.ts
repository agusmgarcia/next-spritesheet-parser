import {
  type Func,
  useDevicePixelRatio,
} from "@agusmgarcia/react-essentials-utils";
import { useCallback, useContext, useMemo } from "react";

import { AnimationContext } from "#src/fragments";
import { useAnimations, useIndex } from "#src/store";
import { useKeyDown } from "#src/utils";

import type CenterItemProps from "./CenterItem.types";

export default function useCenterItem(props: CenterItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem();

  const { colorDisabled, colorOnChange, colorValue } = useColor();

  const { gridActive, gridDisabled, gridOnClick } = useGrid();

  const { onionActive, onionDisabled, onionOnClick } = useOnion();

  const { resetCenterDisabled, resetCenterOnClick } = useResetCenter();

  const {
    centerToDownDisabled,
    centerToDownOnClick,
    centerToLeftDisabled,
    centerToLeftOnClick,
    centerToRightDisabled,
    centerToRightOnClick,
    centerToUpDisabled,
    centerToUpOnClick,
  } = useCenter();

  const { centerVisible, toggleVisibilityDisabled, toggleVisibilityOnClick } =
    useVisibility();

  return {
    ...props,
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
    gridActive,
    gridDisabled,
    gridOnClick,
    onionActive,
    onionDisabled,
    onionOnClick,
    resetCenterDisabled,
    resetCenterOnClick,
    toggleVisibilityDisabled,
    toggleVisibilityOnClick,
  };
}

function useSideBarItem() {
  const animation = useContext(AnimationContext.Context);

  const disabled = useMemo<boolean>(
    () => !animation || animation.playing,
    [animation],
  );

  const defaultCollapsed = useMemo<boolean>(() => disabled, [disabled]);

  return { defaultCollapsed, disabled };
}

function useColor() {
  const animation = useContext(AnimationContext.Context);

  const { setAnimationColor } = useAnimations();

  const colorValue = useMemo<string>(
    () => animation?.color || "#ffffff",
    [animation?.color],
  );

  const colorDisabled = useMemo<boolean>(
    () => !animation || animation.playing,
    [animation],
  );

  const colorOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (colorDisabled) return;
      if (!animation?.id) return;

      setAnimationColor(animation.id, event.target.value);
    },
    [animation, colorDisabled, setAnimationColor],
  );

  return { colorDisabled, colorOnChange, colorValue };
}

function useGrid() {
  const animation = useContext(AnimationContext.Context);

  const { setAnimationGrid } = useAnimations();

  const gridDisabled = useMemo<boolean>(
    () => !animation || animation.playing,
    [animation],
  );

  const gridOnClick = useCallback<Func>(() => {
    if (gridDisabled) return;
    if (!animation?.id) return;

    setAnimationGrid(animation.id, (prev) => !prev);
  }, [animation, gridDisabled, setAnimationGrid]);

  useKeyDown("g", gridOnClick);

  return { gridActive: !!animation?.grid, gridDisabled, gridOnClick };
}

function useOnion() {
  const animation = useContext(AnimationContext.Context);

  const { setAnimationOnion } = useAnimations();
  const { index } = useIndex();

  const onionDisabled = useMemo<boolean>(
    () =>
      !animation ||
      animation.playing ||
      animation.sprites.length <= 1 ||
      !index,
    [animation, index],
  );

  const onionOnClick = useCallback<Func>(() => {
    if (onionDisabled) return;
    if (!animation?.id) return;

    setAnimationOnion(animation.id, (prev) => !prev);
  }, [animation, onionDisabled, setAnimationOnion]);

  useKeyDown("o", onionOnClick);

  return { onionActive: !!animation?.onion, onionDisabled, onionOnClick };
}

function useResetCenter() {
  const animation = useContext(AnimationContext.Context);

  const { resetAnimationCenter } = useAnimations();
  const { index } = useIndex();

  const resetCenterDisabled = useMemo<boolean>(
    () =>
      !animation ||
      animation.playing ||
      !animation.sprites[index] ||
      (animation.sprites[index].center.offsetX ===
        animation.sprites[index].center.initialOffsetX &&
        animation.sprites[index].center.offsetY ===
          animation.sprites[index].center.initialOffsetY),
    [animation, index],
  );

  const resetCenterOnClick = useCallback<Func>(() => {
    if (resetCenterDisabled) return;
    if (!animation?.id) return;

    resetAnimationCenter(animation.id, index);
  }, [animation, index, resetAnimationCenter, resetCenterDisabled]);

  useKeyDown("c", resetCenterOnClick);

  return { resetCenterDisabled, resetCenterOnClick };
}

function useCenter() {
  const devicePixelRatio = useDevicePixelRatio();

  const animation = useContext(AnimationContext.Context);

  const { setAnimationCenter } = useAnimations();
  const { index } = useIndex();

  const centerToUpDisabled = useMemo<boolean>(
    () => !animation || animation.playing,
    [animation],
  );

  const centerToRightDisabled = useMemo<boolean>(
    () => !animation || animation.playing,
    [animation],
  );

  const centerToDownDisabled = useMemo<boolean>(
    () => !animation || animation.playing,
    [animation],
  );

  const centerToLeftDisabled = useMemo<boolean>(
    () => !animation || animation.playing,
    [animation],
  );

  const centerToUpOnClick = useCallback<Func>(() => {
    if (centerToUpDisabled) return;
    if (!animation?.id) return;

    setAnimationCenter(animation.id, index, (center) => ({
      offsetX: center.offsetX,
      offsetY: center.offsetY + devicePixelRatio,
    }));
  }, [
    animation,
    centerToUpDisabled,
    devicePixelRatio,
    index,
    setAnimationCenter,
  ]);

  const centerToRightOnClick = useCallback<Func>(() => {
    if (centerToRightDisabled) return;
    if (!animation?.id) return;

    setAnimationCenter(animation.id, index, (center) => ({
      offsetX: center.offsetX + devicePixelRatio,
      offsetY: center.offsetY,
    }));
  }, [
    animation,
    centerToRightDisabled,
    devicePixelRatio,
    index,
    setAnimationCenter,
  ]);

  const centerToDownOnClick = useCallback<Func>(() => {
    if (centerToDownDisabled) return;
    if (!animation?.id) return;

    setAnimationCenter(animation.id, index, (center) => ({
      offsetX: center.offsetX,
      offsetY: center.offsetY - devicePixelRatio,
    }));
  }, [
    animation,
    centerToDownDisabled,
    devicePixelRatio,
    index,
    setAnimationCenter,
  ]);

  const centerToLeftOnClick = useCallback<Func>(() => {
    if (centerToLeftDisabled) return;
    if (!animation?.id) return;

    setAnimationCenter(animation.id, index, (center) => ({
      offsetX: center.offsetX - devicePixelRatio,
      offsetY: center.offsetY,
    }));
  }, [
    animation,
    centerToLeftDisabled,
    devicePixelRatio,
    index,
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

function useVisibility() {
  const animation = useContext(AnimationContext.Context);

  const { toggleAnimationCenterVisibility } = useAnimations();
  const { index } = useIndex();

  const toggleVisibilityDisabled = useMemo<boolean>(
    () => !animation || animation.playing,
    [animation],
  );

  const centerVisible = useMemo<boolean>(
    () => !!animation?.sprites[index]?.center.visible,
    [animation?.sprites, index],
  );

  const toggleVisibilityOnClick = useCallback<Func>(() => {
    if (toggleVisibilityDisabled) return;
    if (!animation?.id) return;

    toggleAnimationCenterVisibility(animation.id);
  }, [animation, toggleAnimationCenterVisibility, toggleVisibilityDisabled]);

  useKeyDown("v", toggleVisibilityOnClick);

  return { centerVisible, toggleVisibilityDisabled, toggleVisibilityOnClick };
}
