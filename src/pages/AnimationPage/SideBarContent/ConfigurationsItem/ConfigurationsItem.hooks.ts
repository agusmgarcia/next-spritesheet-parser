import { type Func } from "@agusmgarcia/react-core";
import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useAnimations } from "#src/store";
import { useKeyDown } from "#src/utils";

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
  const navigate = useNavigate();

  const homeOnClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => navigate("/"),
    [navigate],
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
  const navigate = useNavigate();

  const { deleteAnimation } = useAnimations();

  const deleteAnimationOnClick = useCallback<Func>(() => {
    deleteAnimation(animationFromProps.id).then((result) => {
      if (!result) return;
      return navigate("/", { replace: true });
    });
  }, [animationFromProps.id, deleteAnimation, navigate]);

  useKeyDown("r", deleteAnimationOnClick);

  return { deleteAnimationOnClick };
}
