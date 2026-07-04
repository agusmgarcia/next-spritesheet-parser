import { useMemo } from "react";

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
  const { unselectAllSprites, unselectAllSpritesDisabled } =
    useSpriteSelection();

  useKeyDown("l", unselectAllSprites);

  return {
    resetSelectionDisabled: unselectAllSpritesDisabled,
    resetSelectionOnClick: unselectAllSprites,
  };
}

function useMergeSprites() {
  const { mergeSpriteSheetSprites, mergeSpriteSheetSpritesDisabled } =
    useSpriteSheet();

  useKeyDown("m", mergeSpriteSheetSprites);

  return {
    mergeSpritesDisabled: mergeSpriteSheetSpritesDisabled,
    mergeSpritesOnClick: mergeSpriteSheetSprites,
  };
}

function useSplitSprite() {
  const { splitSpriteSheetSprite, splitSpriteSheetSpriteDisabled } =
    useSpriteSheet();

  useKeyDown("s", splitSpriteSheetSprite);

  return {
    splitSpriteDisabled: splitSpriteSheetSpriteDisabled,
    splitSpriteOnClick: splitSpriteSheetSprite,
  };
}
