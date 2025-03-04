import { twMerge } from "tailwind-merge";

import { Button, Icon } from "#src/components";

import useToolBar from "./ToolBar.hooks";
import type ToolBarProps from "./ToolBar.types";

export default function ToolBar(props: ToolBarProps) {
  const {
    className,
    createAnimationDisabled,
    createAnimationOnClick,
    uploadFileDisabled,
    uploadFileLoading,
    uploadFileOnClick,
    viewport,
  } = useToolBar(props);

  return (
    <div
      className={twMerge(
        "mx-auto flex max-w-screen-md items-center justify-between gap-2",
        "rounded-lg border border-black bg-white p-4 shadow-lg",
        className,
      )}
    >
      <Button
        disabled={uploadFileDisabled}
        onClick={uploadFileOnClick}
        variant="secondary"
      >
        <Icon variant={!uploadFileLoading ? "uploadFile" : "spinner"} />
      </Button>

      <Button
        className="flex items-center gap-1"
        disabled={createAnimationDisabled}
        onClick={createAnimationOnClick}
        variant="primary"
      >
        {viewport !== "Mobile" ? "Create" : ""}
        <Icon variant="roundedPlay" />
      </Button>
    </div>
  );
}
