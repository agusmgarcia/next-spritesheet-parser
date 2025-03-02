import { useCallback, useState } from "react";

import { useSpriteSheet } from "#src/store";

import type ToolBarProps from "./ToolBar.types";

export default function useToolBar(props: ToolBarProps) {
  const { createAnimation, selected, set } = useSpriteSheet();

  const [loading, setLoading] = useState(false);

  const uploadFileOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    // TODO: handle errors.
    openFile().then((file) => {
      if (!file) return;
      setLoading(true);
      set(file).finally(() => setLoading(false));
    });
  }, [set]);

  const createAnimationOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => createAnimation(), [createAnimation]);

  return {
    ...props,
    createAnimationDisabled: loading || !selected.length,
    createAnimationOnClick,
    uploadFileDisabled: loading,
    uploadFileLoading: loading,
    uploadFileOnClick,
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
