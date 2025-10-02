import {
  type AsyncFunc,
  errors,
  type Func,
} from "@agusmgarcia/react-essentials-utils";
import { useCallback, useMemo, useState } from "react";

import {
  useNormalMapImage,
  useNotification,
  useSpriteSheet,
  useSpriteSheetImage,
  useSpriteSheetSettings,
  useUtils,
} from "#src/store";
import { useKeyDown } from "#src/utils";

import type FilesItemProps from "./FilesItem.types";

export default function useFilesItem(props: FilesItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem();

  const { importFileDisabled, importFileLoading, importFileOnClick } =
    useImportFile();

  const { exportFileDisabled, exportFileOnClick } = useExportFile();

  const { nameDisabled, nameOnChange, nameTermination, nameValue } = useName();

  const { removeSpriteSheetDisabled, removeSpriteSheetOnClick } =
    useRemoveSpriteSheet();

  return {
    ...props,
    defaultCollapsed,
    disabled,
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

function useSideBarItem() {
  const { spriteSheetImage } = useSpriteSheetImage();

  const disabled = useMemo<boolean>(
    () => !spriteSheetImage?.url,
    [spriteSheetImage?.url],
  );

  const defaultCollapsed = useMemo<boolean>(() => false, []);

  return { defaultCollapsed, disabled };
}

function useImportFile() {
  const { setNotification } = useNotification();
  const { spriteSheetLoading } = useSpriteSheet();
  const { setSpriteSheetImage, spriteSheetImageLoading } =
    useSpriteSheetImage();
  const { normalMapImageLoading } = useNormalMapImage();

  const [importFileLoading, setImportFileLoading] = useState(false);

  const importFileDisabled = useMemo<boolean>(
    () =>
      importFileLoading ||
      spriteSheetImageLoading ||
      spriteSheetLoading ||
      normalMapImageLoading,
    [
      importFileLoading,
      normalMapImageLoading,
      spriteSheetImageLoading,
      spriteSheetLoading,
    ],
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

    importFile("image/*")
      .then((file) => {
        setImportFileLoading(true);
        if (!file) return;
        return setSpriteSheetImage(file);
      })
      .catch((e) => setNotification("error", errors.getMessage(e) || ""))
      .finally(() => setImportFileLoading(false));
  }, [importFile, importFileDisabled, setNotification, setSpriteSheetImage]);

  useKeyDown("i", importFileOnClick);

  return {
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
  };
}

function useExportFile() {
  const { spriteSheetLoading } = useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();
  const { normalMapImage, normalMapImageLoading } = useNormalMapImage();
  const { exportZip } = useUtils();

  const [exportFileLoading, setExportFileLoading] = useState(false);

  const exportFileDisabled = useMemo<boolean>(
    () =>
      exportFileLoading ||
      !spriteSheetImage?.url ||
      spriteSheetImageLoading ||
      spriteSheetLoading ||
      !normalMapImage?.url ||
      normalMapImageLoading,
    [
      exportFileLoading,
      normalMapImage?.url,
      normalMapImageLoading,
      spriteSheetImage?.url,
      spriteSheetImageLoading,
      spriteSheetLoading,
    ],
  );

  const exportFileOnClick = useCallback<Func>(() => {
    if (exportFileDisabled) return;

    setExportFileLoading(true);
    exportZip()
      .then((file) => {
        if (!file) return;
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
  const { spriteSheetLoading } = useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();
  const { setSpriteSheetSettings, spriteSheetSettings } =
    useSpriteSheetSettings();

  const nameDisabled = useMemo<boolean>(
    () =>
      !spriteSheetImage?.url || spriteSheetImageLoading || spriteSheetLoading,
    [spriteSheetImage?.url, spriteSheetImageLoading, spriteSheetLoading],
  );

  const nameValue = useMemo<string>(
    () =>
      !!spriteSheetImage?.url
        ? spriteSheetSettings?.name || ""
        : "Sprite sheet",
    [spriteSheetImage?.url, spriteSheetSettings?.name],
  );

  const nameTermination = useMemo<string>(
    () =>
      !!spriteSheetImage?.type
        ? `.${spriteSheetImage.type.replace("image/", "")}`
        : ".png",
    [spriteSheetImage?.type],
  );

  const nameOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => setSpriteSheetSettings({ name: event.target.value }),
    [setSpriteSheetSettings],
  );

  return { nameDisabled, nameOnChange, nameTermination, nameValue };
}

function useRemoveSpriteSheet() {
  const { spriteSheetLoading } = useSpriteSheet();
  const { removeSpriteSheetImage, spriteSheetImage, spriteSheetImageLoading } =
    useSpriteSheetImage();

  const removeSpriteSheetDisabled = useMemo<boolean>(
    () =>
      !spriteSheetImage?.url || spriteSheetImageLoading || spriteSheetLoading,
    [spriteSheetImage?.url, spriteSheetImageLoading, spriteSheetLoading],
  );

  const removeSpriteSheetOnClick = useCallback<Func>(() => {
    if (removeSpriteSheetDisabled) return;
    removeSpriteSheetImage();
  }, [removeSpriteSheetImage, removeSpriteSheetDisabled]);

  useKeyDown("r", removeSpriteSheetOnClick);

  return { removeSpriteSheetDisabled, removeSpriteSheetOnClick };
}
