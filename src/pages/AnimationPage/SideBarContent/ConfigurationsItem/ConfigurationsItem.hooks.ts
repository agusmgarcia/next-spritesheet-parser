import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";

import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function useConfigurationsItem({
  animation: animationFromProps,
  ...rest
}: ConfigurationsItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Configurations", variant: "h2" }),
    [],
  );

  const { onClick: homeOnClick } = useHome();

  const { onChange: nameOnChange, value: nameValue } = useName({
    animation: animationFromProps,
  });

  const { deleteAnimationOnClick } = useDeleteAnimation({
    animation: animationFromProps,
  });

  return {
    ...rest,
    deleteAnimationOnClick,
    heading,
    homeOnClick,
    nameOnChange,
    nameValue,
  };
}

function useHome() {
  const { push } = useRouter();

  const onClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => push("/"),
    [push],
  );

  return { onClick };
}

function useName({
  animation: animationFromProps,
}: Pick<ConfigurationsItemProps, "animation">) {
  const { setAnimationName } = useAnimations();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationName(animationFromProps.id, event.target.value),
    [animationFromProps.id, setAnimationName],
  );

  return { onChange, value: animationFromProps.name };
}

function useDeleteAnimation({
  animation: animationFromProps,
}: Pick<ConfigurationsItemProps, "animation">) {
  const { replace } = useRouter();

  const { deleteAnimation } = useAnimations();

  const deleteAnimationOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    () => deleteAnimation(animationFromProps.id).then(() => replace("/")),
    [animationFromProps.id, deleteAnimation, replace],
  );

  return { deleteAnimationOnClick };
}
