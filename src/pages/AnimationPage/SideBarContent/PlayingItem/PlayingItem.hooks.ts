import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo } from "react";

import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

import type PlayingItemProps from "./PlayingItem.types";

export default function usePlayingItem({
  animation: animationFromProps,
  onNextIndex: onNextIndexFromProps,
  onPreviousIndex: onPreviousIndexFromProps,
  ...rest
}: PlayingItemProps) {
  const {
    backwardOnClick,
    forwardOnClick,
    playing,
    playingDisabled,
    playOnClick,
  } = usePlaying({
    animation: animationFromProps,
    onNextIndex: onNextIndexFromProps,
    onPreviousIndex: onPreviousIndexFromProps,
  });

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
    backwardOnClick,
    forwardOnClick,
    fps,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    playing,
    playingDisabled,
    playOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  };
}

function usePlaying({
  animation: animationFromProps,
  onNextIndex: onNextIndexFromProps,
  onPreviousIndex: onPreviousIndexFromProps,
}: Pick<PlayingItemProps, "animation" | "onNextIndex" | "onPreviousIndex">) {
  const { setAnimationPlaying } = useAnimations();

  const playingDisabled = useMemo<boolean>(
    () => animationFromProps.sprites.length <= 1,
    [animationFromProps.sprites.length],
  );

  const backwardOnClick = useCallback<Func>(() => {
    const animationLength = animationFromProps.sprites.length;
    if (!animationLength) return;

    setAnimationPlaying(animationFromProps.id, false);
    onPreviousIndexFromProps();
  }, [
    animationFromProps.id,
    animationFromProps.sprites.length,
    onPreviousIndexFromProps,
    setAnimationPlaying,
  ]);

  const playOnClick = useCallback<Func>(() => {
    if (playingDisabled) return;
    setAnimationPlaying(animationFromProps.id, (prev) => !prev);
  }, [animationFromProps.id, playingDisabled, setAnimationPlaying]);

  const forwardOnClick = useCallback<Func>(() => {
    const animationLength = animationFromProps.sprites.length;
    if (!animationLength) return;

    setAnimationPlaying(animationFromProps.id, false);
    onNextIndexFromProps();
  }, [
    animationFromProps.id,
    animationFromProps.sprites.length,
    onNextIndexFromProps,
    setAnimationPlaying,
  ]);

  useEffect(() => {
    if (!animationFromProps.playing) return;

    const animationLength = animationFromProps.sprites.length;
    if (!animationLength) return;

    const handler = setInterval(
      onNextIndexFromProps,
      1000 / animationFromProps.fps,
    );

    return () => clearInterval(handler);
  }, [
    animationFromProps.fps,
    animationFromProps.playing,
    animationFromProps.sprites.length,
    onNextIndexFromProps,
  ]);

  useKeyDown(" ", playOnClick);
  useKeyDown("ArrowRight", forwardOnClick);
  useKeyDown("ArrowLeft", backwardOnClick);

  return {
    backwardOnClick,
    forwardOnClick,
    playing: animationFromProps.playing,
    playingDisabled,
    playOnClick,
  };
}

function useFPS({
  animation: animationFromProps,
}: Pick<PlayingItemProps, "animation">) {
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
