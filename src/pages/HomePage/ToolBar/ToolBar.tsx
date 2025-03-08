import { twMerge } from "tailwind-merge";

import { Button, Carousel, Icon, Select } from "#src/components";

import useToolBar from "./ToolBar.hooks";
import type ToolBarProps from "./ToolBar.types";

export default function ToolBar(props: ToolBarProps) {
  const {
    animationSelectorDisabled,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
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
        "mx-auto max-w-screen-md",
        "rounded-lg border border-black bg-white p-4 shadow-lg",
        className,
      )}
    >
      <Carousel pageGap={8} pageSize={viewport === "Mobile" ? 1 : 3}>
        <div className="flex size-full justify-between gap-2 md:justify-start">
          {/* UPLOAD FILE */}
          <Button
            className="flex items-center justify-center gap-1"
            disabled={uploadFileDisabled}
            onClick={uploadFileOnClick}
            variant="secondary"
          >
            Import
            <Icon
              className={!uploadFileLoading ? undefined : "animate-spin"}
              variant={!uploadFileLoading ? "uploadFile" : "spinner"}
            />
          </Button>

          {/* DOWNLOAD FILE */}
          <Button
            className="flex items-center justify-center gap-1"
            disabled={downloadFileDisabled}
            onClick={downloadFileOnClick}
            variant="secondary"
          >
            Export
            <Icon
              className={!downloadFileLoading ? undefined : "animate-spin"}
              variant={!downloadFileLoading ? "downloadFile" : "spinner"}
            />
          </Button>
        </div>

        <div className="flex size-full justify-center">
          {/* ANIMATION SELECTOR */}
          <Select
            disabled={animationSelectorDisabled}
            onChange={animationSelectorOnChange}
            value={animationSelectorValue}
          >
            {animationSelectorOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex size-full justify-between gap-2 md:justify-end">
          {/* RESET */}
          <Button
            className="flex items-center justify-center gap-1"
            disabled={resetSelectionDisabled}
            onClick={resetSelectionOnClick}
            variant="secondary"
          >
            Reset
            <Icon variant="reset" />
          </Button>

          {/* CREATE ANIMATION */}
          <Button
            className="flex items-center justify-center gap-1"
            disabled={createAnimationDisabled}
            onClick={createAnimationOnClick}
            variant="primary"
          >
            Create
            <Icon variant="roundedPlay" />
          </Button>
        </div>
      </Carousel>
    </div>
  );
}
