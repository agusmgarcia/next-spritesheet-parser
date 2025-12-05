import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useAnimation } from "#src/store";
import { useKeyDown } from "#src/utils";

import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function useConfigurationsItem(props: ConfigurationsItemProps) {
  const { goToHome } = useHome();

  const { animationName, setAnimationName, setAnimationNameDisabled } =
    useAnimationName();

  const { deleteAnimation, deleteAnimationDisabled } = useDeleteAnimation();

  return {
    ...props,
    animationName,
    deleteAnimation,
    deleteAnimationDisabled,
    goToHome,
    setAnimationName,
    setAnimationNameDisabled,
  };
}

function useHome() {
  const { push } = useRouter();

  const homeOnClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => push("/"),
    [push],
  );

  return { goToHome: homeOnClick };
}

function useAnimationName() {
  const { animation, setAnimationName, setAnimationNameDisabled } =
    useAnimation();

  const setAnimationNameOnChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => setAnimationName(event.target.value), [setAnimationName]);

  return {
    animationName: animation.name,
    setAnimationName: setAnimationNameOnChange,
    setAnimationNameDisabled,
  };
}

function useDeleteAnimation() {
  const { replace } = useRouter();

  const { deleteAnimation, deleteAnimationDisabled } = useAnimation();

  const deleteAnimationOnClick = useCallback<Func>(() => {
    deleteAnimation().then((result) => {
      if (!result) return;
      return replace("/");
    });
  }, [deleteAnimation, replace]);

  useKeyDown("r", deleteAnimationOnClick);

  return { deleteAnimation: deleteAnimationOnClick, deleteAnimationDisabled };
}
