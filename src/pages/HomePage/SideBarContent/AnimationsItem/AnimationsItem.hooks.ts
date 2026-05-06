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
  const { defaultCollapsed } = useSideBarItem();

  const { createAnimationDisabled, createAnimationOnClick } =
    useCreateAnimation();

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
  };
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

function useSideBarItem() {
  const defaultCollapsed = useMemo<boolean>(() => false, []);

  return { defaultCollapsed };
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
    [animations, spriteSheetImage?.url, spriteSheetSettings],
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
