import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations, useSpriteSheet } from "#src/store";

import type AnimationsItemProps from "./AnimationsItem.types";

export default function useAnimationsItem({
  spriteIds: spriteIdsFromProps,
  spriteIdsOnUnselectAll: spriteIdsOnUnselectAllFromProps,
  ...rest
}: AnimationsItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Animations", variant: "h2" }),
    [],
  );

  const {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  } = useAnimationSelector();

  const { resetSelectionDisabled, resetSelectionOnClick } = useResetSelection({
    spriteIds: spriteIdsFromProps,
    spriteIdsOnUnselectAll: spriteIdsOnUnselectAllFromProps,
  });

  const { mergeSpritesDisabled, mergeSpritesLoading, mergeSpritesOnClick } =
    useMergeSprites({
      spriteIds: spriteIdsFromProps,
      spriteIdsOnUnselectAll: spriteIdsOnUnselectAllFromProps,
    });

  return {
    ...rest,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
    heading,
    mergeSpritesDisabled,
    mergeSpritesLoading,
    mergeSpritesOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
  };
}

function useAnimationSelector() {
  const { push } = useRouter();

  const { spriteSheet } = useSpriteSheet();
  const { animations } = useAnimations();

  const [animationSelectorValue, setAnimationSelectorValue] = useState("sheet");

  const animationSelectorOptions = useMemo<{ id: string; name: string }[]>(
    () => [
      { id: "sheet", name: spriteSheet?.sheet.name || "Sprite sheet" },
      ...animations.map((a) => ({ id: a.id, name: a.name })),
    ],
    [animations, spriteSheet?.sheet.name],
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
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  };
}

function useResetSelection({
  spriteIds: spriteIdsFromProps,
  spriteIdsOnUnselectAll: spriteIdsOnUnselectAllFromProps,
}: Pick<AnimationsItemProps, "spriteIds" | "spriteIdsOnUnselectAll">) {
  const resetSelectionDisabled = useMemo<boolean>(
    () => !spriteIdsFromProps.length,
    [spriteIdsFromProps.length],
  );

  const resetSelectionOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => spriteIdsOnUnselectAllFromProps(), [spriteIdsOnUnselectAllFromProps]);

  return { resetSelectionDisabled, resetSelectionOnClick };
}

function useMergeSprites({
  spriteIds: spriteIdsFromProps,
  spriteIdsOnUnselectAll: spriteIdsOnUnselectAllFromProps,
}: Pick<AnimationsItemProps, "spriteIds" | "spriteIdsOnUnselectAll">) {
  const { mergeSpriteSheetSprites } = useSpriteSheet();

  const [mergeSpritesLoading, setMergeSpritesLoading] = useState(false);

  const mergeSpritesDisabled = useMemo<boolean>(
    () => spriteIdsFromProps.length <= 1 || mergeSpritesLoading,
    [mergeSpritesLoading, spriteIdsFromProps.length],
  );

  const mergeSpritesOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    setMergeSpritesLoading(true);
    mergeSpriteSheetSprites(spriteIdsFromProps)
      .then(spriteIdsOnUnselectAllFromProps)
      .finally(() => setMergeSpritesLoading(false));
  }, [
    mergeSpriteSheetSprites,
    spriteIdsFromProps,
    spriteIdsOnUnselectAllFromProps,
  ]);

  return { mergeSpritesDisabled, mergeSpritesLoading, mergeSpritesOnClick };
}
