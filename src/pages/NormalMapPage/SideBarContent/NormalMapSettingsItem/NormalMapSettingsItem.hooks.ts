import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useNormalMap,
  useNormalMapSettings as useNormalMapSettingsFromStore,
} from "#src/store";

import type NormalMapSettingsItemProps from "./NormalMapSettingsItem.types";

export default function useNormalMapSettingsItem(
  props: NormalMapSettingsItemProps,
) {
  const {
    normalMapSettingsButtonDisabled,
    normalMapSettingsDisabled,
    normalMapSettingsLoading,
    normalMapSettingsOnChange,
    normalMapSettingsOnClick,
    normalMapSettingsValue,
  } = useNormalMapSettings();

  return {
    ...props,
    normalMapSettingsButtonDisabled,
    normalMapSettingsDisabled,
    normalMapSettingsLoading,
    normalMapSettingsOnChange,
    normalMapSettingsOnClick,
    normalMapSettingsValue,
  };
}

function useNormalMapSettings() {
  const { normalMapSettings, setNormalMapSettings } =
    useNormalMapSettingsFromStore();
  const { normalMap, normalMapLoading } = useNormalMap();

  const initialNormalMapSettings = useMemo(() => ({ strength: "0" }), []);

  const [normalMapSettingsValue, setNormalMapSettingsValue] = useState(
    initialNormalMapSettings,
  );

  const normalMapSettingsDisabled = useMemo<boolean>(
    () => !normalMap || normalMapLoading,
    [normalMap, normalMapLoading],
  );

  const normalMapSettingsButtonDisabled = useMemo<boolean>(
    () =>
      normalMapSettingsDisabled ||
      !normalMapSettingsValue.strength ||
      isNaN(+normalMapSettingsValue.strength) ||
      +normalMapSettingsValue.strength <= 0,
    [normalMapSettingsDisabled, normalMapSettingsValue.strength],
  );

  const normalMapSettingsOnChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) =>
      setNormalMapSettingsValue((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      })),
    [],
  );

  const normalMapSettingsOnClick = useCallback<Func>(() => {
    setNormalMapSettings({
      strength: +normalMapSettingsValue.strength,
    });
  }, [setNormalMapSettings, normalMapSettingsValue.strength]);

  useEffect(() => {
    setNormalMapSettingsValue({
      strength: normalMapSettings.strength.toString() || "0",
    });
  }, [normalMapSettings.strength]);

  return {
    normalMapSettingsButtonDisabled: normalMapSettingsButtonDisabled,
    normalMapSettingsDisabled: normalMapSettingsDisabled,
    normalMapSettingsLoading: normalMapLoading,
    normalMapSettingsOnChange: normalMapSettingsOnChange,
    normalMapSettingsOnClick: normalMapSettingsOnClick,
    normalMapSettingsValue: normalMapSettingsValue,
  };
}
