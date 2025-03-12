import { useCallback, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";

import type FPSItemProps from "./FPSItem.types";

export default function useFPSItem({
  animation: animationFromProps,
  ...rest
}: FPSItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "FPS", variant: "h2" }),
    [],
  );

  const {
    fps,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  } = useFPS({ animation: animationFromProps });

  return {
    ...rest,
    fps,
    fpsOnChange,
    heading,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  };
}

function useFPS({
  animation: animationFromProps,
}: Pick<FPSItemProps, "animation">) {
  const { setAnimationFPS } = useAnimations();

  const minusFPSDisabled = useMemo<boolean>(
    () => animationFromProps.fps <= 1,
    [animationFromProps.fps],
  );

  const minusFPSOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    () => setAnimationFPS(animationFromProps.id, (fps) => fps - 1),
    [animationFromProps.id, setAnimationFPS],
  );

  const fps = useMemo<number>(
    () => animationFromProps.fps,
    [animationFromProps.fps],
  );

  const fpsOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) =>
      setAnimationFPS(animationFromProps.id, event.target.valueAsNumber),
    [animationFromProps.id, setAnimationFPS],
  );

  const plusFPSDisabled = useMemo<boolean>(() => false, []);

  const plusFPSOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    () => setAnimationFPS(animationFromProps.id, (fps) => fps + 1),
    [animationFromProps.id, setAnimationFPS],
  );

  return {
    fps,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  };
}
