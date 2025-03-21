import { type Func, useDevicePixelRatio } from "@agusmgarcia/react-core";
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

  const {
    fps,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  } = useFPS({ animation });

  const { onionActive, onionDisabled, onionOnClick } = useOnion({ playing });

  const {
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  } = useZoom({ animation });

  const { resetCenterDisabled, resetCenterOnClick } = useResetCenter({
    animation,
    index,
    playing,
  });

  return {
    ...props,
    animation,
    backwardOnClick,
    forwardOnClick,
    fps,
    fpsOnChange,
    index,
    minusFPSDisabled,
    minusFPSOnClick,
    onionActive,
    onionDisabled,
    onionOnClick,
    playing,
    playingDisabled,
    playOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
    resetCenterDisabled,
    resetCenterOnClick,
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
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

function useFPS({
  animation: animationFromProps,
}: Pick<ReturnType<typeof useAnimation>, "animation">) {
  const { setAnimationFPS } = useAnimations();

  const minusFPSDisabled = useMemo<boolean>(
    () => (animationFromProps?.fps || 0) <= 1,
    [animationFromProps?.fps],
  );

  const minusFPSOnClick = useCallback<Func>(
    () => setAnimationFPS(animationFromProps?.id || "", (fps) => fps - 1),
    [animationFromProps?.id, setAnimationFPS],
  );

  const fps = useMemo<number>(
    () => animationFromProps?.fps || 0,
    [animationFromProps?.fps],
  );

  const fpsOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) =>
      setAnimationFPS(animationFromProps?.id || "", event.target.valueAsNumber),
    [animationFromProps?.id, setAnimationFPS],
  );

  const plusFPSDisabled = useMemo<boolean>(() => false, []);

  const plusFPSOnClick = useCallback<Func>(
    () => setAnimationFPS(animationFromProps?.id || "", (fps) => fps + 1),
    [animationFromProps?.id, setAnimationFPS],
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

function useZoom({
  animation: animationFromProps,
}: Pick<ReturnType<typeof useAnimation>, "animation">) {
  const devicePixelRatio = useDevicePixelRatio();

  const { setAnimationScale } = useAnimations();

  const zoomOutDisabled = useMemo<boolean>(
    () => (animationFromProps?.scale || 0) <= devicePixelRatio,
    [animationFromProps?.scale, devicePixelRatio],
  );

  const zoomOutOnClick = useCallback<Func>(
    () =>
      setAnimationScale(
        animationFromProps?.id || "",
        (prev) => prev - devicePixelRatio / 5,
      ),
    [animationFromProps?.id, devicePixelRatio, setAnimationScale],
  );

  const zoomInDisabled = useMemo<boolean>(
    () => !animationFromProps,
    [animationFromProps],
  );

  const zoomInOnClick = useCallback<Func>(
    () =>
      setAnimationScale(
        animationFromProps?.id || "",
        (prev) => prev + devicePixelRatio / 5,
      ),
    [animationFromProps?.id, devicePixelRatio, setAnimationScale],
  );

  const resetZoomDisabled = useMemo<boolean>(
    () => (animationFromProps?.scale || 0) <= devicePixelRatio,
    [animationFromProps?.scale, devicePixelRatio],
  );

  const resetZoomOnClick = useCallback<Func>(
    () => setAnimationScale(animationFromProps?.id || "", devicePixelRatio),
    [animationFromProps?.id, devicePixelRatio, setAnimationScale],
  );

  useEffect(() => {
    if (!animationFromProps?.id) return;

    setAnimationScale(animationFromProps.id, (prev) =>
      prev >= devicePixelRatio ? prev : devicePixelRatio,
    );
  }, [animationFromProps?.id, devicePixelRatio, setAnimationScale]);

  return {
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}

function useResetCenter({
  animation: animationFromProps,
  index: indexFromProps,
  playing: playingFromProps,
}: Pick<ReturnType<typeof useAnimation>, "animation"> &
  Pick<ReturnType<typeof useIndex>, "index"> &
  Pick<ReturnType<typeof usePlaying>, "playing">) {
  const { resetAnimationOffset } = useAnimations();

  const resetCenterDisabled = useMemo<boolean>(
    () =>
      playingFromProps ||
      !animationFromProps?.sprites ||
      (animationFromProps.sprites[indexFromProps].offsetX ===
        animationFromProps.sprites[indexFromProps].initialOffsetX &&
        animationFromProps.sprites[indexFromProps].offsetY ===
          animationFromProps.sprites[indexFromProps].initialOffsetY),
    [animationFromProps?.sprites, indexFromProps, playingFromProps],
  );

  const resetCenterOnClick = useCallback<Func>(
    () => resetAnimationOffset(animationFromProps?.id || "", indexFromProps),
    [animationFromProps?.id, indexFromProps, resetAnimationOffset],
  );

  return { resetCenterDisabled, resetCenterOnClick };
}
