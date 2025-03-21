import { type AsyncFunc, type Func } from "@agusmgarcia/react-core";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  type Animations,
  type SpriteSheet,
  useAnimations,
  useSpriteSheet,
} from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { importFileDisabled, importFileLoading, importFileOnClick } =
    useImportFile();

  const { exportFileDisabled, exportFileLoading, exportFileOnClick } =
    useExportFile();

  const {
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
  } = useSpriteIds();

  const { createAnimationDisabled, createAnimationOnClick } =
    useCreateAnimation({ spriteIds });

  const { resetSelectionDisabled, resetSelectionOnClick } = useResetSelection({
    spriteIds,
    spriteIdsOnUnselectAll,
  });

  const { mergeSpritesDisabled, mergeSpritesLoading, mergeSpritesOnClick } =
    useMergeSprites({ spriteIds, spriteIdsOnUnselectAll });

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
    mergeSpritesLoading,
    mergeSpritesOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
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

  const importFileOnClick = useCallback<Func>(() => {
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

  const exportFileOnClick = useCallback<Func>(() => {
    if (!spriteSheet) return;

    // TODO: handle errors.
    setExportFileLoading(true);
    exportFile(spriteSheet, animations).finally(() =>
      setExportFileLoading(false),
    );
  }, [animations, exportFile, spriteSheet]);

  return { exportFileDisabled, exportFileLoading, exportFileOnClick };
}

function useSpriteIds() {
  const { spriteSheet } = useSpriteSheet();

  const initialSpriteIds = useMemo<string[]>(() => [], []);

  const [spriteIds, setSpriteIds] = useState(initialSpriteIds);

  const spriteIdsOnToggle = useCallback<Func<void, [spriteId: string]>>(
    (spriteId) =>
      setSpriteIds((prev) =>
        prev.includes(spriteId)
          ? prev.filter((sId) => sId !== spriteId)
          : [...prev, spriteId],
      ),
    [],
  );

  const spriteIdsOnSelect = useCallback<Func<void, [spriteId: string]>>(
    (spriteId) =>
      setSpriteIds((prev) =>
        prev.includes(spriteId) ? prev : [...prev, spriteId],
      ),
    [],
  );

  const spriteIdsOnUnselectAll = useCallback<Func>(
    () => setSpriteIds(initialSpriteIds),
    [initialSpriteIds],
  );

  useEffect(() => {
    setSpriteIds(initialSpriteIds);
  }, [initialSpriteIds, spriteSheet]);

  return {
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
  };
}

function useCreateAnimation({
  spriteIds: spriteIdsFromProps,
}: Pick<ReturnType<typeof useSpriteIds>, "spriteIds">) {
  const { push } = useRouter();

  const { createAnimation } = useAnimations();

  const [createAnimationLoading, setCreateAnimationLoading] = useState(false);

  const createAnimationDisabled = useMemo<boolean>(
    () => !spriteIdsFromProps.length || createAnimationLoading,
    [createAnimationLoading, spriteIdsFromProps.length],
  );

  const createAnimationOnClick = useCallback<Func>(() => {
    if (!spriteIdsFromProps.length) return;
    setCreateAnimationLoading(true);
    createAnimation(spriteIdsFromProps)
      .then((id) => push(`/animations/${id}`))
      .finally(() => setCreateAnimationLoading(false));
  }, [createAnimation, spriteIdsFromProps, push]);

  return { createAnimationDisabled, createAnimationOnClick };
}

function useResetSelection({
  spriteIds: spriteIdsFromProps,
  spriteIdsOnUnselectAll: spriteIdsOnUnselectAllFromProps,
}: Pick<
  ReturnType<typeof useSpriteIds>,
  "spriteIds" | "spriteIdsOnUnselectAll"
>) {
  const resetSelectionDisabled = useMemo<boolean>(
    () => !spriteIdsFromProps.length,
    [spriteIdsFromProps.length],
  );

  const resetSelectionOnClick = useCallback<Func>(
    () => spriteIdsOnUnselectAllFromProps(),
    [spriteIdsOnUnselectAllFromProps],
  );

  return { resetSelectionDisabled, resetSelectionOnClick };
}

function useMergeSprites({
  spriteIds: spriteIdsFromProps,
  spriteIdsOnUnselectAll: spriteIdsOnUnselectAllFromProps,
}: Pick<
  ReturnType<typeof useSpriteIds>,
  "spriteIds" | "spriteIdsOnUnselectAll"
>) {
  const { mergeSpriteSheetSprites } = useSpriteSheet();

  const [mergeSpritesLoading, setMergeSpritesLoading] = useState(false);

  const mergeSpritesDisabled = useMemo<boolean>(
    () => spriteIdsFromProps.length <= 1 || mergeSpritesLoading,
    [mergeSpritesLoading, spriteIdsFromProps.length],
  );

  const mergeSpritesOnClick = useCallback<Func>(() => {
    setMergeSpritesLoading(true);
    mergeSpriteSheetSprites(spriteIdsFromProps)
      .then(spriteIdsOnUnselectAllFromProps)
      .finally(() => setMergeSpritesLoading(false));
  }, [
    mergeSpriteSheetSprites,
    spriteIdsFromProps,
    spriteIdsOnUnselectAllFromProps,
  ]);

  return { mergeSpritesDisabled, mergeSpritesLoading, mergeSpritesOnClick };
}
