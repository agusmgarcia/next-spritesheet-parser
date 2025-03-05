import { twMerge } from "tailwind-merge";

import { Button, Icon } from "#src/components";

import useToolBar from "./ToolBar.hooks";
import type ToolBarProps from "./ToolBar.types";

export default function ToolBar(props: ToolBarProps) {
  const {
    className,
    createAnimationDisabled,
    createAnimationOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
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
      {/* UPLOAD FILE */}
      <Button
        className="flex items-center gap-1"
        disabled={uploadFileDisabled}
        onClick={uploadFileOnClick}
        variant="secondary"
      >
        {viewport !== "Mobile" ? "Import" : ""}
        <Icon
          className={!uploadFileLoading ? undefined : "animate-spin"}
          variant={!uploadFileLoading ? "uploadFile" : "spinner"}
        />
      </Button>

      <div className="flex items-center gap-2">
        {/* CREATE ANIMATION */}
        <Button
          className="flex items-center gap-1"
          disabled={createAnimationDisabled}
          onClick={createAnimationOnClick}
          variant="primary"
        >
          {viewport !== "Mobile" ? "Create Animation" : "Create"}
          <Icon variant="roundedPlay" />
        </Button>

        {/* RESET */}
        <Button
          className="flex items-center gap-1"
          disabled={resetSelectionDisabled}
          onClick={resetSelectionOnClick}
          variant="secondary"
        >
          {viewport !== "Mobile" ? "Reset" : ""}
          <Icon variant="reset" />
        </Button>
      </div>
    </div>
  );
}
