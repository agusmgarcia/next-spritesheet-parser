import { type AsyncFunc, type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  type Animation,
  type SpriteSheet,
  useAnimations,
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
  const { setAnimations } = useAnimations();
  const { setNotification } = useNotification();
  const { setImage, setSettings } = useSettings();
  const { setSpriteSheet, spriteSheet, spriteSheetLoading } = useSpriteSheet();

  const [importFileLoading, setImportFileLoading] = useState(false);

  const importFileDisabled = useMemo<boolean>(
    () => importFileLoading || spriteSheetLoading,
    [importFileLoading, spriteSheetLoading],
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
        if (!file) return;

        setImportFileLoading(true);

        if (file.type.startsWith("image/")) {
          setImage(file);
        } else {
          return file
            .text()
            .then((text) => JSON.parse(text))
            .then((json) => {
              setSettings(json.settings);
              setSpriteSheet(json.spriteSheet);
              setAnimations(json.animations);
            })
            .finally(() => setImportFileLoading(false));
        }
      })
      .catch((error) => setNotification("error", getErrorMessage(error)));
  }, [
    importFile,
    importFileDisabled,
    setAnimations,
    setImage,
    setNotification,
    setSettings,
    setSpriteSheet,
    spriteSheet,
  ]);

  useEffect(() => {
    if (!importFileLoading) return;
    if (spriteSheetLoading) return;
    if (!spriteSheet) return;
    setImportFileLoading(false);
  }, [importFileLoading, spriteSheet, spriteSheetLoading]);

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

  const exportFileDisabled = useMemo<boolean>(
    () => !spriteSheet || spriteSheetLoading,
    [spriteSheet, spriteSheetLoading],
  );

  const exportFile = useCallback<
    Func<void, [spriteSheet: SpriteSheet, animations: Animation[]]>
  >((spriteSheet, animations) => {
    const anchor = document.createElement("a");

    anchor.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify({
          animations,
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
    exportFile(spriteSheet, animations);
  }, [animations, exportFile, exportFileDisabled, spriteSheet]);

  useKeyDown("e", exportFileOnClick);

  return {
    exportFileDisabled,
    exportFileOnClick,
  };
}
