import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useContext, useEffect, useMemo } from "react";

import { AnimationContext } from "#src/fragments";
import { useAnimations, useIndex } from "#src/store";
import { useKeyDown } from "#src/utils";

import type PlayingItemProps from "./PlayingItem.types";

export default function usePlayingItem(props: PlayingItemProps) {
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
  } = usePlaying();

  const {
    fps,
    fpsDisabled,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  } = useFPS();

  return {
    ...props,
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

function usePlaying() {
  const animation = useContext(AnimationContext.Context);

  const { setAnimationIndex, setAnimationPlaying } = useAnimations();
  const { index } = useIndex();

  const toFirstDisabled = useMemo<boolean>(
    () =>
      !animation ||
      (!animation.playing && (animation.sprites.length <= 1 || !index)),
    [animation, index],
  );

  const toFirstOnClick = useCallback<Func>(() => {
    if (toFirstDisabled) return;
    if (!animation?.id) return;

    setAnimationIndex(animation.id, 0);
  }, [animation, setAnimationIndex, toFirstDisabled]);

  const backwardDisabled = useMemo<boolean>(
    () => !animation || (!animation.playing && animation.sprites.length <= 1),
    [animation],
  );

  const backwardOnClick = useCallback<Func>(() => {
    if (backwardDisabled) return;
    if (!animation?.id) return;

    setAnimationIndex(animation.id, (prev) =>
      prev > 0 ? prev - 1 : animation.sprites.length - 1,
    );
  }, [animation, backwardDisabled, setAnimationIndex]);

  const playingDisabled = useMemo<boolean>(
    () => !animation || (!animation.playing && animation.sprites.length <= 1),
    [animation],
  );

  const playOnClick = useCallback<Func>(() => {
    if (playingDisabled) return;
    if (!animation?.id) return;

    setAnimationPlaying(animation.id, (prev) => !prev);
  }, [animation, playingDisabled, setAnimationPlaying]);

  const forwardDisabled = useMemo<boolean>(
    () => !animation || (!animation.playing && animation.sprites.length <= 1),
    [animation],
  );

  const forwardOnClick = useCallback<Func>(() => {
    if (forwardDisabled) return;
    if (!animation?.id) return;

    setAnimationIndex(animation.id, (prev) =>
      prev < animation.sprites.length - 1 ? prev + 1 : 0,
    );
  }, [animation, forwardDisabled, setAnimationIndex]);

  const toLastDisabled = useMemo<boolean>(
    () =>
      !animation ||
      (!animation.playing &&
        (animation.sprites.length <= 1 ||
          index === animation.sprites.length - 1)),
    [animation, index],
  );

  const toLastOnClick = useCallback<Func>(() => {
    if (toLastDisabled) return;
    if (!animation?.id) return;

    setAnimationIndex(animation.id, animation.sprites.length - 1);
  }, [animation, setAnimationIndex, toLastDisabled]);

  useEffect(() => {
    if (playingDisabled) return;
    if (!animation?.id) return;

    setAnimationPlaying(animation.id, true);
  }, [animation?.id, playingDisabled, setAnimationPlaying]);

  useKeyDown(" ", playOnClick);
  useKeyDown("ArrowLeft", backwardOnClick);
  useKeyDown("ArrowRight", forwardOnClick);

  return {
    backwardDisabled,
    backwardOnClick,
    forwardDisabled,
    forwardOnClick,
    playing: !!animation?.playing,
    playingDisabled,
    playOnClick,
    toFirstDisabled,
    toFirstOnClick,
    toLastDisabled,
    toLastOnClick,
  };
}

function useFPS() {
  const animation = useContext(AnimationContext.Context);

  const { setAnimationFPS } = useAnimations();

  const minusFPSDisabled = useMemo<boolean>(
    () => !animation || animation.fps <= 1 || animation.sprites.length <= 1,
    [animation],
  );

  const minusFPSOnClick = useCallback<Func>(() => {
    if (minusFPSDisabled) return;
    if (!animation?.id) return;

    setAnimationFPS(animation.id, (fps) => fps - 1);
  }, [animation, minusFPSDisabled, setAnimationFPS]);

  const fpsDisabled = useMemo<boolean>(
    () => !animation || animation.sprites.length <= 1,
    [animation],
  );

  const fpsOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (fpsDisabled) return;
      if (!animation?.id) return;

      setAnimationFPS(animation.id, event.target.valueAsNumber);
    },
    [animation, fpsDisabled, setAnimationFPS],
  );

  const plusFPSDisabled = useMemo<boolean>(
    () => !animation || animation.sprites.length <= 1,
    [animation],
  );

  const plusFPSOnClick = useCallback<Func>(() => {
    if (plusFPSDisabled) return;
    if (!animation?.id) return;

    setAnimationFPS(animation.id, (fps) => fps + 1);
  }, [animation, plusFPSDisabled, setAnimationFPS]);

  useKeyDown("-", minusFPSOnClick);
  useKeyDown("+", plusFPSOnClick);

  return {
    fps: animation?.fps || 0,
    fpsDisabled,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  };
}
