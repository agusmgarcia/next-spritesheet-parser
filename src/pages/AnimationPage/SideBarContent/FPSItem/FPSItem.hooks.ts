import { useCallback, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";

import type FPSItemProps from "./FPSItem.types";

export default function useFPSItem({ animation, ...props }: FPSItemProps) {
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
  } = useFPS({ animation });

  return {
    ...props,
    fps,
    fpsOnChange,
    heading,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  };
}

function useFPS({ animation }: Pick<FPSItemProps, "animation">) {
  const { setAnimationFPS } = useAnimations();

  const minusFPSDisabled = useMemo<boolean>(
    () => animation.fps <= 1,
    [animation.fps],
  );

  const minusFPSOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    () => setAnimationFPS(animation.id, (fps) => fps - 1),
    [animation.id, setAnimationFPS],
  );

  const fps = useMemo<number>(() => animation.fps, [animation.fps]);

  const fpsOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationFPS(animation.id, event.target.valueAsNumber),
    [animation.id, setAnimationFPS],
  );

  const plusFPSDisabled = useMemo<boolean>(() => false, []);

  const plusFPSOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    () => setAnimationFPS(animation.id, (fps) => fps + 1),
    [animation.id, setAnimationFPS],
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
