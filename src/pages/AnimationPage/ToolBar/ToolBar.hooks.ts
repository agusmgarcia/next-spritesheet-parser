import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useSpriteSheet } from "#src/store";
import { useViewport } from "#src/utils";

import type ToolBarProps from "./ToolBar.types";

export default function useToolBar({
  animation,
  onIndexChange,
  onScaleChange,
  scale,
  ...props
}: ToolBarProps) {
  const viewport = useViewport();
  const { replace } = useRouter();

  const { name, nameOnChange } = useName({ animation });

  const homeOnClick = useCallback(() => replace("/"), [replace]);

  const {
    backwardOnClick,
    forwardOnClick,
    playing,
    playingDisabled,
    playOnClick,
  } = usePlaying({ animation, onIndexChange });

  const {
    resetDisabled,
    resetOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  } = useScaling({ onScaleChange, scale });

  return {
    ...props,
    backwardOnClick,
    forwardOnClick,
    homeOnClick,
    name,
    nameOnChange,
    playing,
    playingDisabled,
    playOnClick,
    resetDisabled,
    resetOnClick,
    viewport,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}

function useName({ animation }: Pick<ToolBarProps, "animation">) {
  const { setAnimationName } = useSpriteSheet();

  const nameOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationName(animation.id, event.target.value),
    [animation.id, setAnimationName],
  );

  return { name: animation.name, nameOnChange };
}

function usePlaying({
  animation,
  onIndexChange,
}: Pick<ToolBarProps, "animation" | "onIndexChange">) {
  const [playing, setPlaying] = useState(animation.indices.length > 1);

  const playingDisabled = useMemo(
    () => animation.indices.length <= 1,
    [animation.indices.length],
  );

  const backwardOnClick = useCallback(() => {
    const animationLength = animation.indices.length;
    setPlaying(false);
    onIndexChange((prev) => (prev > 0 ? prev - 1 : animationLength - 1));
  }, [animation.indices.length, onIndexChange]);

  const playOnClick = useCallback(() => setPlaying((prev) => !prev), []);

  const forwardOnClick = useCallback(() => {
    const animationLength = animation.indices.length;
    setPlaying(false);
    onIndexChange((prev) => (prev < animationLength - 1 ? prev + 1 : 0));
  }, [animation.indices.length, onIndexChange]);

  useEffect(() => {
    setPlaying(animation.indices.length > 1);
  }, [animation.indices.length]);

  useEffect(() => {
    if (!playing) return;

    const animationLength = animation.indices.length;
    const handler = setInterval(
      () =>
        onIndexChange((prev) => (prev < animationLength - 1 ? prev + 1 : 0)),
      1000 / animation.fps,
    );

    return () => clearInterval(handler);
  }, [animation.fps, animation.indices.length, onIndexChange, playing]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case " ":
          playOnClick();
          return;

        case "arrowRight":
          forwardOnClick();
          return;

        case "arrowLeft":
          backwardOnClick();
          return;
      }
    };

    window.addEventListener("keyup", handleKey);
    return () => window.removeEventListener("keyup", handleKey);
  }, [backwardOnClick, forwardOnClick, onIndexChange, playOnClick]);

  return {
    backwardOnClick,
    forwardOnClick,
    playing,
    playingDisabled,
    playOnClick,
  };
}

function useScaling({
  onScaleChange,
  scale,
}: Pick<ToolBarProps, "onScaleChange" | "scale">) {
  const zoomOutDisabled = useMemo(() => scale <= 1, [scale]);

  const zoomOutOnClick = useCallback(
    () => onScaleChange((prev) => prev - 0.2),
    [onScaleChange],
  );

  const zoomInDisabled = useMemo(() => false, []);

  const zoomInOnClick = useCallback(
    () => onScaleChange((prev) => prev + 0.2),
    [onScaleChange],
  );

  const resetDisabled = useMemo(() => false, []);

  const resetOnClick = useCallback(() => onScaleChange(1), [onScaleChange]);

  return {
    resetDisabled,
    resetOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}
