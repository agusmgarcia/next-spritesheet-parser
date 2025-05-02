import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type TypographyProps } from "#src/components";
import {
  useSettings as useSettingsFromStore,
  useSpriteSheet,
} from "#src/store";

import type SettingsItemProps from "./SettingsItem.types";

export default function useSettingsItem(props: SettingsItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({
      children: "Settings",
      variant: "h2",
    }),
    [],
  );

  const {
    settingsButtonDisabled,
    settingsDisabled,
    settingsLoading,
    settingsOnChange,
    settingsOnClick,
    settingsValue,
  } = useSettings();

  return {
    ...props,
    heading,
    settingsButtonDisabled,
    settingsDisabled,
    settingsLoading,
    settingsOnChange,
    settingsOnClick,
    settingsValue,
  };
}

function useSettings() {
  const { setSettings, settings } = useSettingsFromStore();
  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();

  const initialSettings = useMemo(
    () => ({
      delta: "0",
      maxArea: "0",
      maxVariation: "0",
      minArea: "0",
      minDiversity: "0",
    }),
    [],
  );

  const [settingsValue, setSettingsValue] = useState(initialSettings);

  const settingsDisabled = useMemo<boolean>(
    () => !spriteSheet || spriteSheetLoading,
    [spriteSheetLoading, spriteSheet],
  );

  const settingsButtonDisabled = useMemo<boolean>(
    () =>
      !spriteSheet ||
      spriteSheetLoading ||
      !settingsValue.delta ||
      isNaN(+settingsValue.delta) ||
      !settingsValue.maxArea ||
      isNaN(+settingsValue.maxArea) ||
      !settingsValue.maxVariation ||
      isNaN(+settingsValue.maxVariation) ||
      !settingsValue.minArea ||
      isNaN(+settingsValue.minArea) ||
      !settingsValue.minDiversity ||
      isNaN(+settingsValue.minDiversity),
    [
      spriteSheet,
      spriteSheetLoading,
      settingsValue.delta,
      settingsValue.maxArea,
      settingsValue.maxVariation,
      settingsValue.minArea,
      settingsValue.minDiversity,
    ],
  );

  const settingsOnChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) =>
      setSettingsValue((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      })),
    [],
  );

  const settingsOnClick = useCallback<Func>(() => {
    setSettings({
      delta: +settingsValue.delta,
      maxArea: +settingsValue.maxArea,
      maxVariation: +settingsValue.maxVariation,
      minArea: +settingsValue.minArea,
      minDiversity: +settingsValue.minDiversity,
    });
  }, [
    setSettings,
    settingsValue.delta,
    settingsValue.maxArea,
    settingsValue.maxVariation,
    settingsValue.minArea,
    settingsValue.minDiversity,
  ]);

  useEffect(() => {
    setSettingsValue({
      delta: settings.delta.toString() || "0",
      maxArea: settings.maxArea.toString() || "0",
      maxVariation: settings.maxVariation.toString() || "0",
      minArea: settings.minArea.toString() || "0",
      minDiversity: settings.minDiversity.toString() || "0",
    });
  }, [
    settings.delta,
    settings.maxArea,
    settings.maxVariation,
    settings.minArea,
    settings.minDiversity,
  ]);

  return {
    settingsButtonDisabled,
    settingsDisabled,
    settingsLoading: spriteSheetLoading,
    settingsOnChange,
    settingsOnClick,
    settingsValue,
  };
}
