import { type AsyncFunc } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import { useNormalMap } from "#src/store";

import type SettingsItemProps from "./SettingsItem.types";

export default function useSettingsItem(props: SettingsItemProps) {
  const {
    settingsDisabled,
    settingsInvertXId,
    settingsInvertYId,
    settingsOnChange,
    settingsOnMouseUp,
    settingsValue,
  } = useSettings();

  return {
    ...props,
    settingsDisabled,
    settingsInvertXId,
    settingsInvertYId,
    settingsOnChange,
    settingsOnMouseUp,
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
      strength: "1",
    }),
    [],
  );

  const [settingsValue, setSettingsValue] = useState(initialSettings);
  const [loading, setLoading] = useState(false);

  const settingsLoading = useMemo<boolean>(
    () => normalMapLoading || loading,
    [loading, normalMapLoading],
  );

  const settingsDisabled = useMemo<boolean>(
    () => !normalMap?.image.url || settingsLoading,
    [normalMap?.image.url, settingsLoading],
  );

  const cta = useCallback<AsyncFunc<void, [settings: typeof initialSettings]>>(
    async (settings) => {
      if (
        settingsDisabled ||
        !settings.strength ||
        isNaN(+settings.strength) ||
        +settings.strength < 1 ||
        +settings.strength > 5
      )
        return;

      setLoading(true);
      return setNormalMapSettings({
        colorSpace: settings.colorSpace,
        filterRadius: +settings.filterRadius,
        invertX: settings.invertX,
        invertY: settings.invertY,
        invertZ: settings.invertZ,
        strength: +settings.strength,
      }).finally(() => setLoading(false));
    },
    [setNormalMapSettings, settingsDisabled],
  );

  const settingsOnChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (settingsDisabled) return;
      setSettingsValue((prev) => ({
        ...prev,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      }));

      if (event.target.type !== "checkbox") return;
      cta({ ...settingsValue, [event.target.name]: event.target.checked });
    },
    [cta, settingsDisabled, settingsValue],
  );

  const settingsOnMouseUp = useCallback<
    React.MouseEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (event.currentTarget.type === "checkbox") return;
      cta(settingsValue);
    },
    [cta, settingsValue],
  );

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
    settingsDisabled,
    settingsInvertXId,
    settingsInvertYId,
    settingsOnChange,
    settingsOnMouseUp,
    settingsValue,
  };
}
