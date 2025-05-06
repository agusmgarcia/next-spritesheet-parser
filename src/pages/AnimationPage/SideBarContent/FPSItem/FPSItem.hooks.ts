import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

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

  const minusFPSOnClick = useCallback<Func>(() => {
    if (minusFPSDisabled) return;
    setAnimationFPS(animationFromProps.id, (fps) => fps - 1);
  }, [animationFromProps.id, minusFPSDisabled, setAnimationFPS]);

  const fpsOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) =>
      setAnimationFPS(animationFromProps.id, event.target.valueAsNumber),
    [animationFromProps.id, setAnimationFPS],
  );

  const plusFPSDisabled = useMemo<boolean>(() => false, []);

  const plusFPSOnClick = useCallback<Func>(() => {
    if (plusFPSDisabled) return;
    setAnimationFPS(animationFromProps.id, (fps) => fps + 1);
  }, [animationFromProps.id, plusFPSDisabled, setAnimationFPS]);

  useKeyDown("-", minusFPSOnClick);

  useKeyDown("+", plusFPSOnClick);

  return {
    fps: animationFromProps.fps,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  };
}
