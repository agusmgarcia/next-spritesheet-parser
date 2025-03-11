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

  const {
    disabled: importFileDisabled,
    loading: importFileLoading,
    onClick: importFileOnClick,
  } = useImportFile();

  const {
    disabled: exportFileDisabled,
    loading: exportFileLoading,
    onClick: exportFileOnClick,
  } = useExportFile();

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
  const { createSpriteSheet, spriteSheet } = useSpriteSheet();

  const [loading, setLoading] = useState(false);

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

  const onClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    // TODO: handle errors.
    importFile(!spriteSheet ? "image/*" : "image/*,application/json").then(
      (file) => {
        if (!file) return;

        setLoading(true);
        if (file.type.startsWith("image/"))
          createSpriteSheet(file).finally(() => setLoading(false));
        else
          file
            .text()
            .then((text) => JSON.parse(text))
            .then((json) => setAnimations(json.animations))
            .finally(() => setLoading(false));
      },
    );
  }, [createSpriteSheet, importFile, setAnimations, spriteSheet]);

  return { disabled: loading, loading, onClick };
}

function useExportFile() {
  const { animations } = useAnimations();
  const { spriteSheet } = useSpriteSheet();

  const [loading, setLoading] = useState(false);

  const exportFile = useCallback<
    AsyncFunc<void, [spriteSheet: SpriteSheet, animations: Animations]>
  >(
    (spriteSheet, animations) =>
      new Promise((resolve) => {
        const anchor = document.createElement("a");

        anchor.href =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify({ ...spriteSheet, animations }));

        anchor.setAttribute(
          "download",
          `${spriteSheet.name.split(".").slice(0, -1).join(".") || spriteSheet.name}.json`,
        );

        anchor.click();

        resolve();
      }),
    [],
  );

  const onClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (!spriteSheet) return;

    // TODO: handle errors.
    setLoading(true);
    exportFile(spriteSheet, animations).finally(() => setLoading(false));
  }, [animations, exportFile, spriteSheet]);

  return {
    disabled: loading || !spriteSheet,
    loading,
    onClick,
  };
}
