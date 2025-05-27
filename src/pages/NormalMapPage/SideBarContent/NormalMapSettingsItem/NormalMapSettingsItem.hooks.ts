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
    () => ({ invertX: false, invertY: false, strength: "0" }),
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
    setNormalMapSettings((prev) => ({
      ...prev,
      invertX: normalMapSettingsValue.invertX,
      invertY: normalMapSettingsValue.invertY,
      strength: +normalMapSettingsValue.strength,
    }));
  }, [
    setNormalMapSettings,
    normalMapSettingsValue.invertX,
    normalMapSettingsValue.invertY,
    normalMapSettingsValue.strength,
  ]);

  useEffect(() => {
    setNormalMapSettingsValue({
      invertX: !!normalMap?.settings.invertX,
      invertY: !!normalMap?.settings.invertY,
      strength: normalMap?.settings.strength.toString() || "0",
    });
  }, [
    normalMap?.settings.invertX,
    normalMap?.settings.invertY,
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
