import { type AsyncFunc, type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAnimations, useSpriteSheet } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const {
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
  } = useSpriteIds();

  const { importFileDisabled, importFileLoading, importFileOnClick } =
    useImportFile();

  return {
    ...props,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
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
