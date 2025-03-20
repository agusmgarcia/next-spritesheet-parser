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

  const { exportFileDisabled, exportFileLoading, exportFileOnClick } =
    useExportFile();

  return {
    ...props,
    exportFileDisabled,
    exportFileLoading,
    exportFileOnClick,
    heading,
  };
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
