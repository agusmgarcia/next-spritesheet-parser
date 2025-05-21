import { type AsyncFunc, type Func } from "@agusmgarcia/react-core";
import { useCallback, useMemo, useState } from "react";

import {
  type Animation,
  type NormalMap,
  type NormalMapSettings,
  type Settings,
  type SpriteSheet,
  useAnimations,
  useNormalMap,
  useNormalMapSettings,
  useNotification,
  useSettings,
  useSpriteSheet,
} from "#src/store";
import { getErrorMessage, useKeyDown } from "#src/utils";

import type FilesItemProps from "./FilesItem.types";

export default function useFilesItem(props: FilesItemProps) {
  const { importFileDisabled, importFileLoading, importFileOnClick } =
    useImportFile();

  const { exportFileDisabled, exportFileOnClick } = useExportFile();

  return {
    ...props,
    exportFileDisabled,
    exportFileOnClick,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
  };
}

function useImportFile() {
  const { setNotification } = useNotification();
  const { setImage, setJSONFile } = useSettings();
  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();
  const { normalMapLoading } = useNormalMap();

  const [importFileLoading, setImportFileLoading] = useState(false);

  const importFileDisabled = useMemo<boolean>(
    () => importFileLoading || spriteSheetLoading || normalMapLoading,
    [importFileLoading, normalMapLoading, spriteSheetLoading],
  );

  const importFile = useCallback<AsyncFunc<File | undefined, [accept: string]>>(
    (accept) =>
      new Promise((resolve, reject) => {
        const input = document.createElement("input");

        const handleError = (event: ErrorEvent) => {
          input.removeEventListener("change", handleChange);
          input.removeEventListener("error", handleError);
          reject(event);
        };

        const handleChange = (event: Event) => {
          input.removeEventListener("change", handleChange);
          input.removeEventListener("error", handleError);

          const element = event.target as HTMLInputElement;
          if (!!element.files?.length) resolve(element.files[0]);
          else resolve(undefined);
        };

        input.addEventListener("change", handleChange);
        input.addEventListener("error", handleError);

        input.type = "file";
        input.accept = accept;
        input.click();
      }),
    [],
  );

  const importFileOnClick = useCallback<Func>(() => {
    if (importFileDisabled) return;

    importFile(!spriteSheet ? "image/*" : "image/*,application/json")
      .then((file) => {
        setImportFileLoading(true);
        if (!file) return;
        return file.type.startsWith("image/")
          ? setImage(file)
          : file
              .text()
              .then((text) => JSON.parse(text))
              .then((jsonFile) => setJSONFile(jsonFile));
      })
      .catch((error) => setNotification("error", getErrorMessage(error)))
      .finally(() => setImportFileLoading(false));
  }, [
    importFile,
    importFileDisabled,
    setImage,
    setJSONFile,
    setNotification,
    spriteSheet,
  ]);

  useKeyDown("i", importFileOnClick);

  return {
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
  };
}

function useExportFile() {
  const { animations } = useAnimations();
  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();
  const { settings } = useSettings();
  const { normalMap, normalMapLoading } = useNormalMap();
  const { normalMapSettings } = useNormalMapSettings();

  const exportFileDisabled = useMemo<boolean>(
    () => !spriteSheet || spriteSheetLoading || !normalMap || normalMapLoading,
    [normalMap, normalMapLoading, spriteSheet, spriteSheetLoading],
  );

  const exportFile = useCallback<
    Func<
      void,
      [
        spriteSheet: SpriteSheet,
        settings: Settings,
        animations: Animation[],
        normalMap: NormalMap,
        normalMapSettings: NormalMapSettings,
      ]
    >
  >((spriteSheet, settings, animations, normalMap, normalMapSettings) => {
    const anchor = document.createElement("a");

    anchor.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify({
          animations,
          normalMap,
          normalMapSettings,
          settings,
          spriteSheet,
          version: process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0",
        }),
      );

    anchor.setAttribute(
      "download",
      `${spriteSheet.name.split(".").slice(0, -1).join(".") || spriteSheet.name}.json`,
    );

    anchor.click();
  }, []);

  const exportFileOnClick = useCallback<Func>(() => {
    if (exportFileDisabled) return;
    if (!spriteSheet) return;
    if (!normalMap) return;
    exportFile(spriteSheet, settings, animations, normalMap, normalMapSettings);
  }, [
    animations,
    exportFile,
    exportFileDisabled,
    normalMap,
    normalMapSettings,
    settings,
    spriteSheet,
  ]);

  useKeyDown("e", exportFileOnClick);

  return {
    exportFileDisabled,
    exportFileOnClick,
  };
}
