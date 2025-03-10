import { type Func } from "@agusmgarcia/react-core";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAnimations } from "#src/store";
import { useDevicePixelRatio, useViewport } from "#src/utils";

import type ToolBarProps from "./ToolBar.types";

export default function useToolBar({
  animation,
  index,
  onIndexChange,
  ...props
}: ToolBarProps) {
  const viewport = useViewport();
  const { replace } = useRouter();

  const { name, nameOnChange } = useName({ animation });

  const homeOnClick = useCallback<Func>(() => replace("/"), [replace]);

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

  const {
    fps,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
  } = useFPS({ animation });

  const { color, colorDisabled, colorOnChange } = useCenter({
    animation,
    index,
    playing,
  });

  return {
    ...props,
    backwardOnClick,
    color,
    colorDisabled,
    colorOnChange,
    forwardOnClick,
    fps,
    fpsOnChange,
    homeOnClick,
    minusFPSDisabled,
    minusFPSOnClick,
    name,
    nameOnChange,
    playing,
    playingDisabled,
    playOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
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

  const playingDisabled = useMemo<boolean>(
    () => animation.sprites.length <= 1,
    [animation.sprites.length],
  );

  const backwardOnClick = useCallback<Func>(() => {
    const animationLength = animation.sprites.length;
    setPlaying(false);
    onIndexChange((prev) => (prev > 0 ? prev - 1 : animationLength - 1));
  }, [animation.sprites.length, onIndexChange]);

  const playOnClick = useCallback<Func>(() => setPlaying((prev) => !prev), []);

  const forwardOnClick = useCallback<Func>(() => {
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

  return {
    backwardOnClick,
    forwardOnClick,
    playing,
    playingDisabled,
    playOnClick,
  };
}

function useScaling({ animation }: Pick<ToolBarProps, "animation">) {
  const devicePixelRatio = useDevicePixelRatio();

  const { setAnimationScale } = useAnimations();

  const zoomOutDisabled = useMemo<boolean>(
    () => animation.scale <= devicePixelRatio,
    [animation.scale, devicePixelRatio],
  );

  const zoomOutOnClick = useCallback<Func>(
    () =>
      setAnimationScale(animation.id, (prev) => prev - devicePixelRatio / 5),
    [animation.id, devicePixelRatio, setAnimationScale],
  );

  const zoomInDisabled = useMemo<boolean>(() => false, []);

  const zoomInOnClick = useCallback<Func>(
    () =>
      setAnimationScale(animation.id, (prev) => prev + devicePixelRatio / 5),
    [animation.id, devicePixelRatio, setAnimationScale],
  );

  const resetDisabled = useMemo<boolean>(() => false, []);

  const resetOnClick = useCallback<Func>(
    () => setAnimationScale(animation.id, devicePixelRatio),
    [animation.id, devicePixelRatio, setAnimationScale],
  );

  useEffect(() => {
    setAnimationScale(animation.id, (prev) =>
      prev >= devicePixelRatio ? prev : devicePixelRatio,
    );
  }, [animation.id, devicePixelRatio, setAnimationScale]);

  return {
    resetDisabled,
    resetOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  };
}

function useFPS({ animation }: Pick<ToolBarProps, "animation">) {
  const { setAnimationFPS } = useAnimations();

  const minusFPSDisabled = useMemo<boolean>(
    () => animation.fps <= 1,
    [animation.fps],
  );

  const minusFPSOnClick = useCallback<Func>(
    () => setAnimationFPS(animation.id, (fps) => fps - 1),
    [animation.id, setAnimationFPS],
  );

  const fps = useMemo<number>(() => animation.fps, [animation.fps]);

  const fpsOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationFPS(animation.id, event.target.valueAsNumber),
    [animation.id, setAnimationFPS],
  );

  const plusFPSDisabled = useMemo<boolean>(() => false, []);

  const plusFPSOnClick = useCallback<Func>(
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

function useCenter({
  animation,
  index,
  playing,
}: Pick<ToolBarProps, "animation" | "index"> & { playing: boolean }) {
  const { setAnimationColor, setAnimationOffset } = useAnimations();

  const color = useMemo(() => animation.color, [animation.color]);

  const colorDisabled = useMemo(() => playing, [playing]);

  const colorOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationColor(animation.id, event.target.value),
    [animation.id, setAnimationColor],
  );

  useEffect(() => {
    if (playing) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey) return;

      switch (event.key) {
        case "ArrowUp":
          return setAnimationOffset(
            animation.id,
            index,
            (offsetX) => offsetX,
            (offsetY) => offsetY - window.devicePixelRatio,
          );

        case "ArrowRight":
          return setAnimationOffset(
            animation.id,
            index,
            (offsetX) => offsetX + window.devicePixelRatio,
            (offsetY) => offsetY,
          );

        case "ArrowDown":
          return setAnimationOffset(
            animation.id,
            index,
            (offsetX) => offsetX,
            (offsetY) => offsetY + window.devicePixelRatio,
          );

        case "ArrowLeft":
          return setAnimationOffset(
            animation.id,
            index,
            (offsetX) => offsetX - window.devicePixelRatio,
            (offsetY) => offsetY,
          );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [animation.id, index, playing, setAnimationOffset]);

  return { color, colorDisabled, colorOnChange };
}
