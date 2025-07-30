import { errors, type Func } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useSpriteSheet } from "#src/store";

import type SettingsItemProps from "./SettingsItem.types";

export default function useSettingsItem(props: SettingsItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem();

  const {
    settingsDisabled,
    settingsOnChange,
    settingsOnMouseUp,
    settingsValue,
  } = useSettings();

  return {
    ...props,
    defaultCollapsed,
    disabled,
    settingsDisabled,
    settingsOnChange,
    settingsOnMouseUp,
    settingsValue,
  };
}

function useSideBarItem() {
  const { spriteSheet } = useSpriteSheet();

  const disabled = useMemo<boolean>(
    () => !spriteSheet?.image.url,
    [spriteSheet?.image.url],
  );

  const defaultCollapsed = useMemo<boolean>(() => true, []);

  return { defaultCollapsed, disabled };
}

function useSettings() {
  const { setSpriteSheetSettings, spriteSheet, spriteSheetLoading } =
    useSpriteSheet();

  const initialSettings = useMemo(
    () => ({
      delta: "0",
      maxVariation: "0",
      minDiversity: "0",
    }),
    [],
  );

  const [settingsValue, setSettingsValue] = useState(initialSettings);
  const [loading, setLoading] = useState(false);

  const settingsLoading = useMemo<boolean>(
    () => spriteSheetLoading || loading,
    [loading, spriteSheetLoading],
  );

  const settingsDisabled = useMemo<boolean>(
    () => !spriteSheet?.image.url || settingsLoading,
    [settingsLoading, spriteSheet],
  );

  const settingsCTADisabled = useMemo<boolean>(
    () =>
      settingsDisabled ||
      !settingsValue.delta ||
      isNaN(+settingsValue.delta) ||
      +settingsValue.delta < 1 ||
      +settingsValue.delta > 20 ||
      !settingsValue.maxVariation ||
      isNaN(+settingsValue.maxVariation) ||
      +settingsValue.maxVariation < 0.01 ||
      +settingsValue.maxVariation > 1 ||
      !settingsValue.minDiversity ||
      isNaN(+settingsValue.minDiversity) ||
      +settingsValue.minDiversity < 0.01 ||
      +settingsValue.minDiversity > 1,
    [
      settingsDisabled,
      settingsValue.delta,
      settingsValue.maxVariation,
      settingsValue.minDiversity,
    ],
  );

  const settingsOnChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (settingsDisabled) return;
      setSettingsValue((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    [settingsDisabled],
  );

  const settingsOnMouseUp = useCallback<Func>(() => {
    if (settingsCTADisabled) return;
    setLoading(true);
    setSpriteSheetSettings({
      delta: +settingsValue.delta,
      maxVariation: +settingsValue.maxVariation,
      minDiversity: +settingsValue.minDiversity,
    })
      .then((result) => (!result ? errors.emit("error") : undefined))
      .catch(() =>
        setSettingsValue({
          delta: spriteSheet?.settings.delta.toString() || "0",
          maxVariation: spriteSheet?.settings.maxVariation.toString() || "0",
          minDiversity: spriteSheet?.settings.minDiversity.toString() || "0",
        }),
      )
      .finally(() => setLoading(false));
  }, [
    setSpriteSheetSettings,
    settingsCTADisabled,
    settingsValue.delta,
    settingsValue.maxVariation,
    settingsValue.minDiversity,
    spriteSheet?.settings.delta,
    spriteSheet?.settings.maxVariation,
    spriteSheet?.settings.minDiversity,
  ]);

  useEffect(() => {
    setSettingsValue({
      delta: spriteSheet?.settings.delta.toString() || "0",
      maxVariation: spriteSheet?.settings.maxVariation.toString() || "0",
      minDiversity: spriteSheet?.settings.minDiversity.toString() || "0",
    });
  }, [
    spriteSheet?.settings.delta,
    spriteSheet?.settings.maxVariation,
    spriteSheet?.settings.minDiversity,
  ]);

  return {
    settingsDisabled,
    settingsOnChange,
    settingsOnMouseUp,
    settingsValue,
  };
}
