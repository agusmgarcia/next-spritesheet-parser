import { useCallback, useEffect, useMemo, useState } from "react";

import { type TypographyProps } from "#src/components";
import { useSpriteSheet } from "#src/store";

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

const initialSettings = {
  delta: "0",
  maxArea: "0",
  maxVariation: "0",
  minArea: "0",
  minDiversity: "0",
};

function useSettings() {
  const { setSpriteSheetSettings, spriteSheet } = useSpriteSheet();

  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsValue, setSettingsValue] = useState(initialSettings);

  const settingsDisabled = useMemo<boolean>(
    () => !spriteSheet || settingsLoading,
    [settingsLoading, spriteSheet],
  );

  const settingsButtonDisabled = useMemo<boolean>(
    () =>
      settingsLoading ||
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
      settingsLoading,
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

  const settingsOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (!settingsValue) return;

    setSettingsLoading(true);
    setSpriteSheetSettings({
      delta: +settingsValue.delta,
      maxArea: +settingsValue.maxArea,
      maxVariation: +settingsValue.maxVariation,
      minArea: +settingsValue.minArea,
      minDiversity: +settingsValue.minDiversity,
    }).finally(() => setSettingsLoading(false));
  }, [setSpriteSheetSettings, settingsValue]);

  useEffect(() => {
    setSettingsValue({
      delta: spriteSheet?.settings.delta.toString() || "0",
      maxArea: spriteSheet?.settings.maxArea.toString() || "0",
      maxVariation: spriteSheet?.settings.maxVariation.toString() || "0",
      minArea: spriteSheet?.settings.minArea.toString() || "0",
      minDiversity: spriteSheet?.settings.minDiversity.toString() || "0",
    });
  }, [spriteSheet?.settings]);

  return {
    settingsButtonDisabled,
    settingsDisabled,
    settingsLoading,
    settingsOnChange,
    settingsOnClick,
    settingsValue,
  };
}
