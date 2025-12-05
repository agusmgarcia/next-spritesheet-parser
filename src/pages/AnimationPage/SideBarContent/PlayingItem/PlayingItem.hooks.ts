import { useCallback } from "react";

import { useAnimation } from "#src/store";
import { useKeyDown } from "#src/utils";

import type PlayingItemProps from "./PlayingItem.types";

export default function usePlayingItem(props: PlayingItemProps) {
  const {
    animationPlaying,
    backwardAnimationIndex,
    backwardAnimationIndexDisabled,
    forwardAnimationIndex,
    forwardAnimationIndexDisabled,
    resumeAnimation,
    resumeAnimationDisabled,
    stopAnimation,
    stopAnimationDisabled,
    toFirstAnimationIndex,
    toFirstAnimationIndexDisabled,
    toLastAnimationIndex,
    toLastAnimationIndexDisabled,
  } = useAnimationPlaying();

  const {
    animationFPS,
    minusAnimationFPS,
    minusAnimationFPSDisabled,
    plusAnimationFPS,
    plusAnimationFPSDisabled,
    setAnimationFPS,
    setAnimationFPSDisabled,
  } = useAnimationFPS();

  return {
    ...props,
    animationFPS,
    animationPlaying,
    backwardAnimationIndex,
    backwardAnimationIndexDisabled,
    forwardAnimationIndex,
    forwardAnimationIndexDisabled,
    minusAnimationFPS,
    minusAnimationFPSDisabled,
    plusAnimationFPS,
    plusAnimationFPSDisabled,
    resumeAnimation,
    resumeAnimationDisabled,
    setAnimationFPS,
    setAnimationFPSDisabled,
    stopAnimation,
    stopAnimationDisabled,
    toFirstAnimationIndex,
    toFirstAnimationIndexDisabled,
    toLastAnimationIndex,
    toLastAnimationIndexDisabled,
  };
}

function useAnimationPlaying() {
  const {
    animation,
    backwardAnimationIndex,
    backwardAnimationIndexDisabled,
    forwardAnimationIndex,
    forwardAnimationIndexDisabled,
    resumeAnimation,
    resumeAnimationDisabled,
    stopAnimation,
    stopAnimationDisabled,
    toFirstAnimationIndex,
    toFirstAnimationIndexDisabled,
    toLastAnimationIndex,
    toLastAnimationIndexDisabled,
  } = useAnimation();

  useKeyDown(" ", animation.playing ? stopAnimation : resumeAnimation);
  useKeyDown("ArrowLeft", backwardAnimationIndex);
  useKeyDown("ArrowRight", forwardAnimationIndex);

  return {
    animationPlaying: animation.playing,
    backwardAnimationIndex,
    backwardAnimationIndexDisabled,
    forwardAnimationIndex,
    forwardAnimationIndexDisabled,
    resumeAnimation,
    resumeAnimationDisabled,
    stopAnimation,
    stopAnimationDisabled,
    toFirstAnimationIndex,
    toFirstAnimationIndexDisabled,
    toLastAnimationIndex,
    toLastAnimationIndexDisabled,
  };
}

function useAnimationFPS() {
  const {
    animation,
    minusAnimationFPS,
    minusAnimationFPSDisabled,
    plusAnimationFPS,
    plusAnimationFPSDisabled,
    setAnimationFPS,
    setAnimationFPSDisabled,
  } = useAnimation();

  const setAnimationFPSOnChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => setAnimationFPS(event.target.valueAsNumber), [setAnimationFPS]);

  useKeyDown("-", minusAnimationFPS);
  useKeyDown("+", plusAnimationFPS);

  return {
    animationFPS: animation.fps,
    minusAnimationFPS,
    minusAnimationFPSDisabled,
    plusAnimationFPS,
    plusAnimationFPSDisabled,
    setAnimationFPS: setAnimationFPSOnChange,
    setAnimationFPSDisabled,
  };
}
