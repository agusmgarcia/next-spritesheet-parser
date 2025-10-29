import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useEffect, useMemo } from "react";

import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

import type PlayingItemProps from "./PlayingItem.types";

export default function usePlayingItem({
  animation: animationFromProps,
  index: indexFromProps,
  onFirstIndex: onFirstIndexFromProps,
  onLastIndex: onLastIndexFromProps,
  onNextIndex: onNextIndexFromProps,
  onPreviousIndex: onPreviousIndexFromProps,
  ...rest
}: PlayingItemProps) {
  const {
    backwardDisabled,
    backwardOnClick,
    forwardDisabled,
    forwardOnClick,
    playing,
    playingDisabled,
    playOnClick,
    toFirstDisabled,
    toFirstOnClick,
    toLastDisabled,
    toLastOnClick,
  } = usePlaying({
    animation: animationFromProps,
    index: indexFromProps,
    onFirstIndex: onFirstIndexFromProps,
    onLastIndex: onLastIndexFromProps,
    onNextIndex: onNextIndexFromProps,
    onPreviousIndex: onPreviousIndexFromProps,
  });

  const {
    fps,
    fpsDisabled,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  } = useFPS({ animation: animationFromProps });

  return {
    ...rest,
    backwardDisabled,
    backwardOnClick,
    forwardDisabled,
    forwardOnClick,
    fps,
    fpsDisabled,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    playing,
    playingDisabled,
    playOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
    toFirstDisabled,
    toFirstOnClick,
    toLastDisabled,
    toLastOnClick,
  };
}

function usePlaying({
  animation: animationFromProps,
  index: indexFromProps,
  onFirstIndex: onFirstIndexFromProps,
  onLastIndex: onLastIndexFromProps,
  onNextIndex: onNextIndexFromProps,
  onPreviousIndex: onPreviousIndexFromProps,
}: Pick<
  PlayingItemProps,
  | "animation"
  | "index"
  | "onFirstIndex"
  | "onLastIndex"
  | "onNextIndex"
  | "onPreviousIndex"
>) {
  const { setAnimationPlaying } = useAnimations();

  const toFirstDisabled = useMemo<boolean>(
    () =>
      !animationFromProps.playing &&
      (animationFromProps.sprites.length <= 1 || !indexFromProps),
    [
      animationFromProps.playing,
      animationFromProps.sprites.length,
      indexFromProps,
    ],
  );

  const toFirstOnClick = useCallback<Func>(() => {
    if (toFirstDisabled) return;
    setAnimationPlaying(animationFromProps.id, false);
    onFirstIndexFromProps();
  }, [
    animationFromProps.id,
    onFirstIndexFromProps,
    setAnimationPlaying,
    toFirstDisabled,
  ]);

  const backwardDisabled = useMemo<boolean>(
    () => !animationFromProps.playing && animationFromProps.sprites.length <= 1,
    [animationFromProps.playing, animationFromProps.sprites.length],
  );

  const backwardOnClick = useCallback<Func>(() => {
    if (backwardDisabled) return;
    setAnimationPlaying(animationFromProps.id, false);
    onPreviousIndexFromProps();
  }, [
    animationFromProps.id,
    backwardDisabled,
    onPreviousIndexFromProps,
    setAnimationPlaying,
  ]);

  const playingDisabled = useMemo<boolean>(
    () => !animationFromProps.playing && animationFromProps.sprites.length <= 1,
    [animationFromProps.playing, animationFromProps.sprites.length],
  );

  const playOnClick = useCallback<Func>(() => {
    if (playingDisabled) return;
    setAnimationPlaying(animationFromProps.id, (prev) => !prev);
  }, [animationFromProps.id, playingDisabled, setAnimationPlaying]);

  const forwardDisabled = useMemo<boolean>(
    () => !animationFromProps.playing && animationFromProps.sprites.length <= 1,
    [animationFromProps.playing, animationFromProps.sprites.length],
  );

  const forwardOnClick = useCallback<Func>(() => {
    if (forwardDisabled) return;
    setAnimationPlaying(animationFromProps.id, false);
    onNextIndexFromProps();
  }, [
    animationFromProps.id,
    forwardDisabled,
    onNextIndexFromProps,
    setAnimationPlaying,
  ]);

  const toLastDisabled = useMemo<boolean>(
    () =>
      !animationFromProps.playing &&
      (animationFromProps.sprites.length <= 1 ||
        indexFromProps === animationFromProps.sprites.length - 1),
    [
      animationFromProps.playing,
      animationFromProps.sprites.length,
      indexFromProps,
    ],
  );

  const toLastOnClick = useCallback<Func>(() => {
    if (toLastDisabled) return;
    setAnimationPlaying(animationFromProps.id, false);
    onLastIndexFromProps();
  }, [
    animationFromProps.id,
    onLastIndexFromProps,
    setAnimationPlaying,
    toLastDisabled,
  ]);

  useEffect(() => {
    if (!animationFromProps.playing) return;
    if (forwardDisabled) return;

    const handler = setInterval(
      onNextIndexFromProps,
      1000 / animationFromProps.fps,
    );

    return () => clearInterval(handler);
  }, [
    animationFromProps.fps,
    animationFromProps.playing,
    forwardDisabled,
    onNextIndexFromProps,
  ]);

  useEffect(() => {
    if (playingDisabled) return;
    setAnimationPlaying(animationFromProps.id, true);
  }, [animationFromProps.id, playingDisabled, setAnimationPlaying]);

  useKeyDown(" ", playOnClick);
  useKeyDown("ArrowLeft", backwardOnClick);
  useKeyDown("ArrowRight", forwardOnClick);

  return {
    backwardDisabled,
    backwardOnClick,
    forwardDisabled,
    forwardOnClick,
    playing: animationFromProps.playing,
    playingDisabled,
    playOnClick,
    toFirstDisabled,
    toFirstOnClick,
    toLastDisabled,
    toLastOnClick,
  };
}

function useFPS({
  animation: animationFromProps,
}: Pick<PlayingItemProps, "animation">) {
  const { setAnimationFPS } = useAnimations();

  const minusFPSDisabled = useMemo<boolean>(
    () => animationFromProps.fps <= 1 || animationFromProps.sprites.length <= 1,
    [animationFromProps.fps, animationFromProps.sprites.length],
  );

  const minusFPSOnClick = useCallback<Func>(() => {
    if (minusFPSDisabled) return;
    setAnimationFPS(animationFromProps.id, (fps) => fps - 1);
  }, [animationFromProps.id, minusFPSDisabled, setAnimationFPS]);

  const fpsDisabled = useMemo<boolean>(
    () => animationFromProps.sprites.length <= 1,
    [animationFromProps.sprites.length],
  );

  const fpsOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (fpsDisabled) return;
      setAnimationFPS(animationFromProps.id, event.target.valueAsNumber);
    },
    [animationFromProps.id, fpsDisabled, setAnimationFPS],
  );

  const plusFPSDisabled = useMemo<boolean>(
    () => animationFromProps.sprites.length <= 1,
    [animationFromProps.sprites.length],
  );

  const plusFPSOnClick = useCallback<Func>(() => {
    if (plusFPSDisabled) return;
    setAnimationFPS(animationFromProps.id, (fps) => fps + 1);
  }, [animationFromProps.id, plusFPSDisabled, setAnimationFPS]);

  useKeyDown("-", minusFPSOnClick);
  useKeyDown("+", plusFPSOnClick);

  return {
    fps: animationFromProps.fps,
    fpsDisabled,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  };
}
