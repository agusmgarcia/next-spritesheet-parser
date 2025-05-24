import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useNormalMap } from "#src/store";

import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function useConfigurationsItem(props: ConfigurationsItemProps) {
  const { homeOnClick } = useHome();

  const { nameOnChange, nameValue } = useName();

  return {
    ...props,
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
  const { normalMap, setNormalMapName } = useNormalMap();

  const nameValue = useMemo<string>(
    () => normalMap?.image.name || "",
    [normalMap?.image.name],
  );

  const nameOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setNormalMapName(event.target.value),
    [setNormalMapName],
  );

  return { nameOnChange, nameValue };
}
