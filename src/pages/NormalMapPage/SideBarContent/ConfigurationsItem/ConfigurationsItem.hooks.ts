import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const homeOnClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => navigate("/"),
    [navigate],
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
