import { twMerge } from "tailwind-merge";

import { Button, Icon } from "#src/components";

import useToolBar from "./ToolBar.hooks";
import type ToolBarProps from "./ToolBar.types";

export default function ToolBar(props: ToolBarProps) {
  const {
    className,
    createAnimationDisabled,
    createAnimationOnClick,
    downloadFileDisabled,
    downloadFileLoading,
    downloadFileOnClick,
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

      {/* DOWNLOAD FILE */}
      <Button
        className="flex items-center gap-1"
        disabled={downloadFileDisabled}
        onClick={downloadFileOnClick}
        variant="secondary"
      >
        {viewport !== "Mobile" ? "Export" : ""}
        <Icon
          className={!downloadFileLoading ? undefined : "animate-spin"}
          variant={!downloadFileLoading ? "downloadFile" : "spinner"}
        />
      </Button>

      {/* ANIMATION SELECTOR */}
      <div className="flex-1">{/* // TODO: ANIMATION SELECTOR */}</div>

      {/* CREATE ANIMATION */}
      <Button
        className="flex items-center gap-1"
        disabled={createAnimationDisabled}
        onClick={createAnimationOnClick}
        variant="primary"
      >
        {viewport !== "Mobile" ? "Create" : "Create"}
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
  );
}
