import { sorts } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { AnimationContext } from "#src/fragments";
import { useAnimations, useSpriteSheetImage } from "#src/store";

import type AnimationsItemProps from "./AnimationsItem.types";

export default function useAnimationsItem(props: AnimationsItemProps) {
  const {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  } = useAnimationSelector();

  return {
    ...props,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  };
}

function useAnimationSelector() {
  const { push } = useRouter();

  const animation = useContext(AnimationContext.Context);

  const { spriteSheetImage } = useSpriteSheetImage();
  const { animations } = useAnimations();

  const [animationSelectorValue, setAnimationSelectorValue] = useState(
    animation?.id || "sheet",
  );

  const animationSelectorOptions = useMemo<{ id: string; name: string }[]>(
    () => [
      { id: "sheet", name: spriteSheetImage?.name || "Sprite sheet" },
      ...(animations
        ?.map((a) => ({ id: a.id, name: a.name }))
        .sort((a1, a2) => sorts.byStringAsc(a1.name, a2.name)) || []),
    ],
    [animations, spriteSheetImage?.name],
  );

  const animationSelectorOnChange = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((event) => setAnimationSelectorValue(event.target.value), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimationSelectorValue(animation?.id || "sheet");
  }, [animation?.id]);

  useEffect(() => {
    if (animationSelectorValue === "sheet") {
      push("/");
      return;
    }

    const animation = animations?.find((a) => a.id === animationSelectorValue);
    if (!animation) return;

    push(`/animations/${animation.id}`);
  }, [animationSelectorValue, animations, push]);

  return {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  };
}
