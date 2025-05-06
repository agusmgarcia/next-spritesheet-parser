import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

import type PlayingItemProps from "./PlayingItem.types";

export default function usePlayingItem({
  animation: animationFromProps,
  onIndexChange: onIndexChangeFromProps,
  ...rest
}: PlayingItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Playing", variant: "h2" }),
    [],
  );

  const {
    backwardOnClick,
    forwardOnClick,
    playing,
    playingDisabled,
    playOnClick,
  } = usePlaying({
    animation: animationFromProps,
    onIndexChange: onIndexChangeFromProps,
  });

  return {
    ...rest,
    backwardOnClick,
    forwardOnClick,
    heading,
    playing,
    playingDisabled,
    playOnClick,
  };
}

function usePlaying({
  animation: animationFromProps,
  onIndexChange: onIndexChangeFromProps,
}: Pick<PlayingItemProps, "animation" | "onIndexChange">) {
  const { setAnimationPlaying } = useAnimations();

  const playingDisabled = useMemo<boolean>(
    () => animationFromProps.sprites.length <= 1,
    [animationFromProps.sprites.length],
  );

  const backwardOnClick = useCallback<Func>(() => {
    const animationLength = animationFromProps.sprites.length;
    if (!animationLength) return;

    setAnimationPlaying(animationFromProps.id, false);
    onIndexChangeFromProps((prev) =>
      prev > 0 ? prev - 1 : animationLength - 1,
    );
  }, [
    animationFromProps.id,
    animationFromProps.sprites.length,
    onIndexChangeFromProps,
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
    onIndexChangeFromProps((prev) =>
      prev < animationLength - 1 ? prev + 1 : 0,
    );
  }, [
    animationFromProps.id,
    animationFromProps.sprites.length,
    onIndexChangeFromProps,
    setAnimationPlaying,
  ]);

  useEffect(() => {
    if (!animationFromProps.playing) return;

    const animationLength = animationFromProps.sprites.length;
    if (!animationLength) return;

    const handler = setInterval(
      () =>
        onIndexChangeFromProps((prev) =>
          prev < animationLength - 1 ? prev + 1 : 0,
        ),
      1000 / animationFromProps.fps,
    );

    return () => clearInterval(handler);
  }, [
    animationFromProps.fps,
    animationFromProps.playing,
    animationFromProps.sprites.length,
    onIndexChangeFromProps,
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
