import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useAnimations } from "#src/store";

import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function useConfigurationsItem({
  animation: animationFromProps,
  ...rest
}: ConfigurationsItemProps) {
  const { homeOnClick } = useHome();

  const { nameOnChange, nameValue } = useName({
    animation: animationFromProps,
  });

  const { deleteAnimationOnClick } = useDeleteAnimation({
    animation: animationFromProps,
  });

  return {
    ...rest,
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

function useName({
  animation: animationFromProps,
}: Pick<ConfigurationsItemProps, "animation">) {
  const { setAnimationName } = useAnimations();

  const nameOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationName(animationFromProps.id, event.target.value),
    [animationFromProps.id, setAnimationName],
  );

  return { nameOnChange, nameValue: animationFromProps.name };
}

function useDeleteAnimation({
  animation: animationFromProps,
}: Pick<ConfigurationsItemProps, "animation">) {
  const { replace } = useRouter();

  const { deleteAnimation } = useAnimations();

  const deleteAnimationOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    deleteAnimation(animationFromProps.id);
    replace("/");
  }, [animationFromProps.id, deleteAnimation, replace]);

  return { deleteAnimationOnClick };
}
