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

  const {
    animationOffsetDownDisabled,
    animationOffsetDownOnClick,
    animationOffsetLeftDisabled,
    animationOffsetLeftOnClick,
    animationOffsetRightDisabled,
    animationOffsetRightOnClick,
    animationOffsetUpDisabled,
    animationOffsetUpOnClick,
  } = useOffset({
    animation: animationFromProps,
    index: indexFromProps,
  });

  return {
    ...rest,
    animationOffsetDownDisabled,
    animationOffsetDownOnClick,
    animationOffsetLeftDisabled,
    animationOffsetLeftOnClick,
    animationOffsetRightDisabled,
    animationOffsetRightOnClick,
    animationOffsetUpDisabled,
    animationOffsetUpOnClick,
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
  const { resetAnimationOffset } = useAnimations();

  const resetCenterDisabled = useMemo<boolean>(
    () =>
      animationFromProps.playing ||
      !animationFromProps.sprites ||
      (animationFromProps.sprites[indexFromProps].offset.x ===
        animationFromProps.sprites[indexFromProps].offset.initialX &&
        animationFromProps.sprites[indexFromProps].offset.y ===
          animationFromProps.sprites[indexFromProps].offset.initialY),
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

function useOffset({
  animation: animationFromProps,
  index: indexFromProps,
}: Pick<CenterItemProps, "animation" | "index">) {
  const { setAnimationOffset } = useAnimations();

  const animationOffsetUpDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const animationOffsetRightDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const animationOffsetDownDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const animationOffsetLeftDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const animationOffsetUpOnClick = useCallback<Func>(() => {
    if (animationOffsetUpDisabled) return;
    setAnimationOffset(animationFromProps.id, indexFromProps, (offset) => ({
      x: offset.x,
      y: offset.y - devicePixelRatio,
    }));
  }, [
    animationFromProps.id,
    animationOffsetUpDisabled,
    indexFromProps,
    setAnimationOffset,
  ]);

  const animationOffsetRightOnClick = useCallback<Func>(() => {
    if (animationOffsetRightDisabled) return;
    setAnimationOffset(animationFromProps.id, indexFromProps, (offset) => ({
      x: offset.x + devicePixelRatio,
      y: offset.y,
    }));
  }, [
    animationFromProps.id,
    animationOffsetRightDisabled,
    indexFromProps,
    setAnimationOffset,
  ]);

  const animationOffsetDownOnClick = useCallback<Func>(() => {
    if (animationOffsetDownDisabled) return;
    setAnimationOffset(animationFromProps.id, indexFromProps, (offset) => ({
      x: offset.x,
      y: offset.y + devicePixelRatio,
    }));
  }, [
    animationFromProps.id,
    animationOffsetDownDisabled,
    indexFromProps,
    setAnimationOffset,
  ]);

  const animationOffsetLeftOnClick = useCallback<Func>(() => {
    if (animationOffsetLeftDisabled) return;
    setAnimationOffset(animationFromProps.id, indexFromProps, (offset) => ({
      x: offset.x - devicePixelRatio,
      y: offset.y,
    }));
  }, [
    animationFromProps.id,
    animationOffsetLeftDisabled,
    indexFromProps,
    setAnimationOffset,
  ]);

  useKeyDown("ArrowUp", animationOffsetUpOnClick, { altKey: true });
  useKeyDown("ArrowRight", animationOffsetRightOnClick, { altKey: true });
  useKeyDown("ArrowDown", animationOffsetDownOnClick, { altKey: true });
  useKeyDown("ArrowLeft", animationOffsetLeftOnClick, { altKey: true });

  return {
    animationOffsetDownDisabled,
    animationOffsetDownOnClick,
    animationOffsetLeftDisabled,
    animationOffsetLeftOnClick,
    animationOffsetRightDisabled,
    animationOffsetRightOnClick,
    animationOffsetUpDisabled,
    animationOffsetUpOnClick,
  };
}
