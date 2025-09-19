import { errors, type Func } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useSpriteSheet,
  useSpriteSheetImage,
  useSpriteSheetSettings,
} from "#src/store";

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
  const { spriteSheetImage } = useSpriteSheetImage();

  const disabled = useMemo<boolean>(
    () => !spriteSheetImage?.url,
    [spriteSheetImage?.url],
  );

  const defaultCollapsed = useMemo<boolean>(() => true, []);

  return { defaultCollapsed, disabled };
}

function useSettings() {
  const { spriteSheetLoading } = useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();
  const { setSpriteSheetSettings, spriteSheetSettings } =
    useSpriteSheetSettings();

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
    () => loading || spriteSheetImageLoading || spriteSheetLoading,
    [loading, spriteSheetImageLoading, spriteSheetLoading],
  );

  const settingsDisabled = useMemo<boolean>(
    () => !spriteSheetImage?.url || settingsLoading,
    [settingsLoading, spriteSheetImage?.url],
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
          delta: spriteSheetSettings?.delta.toString() || "0",
          maxVariation: spriteSheetSettings?.maxVariation.toString() || "0",
          minDiversity: spriteSheetSettings?.minDiversity.toString() || "0",
        }),
      )
      .finally(() => setLoading(false));
  }, [
    setSpriteSheetSettings,
    settingsCTADisabled,
    settingsValue.delta,
    settingsValue.maxVariation,
    settingsValue.minDiversity,
    spriteSheetSettings?.delta,
    spriteSheetSettings?.maxVariation,
    spriteSheetSettings?.minDiversity,
  ]);

  useEffect(() => {
    setSettingsValue({
      delta: spriteSheetSettings?.delta.toString() || "0",
      maxVariation: spriteSheetSettings?.maxVariation.toString() || "0",
      minDiversity: spriteSheetSettings?.minDiversity.toString() || "0",
    });
  }, [
    spriteSheetSettings?.delta,
    spriteSheetSettings?.maxVariation,
    spriteSheetSettings?.minDiversity,
  ]);

  return {
    settingsDisabled,
    settingsOnChange,
    settingsOnMouseUp,
    settingsValue,
  };
}
