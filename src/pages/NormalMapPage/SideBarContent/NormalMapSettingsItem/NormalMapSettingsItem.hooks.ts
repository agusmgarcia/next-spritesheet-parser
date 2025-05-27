import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import { useNormalMap } from "#src/store";

import type NormalMapSettingsItemProps from "./NormalMapSettingsItem.types";

export default function useNormalMapSettingsItem(
  props: NormalMapSettingsItemProps,
) {
  const {
    normalMapSettingsButtonDisabled,
    normalMapSettingsDisabled,
    normalMapSettingsInvertXId,
    normalMapSettingsInvertYId,
    normalMapSettingsLoading,
    normalMapSettingsOnChange,
    normalMapSettingsOnClick,
    normalMapSettingsValue,
  } = useNormalMapSettings();

  return {
    ...props,
    normalMapSettingsButtonDisabled,
    normalMapSettingsDisabled,
    normalMapSettingsInvertXId,
    normalMapSettingsInvertYId,
    normalMapSettingsLoading,
    normalMapSettingsOnChange,
    normalMapSettingsOnClick,
    normalMapSettingsValue,
  };
}

function useNormalMapSettings() {
  const normalMapSettingsInvertXId = useId();
  const normalMapSettingsInvertYId = useId();

  const { normalMap, normalMapLoading, setNormalMapSettings } = useNormalMap();

  const initialNormalMapSettings = useMemo(
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

  const [normalMapSettingsValue, setNormalMapSettingsValue] = useState(
    initialNormalMapSettings,
  );

  const normalMapSettingsDisabled = useMemo<boolean>(
    () => !normalMap?.image.url || normalMapLoading,
    [normalMap?.image.url, normalMapLoading],
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
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      })),
    [],
  );

  const normalMapSettingsOnClick = useCallback<Func>(() => {
    setNormalMapSettings({
      colorSpace: normalMapSettingsValue.colorSpace,
      filterRadius: +normalMapSettingsValue.filterRadius,
      invertX: normalMapSettingsValue.invertX,
      invertY: normalMapSettingsValue.invertY,
      invertZ: normalMapSettingsValue.invertZ,
      strength: +normalMapSettingsValue.strength,
    });
  }, [
    setNormalMapSettings,
    normalMapSettingsValue.colorSpace,
    normalMapSettingsValue.filterRadius,
    normalMapSettingsValue.invertX,
    normalMapSettingsValue.invertY,
    normalMapSettingsValue.invertZ,
    normalMapSettingsValue.strength,
  ]);

  useEffect(() => {
    setNormalMapSettingsValue({
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
    normalMapSettingsButtonDisabled,
    normalMapSettingsDisabled,
    normalMapSettingsInvertXId,
    normalMapSettingsInvertYId,
    normalMapSettingsLoading: normalMapLoading,
    normalMapSettingsOnChange,
    normalMapSettingsOnClick,
    normalMapSettingsValue,
  };
}
