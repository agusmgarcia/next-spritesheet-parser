import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useNormalMapSettings } from "#src/store";

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
  const { setNormalMapSettings } = useNormalMapSettings();
  const { normalMapSettings } = useNormalMapSettings();

  const nameValue = useMemo<string>(
    () => normalMapSettings.name || "",
    [normalMapSettings.name],
  );

  const nameOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setNormalMapSettings({ name: event.target.value }),
    [setNormalMapSettings],
  );

  return { nameOnChange, nameValue };
}
