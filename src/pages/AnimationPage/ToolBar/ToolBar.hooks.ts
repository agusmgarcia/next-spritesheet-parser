import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAnimations } from "#src/store";
import { useViewport } from "#src/utils";

import type ToolBarProps from "./ToolBar.types";

export default function useToolBar({
  animation,
  onIndexChange,
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
  } = useScaling({ animation });

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
  const { setAnimationName } = useAnimations();

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
  const [playing, setPlaying] = useState(animation.sprites.length > 1);

  const playingDisabled = useMemo(
    () => animation.sprites.length <= 1,
    [animation.sprites.length],
  );

  const backwardOnClick = useCallback(() => {
    const animationLength = animation.sprites.length;
    setPlaying(false);
    onIndexChange((prev) => (prev > 0 ? prev - 1 : animationLength - 1));
  }, [animation.sprites.length, onIndexChange]);

  const playOnClick = useCallback(() => setPlaying((prev) => !prev), []);

  const forwardOnClick = useCallback(() => {
    const animationLength = animation.sprites.length;
    setPlaying(false);
    onIndexChange((prev) => (prev < animationLength - 1 ? prev + 1 : 0));
  }, [animation.sprites.length, onIndexChange]);

  useEffect(() => {
    setPlaying(animation.sprites.length > 1);
  }, [animation.sprites.length]);

  useEffect(() => {
    if (!playing) return;

    const animationLength = animation.sprites.length;
    const handler = setInterval(
      () =>
        onIndexChange((prev) => (prev < animationLength - 1 ? prev + 1 : 0)),
      1000 / animation.fps,
    );

    return () => clearInterval(handler);
  }, [animation.fps, animation.sprites.length, onIndexChange, playing]);

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

function useScaling({ animation }: Pick<ToolBarProps, "animation">) {
  const { setAnimationScale } = useAnimations();

  const zoomOutDisabled = useMemo(
    () => animation.scale <= 1,
    [animation.scale],
  );

  const zoomOutOnClick = useCallback(
    () =>
      setAnimationScale(
        animation.id,
        (prev) => prev - window.devicePixelRatio / 5,
      ),
    [animation.id, setAnimationScale],
  );

  const zoomInDisabled = useMemo(() => false, []);

  const zoomInOnClick = useCallback(
    () =>
      setAnimationScale(
        animation.id,
        (prev) => prev + window.devicePixelRatio / 5,
      ),
    [animation.id, setAnimationScale],
  );

  const resetDisabled = useMemo(() => false, []);

  const resetOnClick = useCallback(
    () => setAnimationScale(animation.id, window.devicePixelRatio),
    [animation.id, setAnimationScale],
  );

  useEffect(() => {
    resetOnClick();
  }, [resetOnClick]);

  return {
    resetDisabled,
    resetOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}
