import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useMemo } from "react";

import { useAnimation, useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

import type CenterItemProps from "./CenterItem.types";

export default function useCenterItem(props: CenterItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem();

  const { animationColor, setAnimationColor, setAnimationColorDisabled } =
    useAnimationColor();

  const {
    animationGrid,
    disableAnimationGrid,
    disableAnimationGridDisabled,
    enableAnimationGrid,
    enableAnimationGridDisabled,
  } = useAnimationGrid();

  const {
    animationOnion,
    disableAnimationOnion,
    disableAnimationOnionDisabled,
    enableAnimationOnion,
    enableAnimationOnionDisabled,
  } = useAnimationOnion();

  const { resetAnimationCenter, resetAnimationCenterDisabled } =
    useResetAnimationCenter();

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

  const {
    animationCenterVisible,
    disableAnimationCenter,
    disableAnimationCenterDisabled,
    enableAnimationCenter,
    enableAnimationCenterDisabled,
  } = useAnimationCenterVisibility();

  return {
    ...props,
    animationCenterVisible,
    animationColor,
    animationGrid,
    animationOnion,
    defaultCollapsed,
    disableAnimationCenter,
    disableAnimationCenterDisabled,
    disableAnimationGrid,
    disableAnimationGridDisabled,
    disableAnimationOnion,
    disableAnimationOnionDisabled,
    disabled,
    enableAnimationCenter,
    enableAnimationCenterDisabled,
    enableAnimationGrid,
    enableAnimationGridDisabled,
    enableAnimationOnion,
    enableAnimationOnionDisabled,
    resetAnimationCenter,
    resetAnimationCenterDisabled,
    setAnimationColor,
    setAnimationColorDisabled,
  };
}

function useSideBarItem() {
  const { animation } = useAnimation();

  const disabled = useMemo<boolean>(
    () => animation.playing,
    [animation.playing],
  );

  const defaultCollapsed = useMemo<boolean>(() => disabled, [disabled]);

  return { defaultCollapsed, disabled };
}

function useAnimationColor() {
  const { animation, setAnimationColor, setAnimationColorDisabled } =
    useAnimation();

  const colorOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationColor(event.target.value),
    [setAnimationColor],
  );

  return {
    animationColor: animation.color,
    setAnimationColor: colorOnChange,
    setAnimationColorDisabled,
  };
}

function useAnimationGrid() {
  const {
    animation,
    disableAnimationGrid,
    disableAnimationGridDisabled,
    enableAnimationGrid,
    enableAnimationGridDisabled,
  } = useAnimation();

  useKeyDown("g", animation.grid ? disableAnimationGrid : enableAnimationGrid);

  return {
    animationGrid: animation.grid,
    disableAnimationGrid,
    disableAnimationGridDisabled,
    enableAnimationGrid,
    enableAnimationGridDisabled,
  };
}

function useAnimationOnion() {
  const {
    animation,
    disableAnimationOnion,
    disableAnimationOnionDisabled,
    enableAnimationOnion,
    enableAnimationOnionDisabled,
  } = useAnimation();

  useKeyDown(
    "o",
    animation.onion ? disableAnimationOnion : enableAnimationOnion,
  );

  return {
    animationOnion: animation.onion,
    disableAnimationOnion,
    disableAnimationOnionDisabled,
    enableAnimationOnion,
    enableAnimationOnionDisabled,
  };
}

function useResetAnimationCenter() {
  const { resetAnimationCenter, resetAnimationCenterDisabled } = useAnimation();

  useKeyDown("c", resetAnimationCenter);

  return { resetAnimationCenter, resetAnimationCenterDisabled };
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

function useAnimationCenterVisibility() {
  const {
    animation,
    disableAnimationCenter,
    disableAnimationCenterDisabled,
    enableAnimationCenter,
    enableAnimationCenterDisabled,
  } = useAnimation();

  const animationCenterVisible = useMemo<boolean>(
    () => animation.sprites[animation.index].center.visible,
    [animation.index, animation.sprites],
  );

  useKeyDown(
    "v",
    animationCenterVisible ? disableAnimationCenter : enableAnimationCenter,
  );

  return {
    animationCenterVisible,
    disableAnimationCenter,
    disableAnimationCenterDisabled,
    enableAnimationCenter,
    enableAnimationCenterDisabled,
  };
}
