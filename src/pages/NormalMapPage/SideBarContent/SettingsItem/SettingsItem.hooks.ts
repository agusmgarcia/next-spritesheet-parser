import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import { useNormalMap } from "#src/store";

import type SettingsItemProps from "./SettingsItem.types";

export default function useSettingsItem(props: SettingsItemProps) {
  const {
    settingsButtonDisabled,
    settingsDisabled,
    settingsInvertXId,
    settingsInvertYId,
    settingsLoading,
    settingsOnChange,
    settingsOnClick,
    settingsValue,
  } = useSettings();

  return {
    ...props,
    settingsButtonDisabled,
    settingsDisabled,
    settingsInvertXId,
    settingsInvertYId,
    settingsLoading,
    settingsOnChange,
    settingsOnClick,
    settingsValue,
  };
}

function useSettings() {
  const settingsInvertXId = useId();
  const settingsInvertYId = useId();

  const { normalMap, normalMapLoading, setNormalMapSettings } = useNormalMap();

  const initialSettings = useMemo(
    () => ({
      colorSpace: "linear" as const,
      filterRadius: "1",
      invertX: false,
      invertY: false,
      invertZ: false,
      strength: "0",
    }),
    [],
  );

  const [settingsValue, setSettingsValue] = useState(initialSettings);

  const settingsLoading = useMemo<boolean>(
    () => normalMapLoading,
    [normalMapLoading],
  );

  const settingsDisabled = useMemo<boolean>(
    () => !normalMap?.image.url || settingsLoading,
    [normalMap?.image.url, settingsLoading],
  );

  const settingsButtonDisabled = useMemo<boolean>(
    () =>
      settingsDisabled ||
      !settingsValue.strength ||
      isNaN(+settingsValue.strength) ||
      +settingsValue.strength <= 0,
    [settingsDisabled, settingsValue.strength],
  );

  const settingsOnChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) =>
      setSettingsValue((prev) => ({
        ...prev,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      })),
    [],
  );

  const settingsOnClick = useCallback<Func>(() => {
    setNormalMapSettings({
      colorSpace: settingsValue.colorSpace,
      filterRadius: +settingsValue.filterRadius,
      invertX: settingsValue.invertX,
      invertY: settingsValue.invertY,
      invertZ: settingsValue.invertZ,
      strength: +settingsValue.strength,
    });
  }, [
    setNormalMapSettings,
    settingsValue.colorSpace,
    settingsValue.filterRadius,
    settingsValue.invertX,
    settingsValue.invertY,
    settingsValue.invertZ,
    settingsValue.strength,
  ]);

  useEffect(() => {
    setSettingsValue({
      colorSpace: (normalMap?.settings.colorSpace as "linear") || "linear",
      filterRadius: normalMap?.settings.filterRadius.toString() || "0",
      invertX: !!normalMap?.settings.invertX,
      invertY: !!normalMap?.settings.invertY,
      invertZ: !!normalMap?.settings.invertZ,
      strength: normalMap?.settings.strength.toString() || "0",
    });
  }, [
    normalMap?.settings.colorSpace,
    normalMap?.settings.filterRadius,
    normalMap?.settings.invertX,
    normalMap?.settings.invertY,
    normalMap?.settings.invertZ,
    normalMap?.settings.strength,
  ]);

  return {
    settingsButtonDisabled,
    settingsDisabled,
    settingsInvertXId,
    settingsInvertYId,
    settingsLoading,
    settingsOnChange,
    settingsOnClick,
    settingsValue,
  };
}
