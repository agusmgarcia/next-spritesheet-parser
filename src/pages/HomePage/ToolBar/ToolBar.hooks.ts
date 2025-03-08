import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  type Animations,
  type SpriteSheet,
  useAnimations,
  useSpriteSheet,
} from "#src/store";
import { useViewport } from "#src/utils";

import type ToolBarProps from "./ToolBar.types";

export default function useToolBar({
  indices,
  unselectAll,
  ...props
}: ToolBarProps) {
  const { push } = useRouter();
  const viewport = useViewport();

  const { animations, createAnimation, setAnimations } = useAnimations();
  const { createSpriteSheet, spriteSheet } = useSpriteSheet();

  const [animationSelectorValue, setAnimationSelectorValue] = useState("sheet");
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [downloadFileLoading, setDownloadFileLoading] = useState(false);
  const [createAnimationLoading, setCreateAnimationLoading] = useState(false);
  const [animationSelectorLoading, setAnimationSelectorLoading] =
    useState(false);

  const animationSelectorOptions = useMemo<{ id: string; name: string }[]>(
    () => [
      { id: "sheet", name: "Sprite Sheet" },
      ...animations.map((a) => ({ id: a.id, name: a.name })),
    ],
    [animations],
  );

  const animationSelectorOnChange = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((event) => setAnimationSelectorValue(event.target.value), []);

  const uploadFileOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    // TODO: handle errors.
    importFile(!spriteSheet ? "image/*" : "image/*,application/json").then(
      (file) => {
        if (!file) return;

        setUploadFileLoading(true);

        if (file.type.startsWith("image/"))
          createSpriteSheet(file).finally(() => setUploadFileLoading(false));
        else
          file
            .text()
            .then((text) => JSON.parse(text))
            .then((json) => setAnimations(json.animations))
            .finally(() => setUploadFileLoading(false));
      },
    );
  }, [createSpriteSheet, setAnimations, spriteSheet]);

  const createAnimationOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (!indices.length) return;
    setCreateAnimationLoading(true);
    createAnimation(indices)
      .then((id) => push(`/animations/${id}`))
      .finally(() => setCreateAnimationLoading(false));
  }, [createAnimation, indices, push]);

  const downloadFileOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (!spriteSheet) return;

    // TODO: handle errors.
    setDownloadFileLoading(true);
    exportFile(spriteSheet, animations).finally(() =>
      setDownloadFileLoading(false),
    );
  }, [animations, spriteSheet]);

  const resetSelectionOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => unselectAll(), [unselectAll]);

  useEffect(() => {
    if (animationSelectorValue === "sheet") return;

    const animation = animations.find((a) => a.id === animationSelectorValue);
    if (!animation) return;

    setAnimationSelectorLoading(true);
    try {
      push(`/animations/${animation.id}`);
    } finally {
      setAnimationSelectorLoading(false);
    }
  }, [animationSelectorValue, animations, push]);

  return {
    ...props,
    animationSelectorDisabled:
      animationSelectorLoading ||
      uploadFileLoading ||
      createAnimationLoading ||
      downloadFileLoading,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
    createAnimationDisabled:
      animationSelectorLoading ||
      uploadFileLoading ||
      createAnimationLoading ||
      downloadFileLoading ||
      !indices.length,
    createAnimationOnClick,
    downloadFileDisabled:
      animationSelectorLoading ||
      uploadFileLoading ||
      createAnimationLoading ||
      downloadFileLoading ||
      !spriteSheet,
    downloadFileLoading,
    downloadFileOnClick,
    resetSelectionDisabled:
      animationSelectorLoading ||
      uploadFileLoading ||
      createAnimationLoading ||
      downloadFileLoading ||
      !indices.length,
    resetSelectionOnClick,
    uploadFileDisabled:
      animationSelectorLoading ||
      uploadFileLoading ||
      createAnimationLoading ||
      downloadFileLoading,
    uploadFileLoading,
    uploadFileOnClick,
    viewport,
  };
}

function importFile(accept: string): Promise<File | undefined> {
  return new Promise((resolve) => {
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
  });
}

function exportFile(
  spriteSheet: SpriteSheet,
  animations: Animations,
): Promise<void> {
  return new Promise((resolve) => {
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
  });
}
