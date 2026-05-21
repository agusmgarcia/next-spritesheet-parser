import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";

import { AnimationContext } from "#src/fragments";
import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function useConfigurationsItem(props: ConfigurationsItemProps) {
  const { homeOnClick } = useHome();

  const { nameOnChange, nameValue } = useName();

  const { deleteAnimationOnClick } = useDeleteAnimation();

  return {
    ...props,
    deleteAnimationOnClick,
    homeOnClick,
    nameOnChange,
    nameValue,
  };
}

function useHome() {
  const { push } = useRouter();

  const homeOnClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => push("/"),
    [push],
  );

  return { homeOnClick };
}

function useName() {
  const animation = useContext(AnimationContext.Context);

  const { setAnimationName } = useAnimations();

  const nameOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (!animation?.id) return;
      setAnimationName(animation.id, event.target.value);
    },
    [animation, setAnimationName],
  );

  return { nameOnChange, nameValue: animation?.name };
}

function useDeleteAnimation() {
  const animation = useContext(AnimationContext.Context);

  const { replace } = useRouter();

  const { deleteAnimation } = useAnimations();

  const deleteAnimationOnClick = useCallback<Func>(() => {
    if (!animation?.id) return;

    deleteAnimation(animation.id).then((result) => {
      if (!result) return;
      return replace("/");
    });
  }, [animation, deleteAnimation, replace]);

  useKeyDown("r", deleteAnimationOnClick);

  return { deleteAnimationOnClick };
}
