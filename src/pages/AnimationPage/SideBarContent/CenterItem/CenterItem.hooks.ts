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

  const {} = useOffset({
    animation: animationFromProps,
    index: indexFromProps,
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

function useOffset({
  animation: animationFromProps,
  index: indexFromProps,
}: Pick<CenterItemProps, "animation" | "index">) {
  const { setAnimationOffset } = useAnimations();

  const animationOffsetUpOnClick = useCallback<Func>(() => {
    if (animationFromProps.playing) return;
    setAnimationOffset(
      animationFromProps.id,
      indexFromProps,
      (offsetX) => offsetX,
      (offsetY) => offsetY - devicePixelRatio,
    );
  }, [
    animationFromProps.id,
    animationFromProps.playing,
    indexFromProps,
    setAnimationOffset,
  ]);

  const animationOffsetRightOnClick = useCallback<Func>(() => {
    if (animationFromProps.playing) return;
    setAnimationOffset(
      animationFromProps.id,
      indexFromProps,
      (offsetX) => offsetX + devicePixelRatio,
      (offsetY) => offsetY,
    );
  }, [
    animationFromProps.id,
    animationFromProps.playing,
    indexFromProps,
    setAnimationOffset,
  ]);

  const animationOffsetDownOnClick = useCallback<Func>(() => {
    if (animationFromProps.playing) return;
    setAnimationOffset(
      animationFromProps.id,
      indexFromProps,
      (offsetX) => offsetX,
      (offsetY) => offsetY + devicePixelRatio,
    );
  }, [
    animationFromProps.id,
    animationFromProps.playing,
    indexFromProps,
    setAnimationOffset,
  ]);

  const animationOffsetLeftOnClick = useCallback<Func>(() => {
    if (animationFromProps.playing) return;
    setAnimationOffset(
      animationFromProps.id,
      indexFromProps,
      (offsetX) => offsetX - devicePixelRatio,
      (offsetY) => offsetY,
    );
  }, [
    animationFromProps.id,
    animationFromProps.playing,
    indexFromProps,
    setAnimationOffset,
  ]);

  useKeyDown("ArrowUp", animationOffsetUpOnClick, { altKey: true });
  useKeyDown("ArrowRight", animationOffsetRightOnClick, { altKey: true });
  useKeyDown("ArrowDown", animationOffsetDownOnClick, { altKey: true });
  useKeyDown("ArrowLeft", animationOffsetLeftOnClick, { altKey: true });

  return {};
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
