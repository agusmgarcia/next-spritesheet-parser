import { delay } from "@agusmgarcia/react-core";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useSpriteSheet } from "#src/store";
import { useViewport } from "#src/utils";

import type ToolBarProps from "./ToolBar.types";

export default function useToolBar(props: ToolBarProps) {
  const { push } = useRouter();
  const viewport = useViewport();

  const { createAnimation, selected, set, sprites, unselectAll } =
    useSpriteSheet();

  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [downloadFileLoading, setDownloadFileLoading] = useState(false);
  const [createAnimationLoading, setCreateAnimationLoading] = useState(false);

  const uploadFileOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    // TODO: handle errors.
    openFile().then((file) => {
      if (!file) return;
      setUploadFileLoading(true);
      set(file).finally(() => setUploadFileLoading(false));
    });
  }, [set]);

  const createAnimationOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    setCreateAnimationLoading(true);
    createAnimation()
      .then((id) => push(`/animations/${id}`))
      .finally(() => setCreateAnimationLoading(false));
  }, [createAnimation, push]);

  const downloadFileOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    // TODO: handle errors.
    setDownloadFileLoading(true);
    // TODO: export it all.
    delay(5000).finally(() => setDownloadFileLoading(false));
  }, []);

  const resetSelectionOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => unselectAll(), [unselectAll]);

  return {
    ...props,
    createAnimationDisabled:
      uploadFileLoading ||
      createAnimationLoading ||
      downloadFileLoading ||
      !selected.length,
    createAnimationOnClick,
    downloadFileDisabled:
      uploadFileLoading ||
      createAnimationLoading ||
      downloadFileLoading ||
      !sprites.length,
    downloadFileLoading,
    downloadFileOnClick,
    resetSelectionDisabled:
      uploadFileLoading ||
      createAnimationLoading ||
      downloadFileLoading ||
      !selected.length,
    resetSelectionOnClick,
    uploadFileDisabled:
      uploadFileLoading || createAnimationLoading || downloadFileLoading,
    uploadFileLoading,
    uploadFileOnClick,
    viewport,
  };
}

function openFile(): Promise<File | undefined> {
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
    input.accept = "image/*";
    input.click();
  });
}
