import { type AsyncFunc, type Func } from "@agusmgarcia/react-core";
import { useCallback, useMemo, useState } from "react";

import {
  useNormalMap,
  useNotification,
  useSpriteSheet,
  useUtils,
} from "#src/store";
import { getErrorMessage, useKeyDown } from "#src/utils";

import type FilesItemProps from "./FilesItem.types";

export default function useFilesItem(props: FilesItemProps) {
  const { importFileDisabled, importFileLoading, importFileOnClick } =
    useImportFile();

  const { exportFileDisabled, exportFileOnClick } = useExportFile();

  const { nameDisabled, nameOnChange, nameTermination, nameValue } = useName();

  const { removeSpriteSheetDisabled, removeSpriteSheetOnClick } =
    useRemoveSpriteSheet();

  return {
    ...props,
    exportFileDisabled,
    exportFileOnClick,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
    nameDisabled,
    nameOnChange,
    nameTermination,
    nameValue,
    removeSpriteSheetDisabled,
    removeSpriteSheetOnClick,
  };
}

function useImportFile() {
  const { setNotification } = useNotification();
  const { importJSONFile } = useUtils();
  const { setSpriteSheetImage, spriteSheet, spriteSheetLoading } =
    useSpriteSheet();
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

    importFile(!spriteSheet?.image.url ? "image/*" : "image/*,application/json")
      .then((file) => {
        setImportFileLoading(true);
        if (!file) return;
        return file.type.startsWith("image/")
          ? setSpriteSheetImage(file)
          : file
              .text()
              .then((text) => JSON.parse(text))
              .then((jsonFile) => importJSONFile(jsonFile));
      })
      .catch((error) => setNotification("error", getErrorMessage(error)))
      .finally(() => setImportFileLoading(false));
  }, [
    importFile,
    importFileDisabled,
    importJSONFile,
    setNotification,
    setSpriteSheetImage,
    spriteSheet?.image.url,
  ]);

  useKeyDown("i", importFileOnClick);

  return {
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
  };
}

function useExportFile() {
  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();
  const { normalMap, normalMapLoading } = useNormalMap();
  const { exportZip } = useUtils();

  const [exportFileLoading, setExportFileLoading] = useState(false);

  const exportFileDisabled = useMemo<boolean>(
    () =>
      exportFileLoading ||
      !spriteSheet?.image.url ||
      spriteSheetLoading ||
      !normalMap?.image.url ||
      normalMapLoading,
    [
      exportFileLoading,
      normalMap?.image.url,
      normalMapLoading,
      spriteSheet?.image.url,
      spriteSheetLoading,
    ],
  );

  const exportFileOnClick = useCallback<Func>(() => {
    if (exportFileDisabled) return;

    setExportFileLoading(true);
    exportZip()
      .then((file) => {
        const anchor = document.createElement("a");
        const href = URL.createObjectURL(file);
        anchor.href = href;
        anchor.setAttribute("download", file.name);
        anchor.click();
        URL.revokeObjectURL(href);
      })
      .finally(() => setExportFileLoading(false));
  }, [exportFileDisabled, exportZip]);

  useKeyDown("e", exportFileOnClick);

  return {
    exportFileDisabled,
    exportFileOnClick,
  };
}

function useName() {
  const { setSpriteSheetName, spriteSheet, spriteSheetLoading } =
    useSpriteSheet();

  const nameDisabled = useMemo<boolean>(
    () => !spriteSheet?.image.url || spriteSheetLoading,
    [spriteSheet?.image.url, spriteSheetLoading],
  );

  const nameValue = useMemo<string>(
    () => (!!spriteSheet?.image.url ? spriteSheet.image.name : "Sprite sheet"),
    [spriteSheet],
  );

  const nameTermination = useMemo<string>(
    () =>
      !!spriteSheet?.image.type
        ? `.${spriteSheet.image.type.replace("image/", "")}`
        : ".png",
    [spriteSheet?.image.type],
  );

  const nameOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setSpriteSheetName(event.target.value),
    [setSpriteSheetName],
  );

  return { nameDisabled, nameOnChange, nameTermination, nameValue };
}

function useRemoveSpriteSheet() {
  const { removeSpriteSheet, spriteSheet, spriteSheetLoading } =
    useSpriteSheet();

  const removeSpriteSheetDisabled = useMemo<boolean>(
    () => !spriteSheet?.image.url || spriteSheetLoading,
    [spriteSheet?.image.url, spriteSheetLoading],
  );

  const removeSpriteSheetOnClick = useCallback<Func>(() => {
    if (removeSpriteSheetDisabled) return;
    removeSpriteSheet();
  }, [removeSpriteSheet, removeSpriteSheetDisabled]);

  useKeyDown("r", removeSpriteSheetOnClick);

  return { removeSpriteSheetDisabled, removeSpriteSheetOnClick };
}
