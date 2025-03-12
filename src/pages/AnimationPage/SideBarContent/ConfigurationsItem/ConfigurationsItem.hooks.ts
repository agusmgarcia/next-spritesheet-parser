import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useAnimations } from "#src/store";

import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function useConfigurationsItem({
  animation,
  ...props
}: ConfigurationsItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Configurations", variant: "h2" }),
    [],
  );

  const { onClick: homeOnClick } = useHome();

  const { onChange: nameOnChange, value: nameValue } = useName({ animation });

  return {
    ...props,
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

function useName({ animation }: Pick<ConfigurationsItemProps, "animation">) {
  const { setAnimationName } = useAnimations();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setAnimationName(animation.id, event.target.value),
    [animation.id, setAnimationName],
  );

  return { onChange, value: animation.name };
}
