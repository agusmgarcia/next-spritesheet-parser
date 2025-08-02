import { useCallback, useMemo } from "react";

import { type Animation, useAnimations } from "#src/store";

import type BoundingBoxesItemProps from "./BoundingBoxesItem.types";

export default function useBoundingBoxesItem({
  animation: animationFromProps,
  index: indexFromProps,
  ...rest
}: BoundingBoxesItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem({
    animation: animationFromProps,
  });

  const { createBoundingBoxDisabled, createBoundingBoxOnClick } =
    useCreateBoundingBox({
      animation: animationFromProps,
      index: indexFromProps,
    });

  const { boundingBoxes } = useBoundingBoxes({
    animation: animationFromProps,
    index: indexFromProps,
  });

  return {
    ...rest,
    boundingBoxes,
    createBoundingBoxDisabled,
    createBoundingBoxOnClick,
    defaultCollapsed,
    disabled,
  };
}

function useSideBarItem({
  animation: animationFromProps,
}: Pick<BoundingBoxesItemProps, "animation">) {
  const disabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const defaultCollapsed = useMemo<boolean>(() => true, []);

  return { defaultCollapsed, disabled };
}

function useCreateBoundingBox({
  animation: animationFromProps,
  index: indexFromProps,
}: Pick<BoundingBoxesItemProps, "animation" | "index">) {
  const { createAnimationBoundingBox } = useAnimations();

  const createBoundingBoxDisabled = useMemo<boolean>(
    () => animationFromProps.playing,
    [animationFromProps.playing],
  );

  const createBoundingBoxOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    () => createAnimationBoundingBox(animationFromProps.id, indexFromProps),
    [animationFromProps.id, createAnimationBoundingBox, indexFromProps],
  );

  return { createBoundingBoxDisabled, createBoundingBoxOnClick };
}

function useBoundingBoxes({
  animation: animationFromProps,
  index: indexFromProps,
}: Pick<BoundingBoxesItemProps, "animation" | "index">) {
  const {
    deleteAnimationBoundingBox,
    setAnimationBoundingBox,
    toggleAnimationBoundingBoxVisibility,
  } = useAnimations();

  const boundingBoxes = useMemo<
    (Animation["sprites"][number]["boundingBoxes"][number] & {
      deleteDisabled: boolean;
      deleteOnClick: React.MouseEventHandler<HTMLButtonElement>;
      disabled: boolean;
      onChange: React.ChangeEventHandler<HTMLInputElement>;
      resetDisabled: boolean;
      resetOnClick: React.MouseEventHandler<HTMLButtonElement>;
      toggleVisibilityDisabled: boolean;
      toggleVisibilityOnClick: React.MouseEventHandler<HTMLButtonElement>;
    })[]
  >(
    () =>
      (animationFromProps.sprites[indexFromProps]?.boundingBoxes || []).map(
        (bb) => ({
          ...bb,
          deleteDisabled: animationFromProps.playing,
          deleteOnClick: () =>
            deleteAnimationBoundingBox(
              animationFromProps.id,
              indexFromProps,
              bb.id,
            ),
          disabled: animationFromProps.playing,
          onChange: (event) =>
            setAnimationBoundingBox(
              animationFromProps.id,
              indexFromProps,
              bb.id,
              (prevBoundingBox) => ({
                ...prevBoundingBox,
                [event.target.name]: event.target.value,
              }),
            ),
          resetDisabled:
            animationFromProps.playing || (!bb.offsetX && !bb.offsetY),
          resetOnClick: () =>
            setAnimationBoundingBox(
              animationFromProps.id,
              indexFromProps,
              bb.id,
              (prevBoundingBox) => ({
                ...prevBoundingBox,
                offsetX: 0,
                offsetY: 0,
              }),
            ),
          toggleVisibilityDisabled: animationFromProps.playing,
          toggleVisibilityOnClick: () =>
            toggleAnimationBoundingBoxVisibility(
              animationFromProps.id,
              indexFromProps,
              bb.id,
            ),
        }),
      ),
    [
      animationFromProps.id,
      animationFromProps.playing,
      animationFromProps.sprites,
      deleteAnimationBoundingBox,
      indexFromProps,
      setAnimationBoundingBox,
      toggleAnimationBoundingBoxVisibility,
    ],
  );

  return { boundingBoxes };
}
