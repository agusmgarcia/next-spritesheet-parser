import { type Func } from "@agusmgarcia/react-core";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type Animations, useAnimations } from "#src/store";

import type AnimationPageProps from "./AnimationPage.types";

export default function useAnimationPage(props: AnimationPageProps) {
  const { animation } = useAnimation();

  const { index, onIndexChange } = useIndex();

  const {
    backwardOnClick,
    forwardOnClick,
    playing,
    playingDisabled,
    playOnClick,
  } = usePlaying({ animation, onIndexChange });

  const { onionActive, onionDisabled, onionOnClick } = useOnion({ playing });

  return {
    ...props,
    animation,
    backwardOnClick,
    forwardOnClick,
    index,
    onionActive,
    onionDisabled,
    onionOnClick,
    playing,
    playingDisabled,
    playOnClick,
  };
}

function useAnimation() {
  const params = useParams();
  const { replace } = useRouter();

  const { animations } = useAnimations();

  const animation = useMemo<Animations[number] | undefined>(
    () => animations.find((a) => a.id === params?.id),
    [animations, params?.id],
  );

  useEffect(() => {
    if (!params) return;
    if (!!animation) return;
    replace("/");
  }, [animation, params, replace]);

  return { animation };
}

function useIndex() {
  const [index, setIndex] = useState(0);

  return { index, onIndexChange: setIndex };
}

function useOnion({
  playing: playingFromProps,
}: Pick<ReturnType<typeof usePlaying>, "playing">) {
  const [onionActive, setOnionActive] = useState(false);

  const onionDisabled = useMemo<boolean>(
    () => playingFromProps,
    [playingFromProps],
  );

  const onionOnClick = useCallback<Func>(
    () => setOnionActive((prev) => !prev),
    [],
  );

  useEffect(() => {
    if (!playingFromProps) return;
    setOnionActive(false);
  }, [playingFromProps]);

  return { onionActive, onionDisabled, onionOnClick };
}

function usePlaying({
  animation: animationFromProps,
  onIndexChange: onIndexChangeFromProps,
}: Pick<ReturnType<typeof useAnimation>, "animation"> &
  Pick<ReturnType<typeof useIndex>, "onIndexChange">) {
  const [playing, setPlaying] = useState(
    (animationFromProps?.sprites.length || 0) > 1,
  );

  const playingDisabled = useMemo<boolean>(
    () => (animationFromProps?.sprites.length || 0) <= 1,
    [animationFromProps?.sprites.length],
  );

  const backwardOnClick = useCallback<Func>(() => {
    const animationLength = animationFromProps?.sprites.length;
    if (!animationLength) return;

    setPlaying(false);
    onIndexChangeFromProps((prev) =>
      prev > 0 ? prev - 1 : animationLength - 1,
    );
  }, [animationFromProps?.sprites.length, onIndexChangeFromProps]);

  const playOnClick = useCallback<Func>(() => setPlaying((prev) => !prev), []);

  const forwardOnClick = useCallback<Func>(() => {
    const animationLength = animationFromProps?.sprites.length;
    if (!animationLength) return;

    setPlaying(false);
    onIndexChangeFromProps((prev) =>
      prev < animationLength - 1 ? prev + 1 : 0,
    );
  }, [animationFromProps?.sprites.length, onIndexChangeFromProps]);

  useEffect(() => {
    setPlaying((animationFromProps?.sprites.length || 0) > 1);
  }, [animationFromProps?.sprites.length]);

  useEffect(() => {
    if (!playing) return;

    const animationLength = animationFromProps?.sprites.length;
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
    animationFromProps?.fps,
    animationFromProps?.sprites.length,
    onIndexChangeFromProps,
    playing,
  ]);

  return {
    backwardOnClick,
    forwardOnClick,
    playing,
    playingDisabled,
    playOnClick,
  };
}
