import { type AsyncFunc, type Func } from "@agusmgarcia/react-core";
import { downloadZip } from "client-zip";
import { useCallback, useMemo, useState } from "react";

import {
  type Animation,
  type NormalMap,
  type SpriteSheet,
  useAnimations,
  useImportJSONFile,
  useNormalMap,
  useNotification,
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
  const { importJSONFile } = useImportJSONFile();
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
  const { animations } = useAnimations();
  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();
  const { normalMap, normalMapLoading } = useNormalMap();

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

  const exportFile = useCallback<
    AsyncFunc<
      void,
      [spriteSheet: SpriteSheet, animations: Animation[], normalMap: NormalMap]
    >
  >(async (spriteSheet, animations, normalMap) => {
    const [spriteSheetJSON, spriteSheetImage, normalMapImage] =
      await Promise.all([
        fetch(
          "data:text/json;charset=utf-8," +
            encodeURIComponent(
              JSON.stringify({
                animations,
                normalMap,
                spriteSheet,
                version: process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0",
              }),
            ),
        )
          .then((response) => response.blob())
          .then((blob) => ({
            input: blob,
            lastModified: new Date(),
            name: `${spriteSheet.image.name.split(".").slice(0, -1).join(".")}.json`,
          })),

        fetch(spriteSheet.image.url)
          .then((response) => response.blob())
          .then((blob) => ({
            input: blob,
            lastModified: new Date(),
            name: spriteSheet.image.name,
          })),

        fetch(normalMap.image.url)
          .then((response) => response.blob())
          .then((blob) => ({
            input: blob,
            lastModified: new Date(),
            name: normalMap.image.name,
          })),
        ,
      ]);

    const blob = await downloadZip([
      spriteSheetJSON,
      spriteSheetImage,
      normalMapImage,
    ]).blob();

    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);

    anchor.setAttribute(
      "download",
      `${spriteSheet.image.name.split(".").slice(0, -1).join(".")}.zip`,
    );

    anchor.click();

    URL.revokeObjectURL(anchor.href);
  }, []);

  const exportFileOnClick = useCallback<Func>(() => {
    if (exportFileDisabled) return;
    if (!spriteSheet) return;
    if (!normalMap) return;

    setExportFileLoading(true);
    exportFile(spriteSheet, animations, normalMap).finally(() =>
      setExportFileLoading(false),
    );
  }, [animations, exportFile, exportFileDisabled, normalMap, spriteSheet]);

  useKeyDown("e", exportFileOnClick);

  return {
    exportFileDisabled,
    exportFileOnClick,
  };
}
