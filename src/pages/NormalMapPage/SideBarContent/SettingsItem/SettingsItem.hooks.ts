import { type AsyncFunc } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import { useNormalMapImage, useNormalMapSettings } from "#src/store";

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

  const { normalMapImage, normalMapImageLoading } = useNormalMapImage();
  const { normalMapSettings, setNormalMapSettings } = useNormalMapSettings();

  const initialSettings = useMemo(
    () => ({
      colorSpace: "linear" as const,
      filterRadius: "0",
      invertX: false,
      invertY: false,
      invertZ: false,
      strength: "0",
    }),
    [],
  );

  const [settingsValue, setSettingsValue] = useState(initialSettings);

  const settingsLoading = useMemo<boolean>(
    () => normalMapImageLoading,
    [normalMapImageLoading],
  );

  const settingsDisabled = useMemo<boolean>(
    () => !normalMapImage?.url || settingsLoading,
    [normalMapImage?.url, settingsLoading],
  );

  const cta = useCallback<AsyncFunc<void, [settings: typeof initialSettings]>>(
    async (settings) => {
      if (
        settingsDisabled ||
        !settings.strength ||
        isNaN(+settings.strength) ||
        +settings.strength < 1 ||
        +settings.strength > 10
      )
        return;

      return setNormalMapSettings({
        colorSpace: settings.colorSpace,
        filterRadius: +settings.filterRadius,
        invertX: settings.invertX,
        invertY: settings.invertY,
        invertZ: settings.invertZ,
        strength: +settings.strength,
      });
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
      colorSpace: (normalMapSettings.colorSpace as "linear") || "linear",
      filterRadius: normalMapSettings.filterRadius.toString() || "0",
      invertX: !!normalMapSettings.invertX,
      invertY: !!normalMapSettings.invertY,
      invertZ: !!normalMapSettings.invertZ,
      strength: normalMapSettings.strength.toString() || "0",
    });
  }, [
    normalMapSettings.colorSpace,
    normalMapSettings.filterRadius,
    normalMapSettings.invertX,
    normalMapSettings.invertY,
    normalMapSettings.invertZ,
    normalMapSettings.strength,
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
