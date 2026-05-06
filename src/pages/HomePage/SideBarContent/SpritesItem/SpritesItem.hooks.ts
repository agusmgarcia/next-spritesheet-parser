import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useMemo } from "react";

import {
  useSpriteSelection,
  useSpriteSheet,
  useSpriteSheetImage,
} from "#src/store";
import { useKeyDown } from "#src/utils";

import type SpritesItemProps from "./SpritesItem.types";

export default function useSpritesItem(props: SpritesItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem();

  const { resetSelectionDisabled, resetSelectionOnClick } = useResetSelection();

  const { mergeSpritesDisabled, mergeSpritesOnClick } = useMergeSprites();

  const { splitSpriteDisabled, splitSpriteOnClick } = useSplitSprite();

  return {
    ...props,
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
