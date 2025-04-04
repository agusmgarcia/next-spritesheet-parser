import { type AsyncFunc, type Func } from "@agusmgarcia/react-core";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import {
  type Animations,
  type SpriteSheet,
  useAnimations,
  useError,
  useSettings,
  useSpriteSelection,
  useSpriteSheet,
} from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { importFileDisabled, importFileLoading, importFileOnClick } =
    useImportFile();

  const { exportFileDisabled, exportFileLoading, exportFileOnClick } =
    useExportFile();

  const { createAnimationDisabled, createAnimationOnClick } =
    useCreateAnimation();

  const { resetSelectionDisabled, resetSelectionOnClick } = useResetSelection();

  const { mergeSpritesDisabled, mergeSpritesOnClick } = useMergeSprites();

  return {
    ...props,
    createAnimationDisabled,
    createAnimationOnClick,
    exportFileDisabled,
    exportFileLoading,
    exportFileOnClick,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
    mergeSpritesDisabled,
    mergeSpritesOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
  };
}

function useImportFile() {
  const { setAnimations } = useAnimations();
  const { setError } = useError();
  const { setImage, setSettings } = useSettings();
  const { setSpriteSheet, spriteSheet, spriteSheetLoading } = useSpriteSheet();

  const [importFileLoading, setImportFileLoading] = useState(false);

  const importFileDisabled = useMemo<boolean>(
    () => importFileLoading,
    [importFileLoading],
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
    importFile(!spriteSheet ? "image/*" : "image/*,application/json")
      .then((file) => {
        if (!file) return;

        setImportFileLoading(true);

        if (file.type.startsWith("image/")) {
          setImage(file);
          setImportFileLoading(false);
        } else {
          file
            .text()
            .then((text) => JSON.parse(text))
            .then((json) => {
              setSettings(json.settings);
              setSpriteSheet(json.spriteSheet);
              setAnimations(json.animations);
            })
            .catch((error) => setError(error.message))
            .finally(() => setImportFileLoading(false));
        }
      })
      .catch((error) => setError(error.message));
  }, [
    importFile,
    setAnimations,
    setError,
    setImage,
    setSettings,
    setSpriteSheet,
    spriteSheet,
  ]);

  return {
    importFileDisabled,
    importFileLoading: importFileLoading || spriteSheetLoading,
    importFileOnClick,
  };
}

function useExportFile() {
  const { animations } = useAnimations();
  const { setError } = useError();
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

        resolve();
      }),
    [],
  );

  const exportFileOnClick = useCallback<Func>(() => {
    if (!spriteSheet) return;

    setExportFileLoading(true);
    exportFile(spriteSheet, animations)
      .catch((error) => setError(error.message))
      .finally(() => setExportFileLoading(false));
  }, [animations, exportFile, setError, spriteSheet]);

  return { exportFileDisabled, exportFileLoading, exportFileOnClick };
}

function useCreateAnimation() {
  const { push } = useRouter();

  const { createAnimation } = useAnimations();
  const { spriteSelection } = useSpriteSelection();

  const createAnimationDisabled = useMemo<boolean>(
    () => !spriteSelection.length,
    [spriteSelection.length],
  );

  const createAnimationOnClick = useCallback<Func>(() => {
    const animationId = createAnimation(spriteSelection);
    if (!animationId) return;
    push(`/animations/${animationId}`);
  }, [createAnimation, spriteSelection, push]);

  return { createAnimationDisabled, createAnimationOnClick };
}

function useResetSelection() {
  const { spriteSelection, unselectAllSprites } = useSpriteSelection();

  const resetSelectionDisabled = useMemo<boolean>(
    () => !spriteSelection.length,
    [spriteSelection.length],
  );

  const resetSelectionOnClick = useCallback<Func>(
    () => unselectAllSprites(),
    [unselectAllSprites],
  );

  return { resetSelectionDisabled, resetSelectionOnClick };
}

function useMergeSprites() {
  const { mergeSprites } = useSpriteSheet();
  const { spriteSelection } = useSpriteSelection();

  const mergeSpritesDisabled = useMemo<boolean>(
    () => spriteSelection.length <= 1,
    [spriteSelection.length],
  );

  const mergeSpritesOnClick = useCallback<Func>(() => {
    mergeSprites(spriteSelection);
  }, [mergeSprites, spriteSelection]);

  return { mergeSpritesDisabled, mergeSpritesOnClick };
}
