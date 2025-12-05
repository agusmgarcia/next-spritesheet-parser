import { sorts } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAnimation, useAnimations, useSpriteSheetImage } from "#src/store";

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

  const { spriteSheetImage } = useSpriteSheetImage();
  const { animations } = useAnimations();
  const { animation } = useAnimation();

  const [animationSelectorValue, setAnimationSelectorValue] = useState(
    animation.id,
  );

  const animationSelectorOptions = useMemo<{ id: string; name: string }[]>(
    () => [
      { id: "sheet", name: spriteSheetImage?.name || "Sprite sheet" },
      ...(Object.keys(animations || {})
        ?.map((aId) => ({ id: aId, name: animations![aId].name }))
        .sort((a1, a2) => sorts.byStringAsc(a1.name, a2.name)) || []),
    ],
    [animations, spriteSheetImage?.name],
  );

  const animationSelectorOnChange = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((event) => setAnimationSelectorValue(event.target.value), []);

  useEffect(() => {
    setAnimationSelectorValue(animation.id);
  }, [animation.id]);

  useEffect(() => {
    if (animationSelectorValue === "sheet") {
      push("/");
      return;
    }

    const animation = animations?.[animationSelectorValue];
    if (!animation) {
      push("/");
      return;
    }

    push(`/animations/${animationSelectorValue}`);
  }, [animationSelectorValue, animations, push]);

  return {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
  };
}
