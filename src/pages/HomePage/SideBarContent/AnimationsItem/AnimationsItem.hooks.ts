import { type Func, sorts } from "@agusmgarcia/react-core";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAnimations, useSpriteSelection, useSpriteSheet } from "#src/store";
import { useKeyDown } from "#src/utils";

import type AnimationsItemProps from "./AnimationsItem.types";

export default function useAnimationsItem(props: AnimationsItemProps) {
  const { createAnimationDisabled, createAnimationOnClick } =
    useCreateAnimation();

  const { resetSelectionDisabled, resetSelectionOnClick } = useResetSelection();

  const { mergeSpritesDisabled, mergeSpritesOnClick } = useMergeSprites();

  const { splitSpriteDisabled, splitSpriteOnClick } = useSplitSprite();

  const {
    animationSelectorDisabled,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  } = useAnimationSelector();

  return {
    ...props,
    animationSelectorDisabled,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
    createAnimationDisabled,
    createAnimationOnClick,
    mergeSpritesDisabled,
    mergeSpritesOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
    splitSpriteDisabled,
    splitSpriteOnClick,
  };
}

function useCreateAnimation() {
  const { push } = useRouter();

  const { createAnimation } = useAnimations();
  const { spriteSelection } = useSpriteSelection();
  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();

  const createAnimationDisabled = useMemo<boolean>(
    () => !spriteSheet || spriteSheetLoading || !spriteSelection.length,
    [spriteSelection.length, spriteSheet, spriteSheetLoading],
  );

  const createAnimationOnClick = useCallback<Func>(() => {
    if (createAnimationDisabled) return;

    const animationId = createAnimation(spriteSelection);
    if (!animationId) return;

    push(`/animations/${animationId}`);
  }, [createAnimationDisabled, createAnimation, spriteSelection, push]);

  useKeyDown("c", createAnimationOnClick);

  return {
    createAnimationDisabled,
    createAnimationOnClick,
  };
}

function useResetSelection() {
  const { spriteSelection, unselectAllSprites } = useSpriteSelection();
  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();

  const resetSelectionDisabled = useMemo<boolean>(
    () => !spriteSheet || spriteSheetLoading || !spriteSelection.length,
    [spriteSelection.length, spriteSheet, spriteSheetLoading],
  );

  const resetSelectionOnClick = useCallback<Func>(() => {
    if (resetSelectionDisabled) return;
    unselectAllSprites();
  }, [resetSelectionDisabled, unselectAllSprites]);

  useKeyDown("r", resetSelectionOnClick);

  return {
    resetSelectionDisabled,
    resetSelectionOnClick,
  };
}

function useMergeSprites() {
  const { spriteSelection } = useSpriteSelection();
  const { mergeSprites, spriteSheet, spriteSheetLoading } = useSpriteSheet();

  const mergeSpritesDisabled = useMemo<boolean>(
    () => !spriteSheet || spriteSheetLoading || spriteSelection.length <= 1,
    [spriteSelection.length, spriteSheet, spriteSheetLoading],
  );

  const mergeSpritesOnClick = useCallback<Func>(() => {
    mergeSprites(spriteSelection);
  }, [mergeSprites, spriteSelection]);

  useKeyDown("m", mergeSpritesOnClick);

  return {
    mergeSpritesDisabled,
    mergeSpritesOnClick,
  };
}

function useSplitSprite() {
  const { spriteSelection } = useSpriteSelection();
  const { splitSprite, spriteSheet, spriteSheetLoading } = useSpriteSheet();

  const splitSpriteDisabled = useMemo<boolean>(
    () =>
      !spriteSheet ||
      spriteSheetLoading ||
      spriteSelection.length !== 1 ||
      !Object.keys(spriteSheet?.sprites[spriteSelection[0]].subsprites || {})
        .length,
    [spriteSelection, spriteSheet, spriteSheetLoading],
  );

  const splitSpriteOnClick = useCallback<Func>(() => {
    if (splitSpriteDisabled) return;
    splitSprite(spriteSelection[0]);
  }, [splitSprite, splitSpriteDisabled, spriteSelection]);

  useKeyDown("s", splitSpriteOnClick);

  return { splitSpriteDisabled, splitSpriteOnClick };
}

function useAnimationSelector() {
  const { push } = useRouter();

  const { animations } = useAnimations();
  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();

  const [animationSelectorValue, setAnimationSelectorValue] = useState("sheet");

  const animationSelectorOptions = useMemo<{ id: string; name: string }[]>(
    () => [
      { id: "sheet", name: spriteSheet?.name || "Sprite sheet" },
      ...animations
        .map((a) => ({ id: a.id, name: a.name }))
        .sort((a1, a2) => sorts.byStringAsc(a1.name, a2.name)),
    ],
    [animations, spriteSheet?.name],
  );

  const animationSelectorOnChange = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((event) => setAnimationSelectorValue(event.target.value), []);

  useEffect(() => {
    if (animationSelectorValue === "sheet") return;

    const animation = animations.find((a) => a.id === animationSelectorValue);
    if (!animation) return;

    push(`/animations/${animation.id}`);
  }, [animationSelectorValue, animations, push]);

  return {
    animationSelectorDisabled: !spriteSheet || spriteSheetLoading,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  };
}
