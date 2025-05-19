import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useMemo } from "react";

import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

import type MovementsItemProps from "./MovementsItem.types";

export default function useMovementsItem({
  animation: animationFromProps,
  index: indexFromProps,
  ...rest
}: MovementsItemProps) {
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
  };
}

function useOffset({
  animation: animationFromProps,
  index: indexFromProps,
}: Pick<MovementsItemProps, "animation" | "index">) {
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
    setAnimationOffset(
      animationFromProps.id,
      indexFromProps,
      (offsetX) => offsetX,
      (offsetY) => offsetY - devicePixelRatio,
    );
  }, [
    animationFromProps.id,
    animationOffsetUpDisabled,
    indexFromProps,
    setAnimationOffset,
  ]);

  const animationOffsetRightOnClick = useCallback<Func>(() => {
    if (animationOffsetRightDisabled) return;
    setAnimationOffset(
      animationFromProps.id,
      indexFromProps,
      (offsetX) => offsetX + devicePixelRatio,
      (offsetY) => offsetY,
    );
  }, [
    animationFromProps.id,
    animationOffsetRightDisabled,
    indexFromProps,
    setAnimationOffset,
  ]);

  const animationOffsetDownOnClick = useCallback<Func>(() => {
    if (animationOffsetDownDisabled) return;
    setAnimationOffset(
      animationFromProps.id,
      indexFromProps,
      (offsetX) => offsetX,
      (offsetY) => offsetY + devicePixelRatio,
    );
  }, [
    animationFromProps.id,
    animationOffsetDownDisabled,
    indexFromProps,
    setAnimationOffset,
  ]);

  const animationOffsetLeftOnClick = useCallback<Func>(() => {
    if (animationOffsetLeftDisabled) return;
    setAnimationOffset(
      animationFromProps.id,
      indexFromProps,
      (offsetX) => offsetX - devicePixelRatio,
      (offsetY) => offsetY,
    );
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
