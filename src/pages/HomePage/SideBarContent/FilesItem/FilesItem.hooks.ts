import { type AsyncFunc } from "@agusmgarcia/react-core";
import type React from "react";
import { useCallback, useMemo, useState } from "react";

import { type TypographyProps } from "#src/components";
import {
  type Animations,
  type SpriteSheet,
  useAnimations,
  useSpriteSheet,
} from "#src/store";

import type FilesItemProps from "./FilesItem.types";

export default function useFilesItem(props: FilesItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({
      children: "Files",
      variant: "h2",
    }),
    [],
  );

  const { importFileDisabled, importFileLoading, importFileOnClick } =
    useImportFile();

  const { exportFileDisabled, exportFileLoading, exportFileOnClick } =
    useExportFile();

  return {
    ...props,
    exportFileDisabled,
    exportFileLoading,
    exportFileOnClick,
    heading,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
  };
}

function useImportFile() {
  const { setAnimations } = useAnimations();
  const { createSpriteSheet, setSpriteSheet, spriteSheet } = useSpriteSheet();

  const [importFileLoading, setImportFileLoading] = useState(false);

  const importFileDisabled = useMemo<boolean>(
    () => importFileLoading,
    [importFileLoading],
  );

  const importFile = useCallback<AsyncFunc<File | undefined, [accept: string]>>(
    (accept) =>
      new Promise((resolve) => {
        const input = document.createElement("input");

        const handleChange = (event: Event) => {
          input.removeEventListener("change", handleChange);

          const element = event.target as HTMLInputElement;
          if (!!element.files?.length) resolve(element.files[0]);
          else resolve(undefined);
        };

        input.addEventListener("change", handleChange);

        input.type = "file";
        input.accept = accept;
        input.click();
      }),
    [],
  );

  const importFileOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    // TODO: handle errors.
    importFile(!spriteSheet ? "image/*" : "image/*,application/json").then(
      (file) => {
        if (!file) return;

        setImportFileLoading(true);
        if (file.type.startsWith("image/"))
          createSpriteSheet(file).finally(() => setImportFileLoading(false));
        else
          file
            .text()
            .then((text) => JSON.parse(text))
            .then((json) => {
              setSpriteSheet({
                settings: json.settings,
                sprites: json.sprites,
              });
              setAnimations(json.animations);
            })
            .finally(() => setImportFileLoading(false));
      },
    );
  }, [
    createSpriteSheet,
    importFile,
    setAnimations,
    setSpriteSheet,
    spriteSheet,
  ]);

  return { importFileDisabled, importFileLoading, importFileOnClick };
}

function useExportFile() {
  const { animations } = useAnimations();
  const { spriteSheet } = useSpriteSheet();

  const [exportFileLoading, setExportFileLoading] = useState(false);

  const exportFileDisabled = useMemo<boolean>(
    () => exportFileLoading || !spriteSheet,
    [exportFileLoading, spriteSheet],
  );

  const exportFile = useCallback<
    AsyncFunc<void, [spriteSheet: SpriteSheet, animations: Animations]>
  >(
    (spriteSheet, animations) =>
      new Promise((resolve) => {
        const anchor = document.createElement("a");

        anchor.href =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(
            JSON.stringify({
              ...spriteSheet,
              animations,
              version: process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0",
            }),
          );

        anchor.setAttribute(
          "download",
          `${spriteSheet.sheet.name.split(".").slice(0, -1).join(".") || spriteSheet.sheet.name}.json`,
        );

        anchor.click();

        resolve();
      }),
    [],
  );

  const exportFileOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (!spriteSheet) return;

    // TODO: handle errors.
    setExportFileLoading(true);
    exportFile(spriteSheet, animations).finally(() =>
      setExportFileLoading(false),
    );
  }, [animations, exportFile, spriteSheet]);

  return { exportFileDisabled, exportFileLoading, exportFileOnClick };
}
