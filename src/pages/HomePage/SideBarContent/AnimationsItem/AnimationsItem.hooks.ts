import { type Func, sorts } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useAnimations,
  useSpriteSelection,
  useSpriteSheet,
  useSpriteSheetImage,
  useSpriteSheetSettings,
} from "#src/store";
import { useKeyDown } from "#src/utils";

import type AnimationsItemProps from "./AnimationsItem.types";

export default function useAnimationsItem(props: AnimationsItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem();

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
    defaultCollapsed,
    disabled,
    mergeSpritesDisabled,
    mergeSpritesOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
    splitSpriteDisabled,
    splitSpriteOnClick,
  };
}

function useSideBarItem() {
  const { spriteSheetImage } = useSpriteSheetImage();

  const disabled = useMemo<boolean>(
    () => !spriteSheetImage?.url,
    [spriteSheetImage?.url],
  );

  const defaultCollapsed = useMemo<boolean>(() => disabled, [disabled]);

  return { defaultCollapsed, disabled };
}

function useCreateAnimation() {
  const { push } = useRouter();

  const { createAnimation } = useAnimations();
  const { spriteSelection } = useSpriteSelection();
  const { spriteSheetLoading } = useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();

  const createAnimationDisabled = useMemo<boolean>(
    () =>
      !spriteSheetImage?.url ||
      spriteSheetImageLoading ||
      spriteSheetLoading ||
      !spriteSelection.length,
    [
      spriteSelection.length,
      spriteSheetImage?.url,
      spriteSheetImageLoading,
      spriteSheetLoading,
    ],
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
  const { spriteSheetLoading } = useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();

  const resetSelectionDisabled = useMemo<boolean>(
    () =>
      !spriteSheetImage?.url ||
      spriteSheetImageLoading ||
      spriteSheetLoading ||
      !spriteSelection.length,
    [
      spriteSelection.length,
      spriteSheetImage?.url,
      spriteSheetImageLoading,
      spriteSheetLoading,
    ],
  );

  const resetSelectionOnClick = useCallback<Func>(() => {
    if (resetSelectionDisabled) return;
    unselectAllSprites();
  }, [resetSelectionDisabled, unselectAllSprites]);

  useKeyDown("l", resetSelectionOnClick);

  return {
    resetSelectionDisabled,
    resetSelectionOnClick,
  };
}

function useMergeSprites() {
  const { spriteSelection } = useSpriteSelection();
  const { mergeSpriteSheetSprites, spriteSheetLoading } = useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();

  const mergeSpritesDisabled = useMemo<boolean>(
    () =>
      !spriteSheetImage?.url ||
      spriteSheetImageLoading ||
      spriteSheetLoading ||
      spriteSelection.length <= 1,
    [
      spriteSelection.length,
      spriteSheetImage?.url,
      spriteSheetImageLoading,
      spriteSheetLoading,
    ],
  );

  const mergeSpritesOnClick = useCallback<Func>(() => {
    mergeSpriteSheetSprites(spriteSelection);
  }, [mergeSpriteSheetSprites, spriteSelection]);

  useKeyDown("m", mergeSpritesOnClick);

  return {
    mergeSpritesDisabled,
    mergeSpritesOnClick,
  };
}

function useSplitSprite() {
  const { spriteSelection } = useSpriteSelection();
  const { splitSpriteSheetSprite, spriteSheet, spriteSheetLoading } =
    useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();

  const splitSpriteDisabled = useMemo<boolean>(
    () =>
      !spriteSheetImage?.url ||
      spriteSheetImageLoading ||
      spriteSheetLoading ||
      spriteSelection.length !== 1 ||
      !Object.keys(spriteSheet?.[spriteSelection[0]].subsprites || {}).length,
    [
      spriteSheetImage?.url,
      spriteSheetImageLoading,
      spriteSheetLoading,
      spriteSelection,
      spriteSheet,
    ],
  );

  const splitSpriteOnClick = useCallback<Func>(() => {
    if (splitSpriteDisabled) return;
    splitSpriteSheetSprite(spriteSelection[0]);
  }, [splitSpriteSheetSprite, splitSpriteDisabled, spriteSelection]);

  useKeyDown("s", splitSpriteOnClick);

  return { splitSpriteDisabled, splitSpriteOnClick };
}

function useAnimationSelector() {
  const { push } = useRouter();

  const { animations } = useAnimations();
  const { spriteSheetLoading } = useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();
  const { spriteSheetSettings } = useSpriteSheetSettings();

  const [animationSelectorValue, setAnimationSelectorValue] = useState("sheet");

  const animationSelectorDisabled = useMemo<boolean>(
    () =>
      !spriteSheetImage?.url || spriteSheetImageLoading || spriteSheetLoading,
    [spriteSheetImage?.url, spriteSheetImageLoading, spriteSheetLoading],
  );

  const animationSelectorOptions = useMemo<{ id: string; name: string }[]>(
    () => [
      {
        id: "sheet",
        name:
          !!spriteSheetImage?.url && !!spriteSheetSettings?.name
            ? spriteSheetSettings.name
            : "Sprite sheet",
      },
      ...(animations
        ?.map((a) => ({ id: a.id, name: a.name }))
        .sort((a1, a2) => sorts.byStringAsc(a1.name, a2.name)) || []),
    ],
    [animations, spriteSheetImage?.url, spriteSheetSettings?.name],
  );

  const animationSelectorOnChange = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((event) => setAnimationSelectorValue(event.target.value), []);

  useEffect(() => {
    if (animationSelectorValue === "sheet") return;

    const animation = animations?.find((a) => a.id === animationSelectorValue);
    if (!animation) return;

    push(`/animations/${animation.id}`);
  }, [animationSelectorValue, animations, push]);

  return {
    animationSelectorDisabled,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  };
}
