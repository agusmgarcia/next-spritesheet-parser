import { twMerge } from "tailwind-merge";

import { Button, Carousel, Icon, Input } from "#src/components";

import useToolBar from "./ToolBar.hooks";
import type ToolBarProps from "./ToolBar.types";

export default function ToolBar(props: ToolBarProps) {
  const {
    backwardOnClick,
    className,
    forwardOnClick,
    homeOnClick,
    name,
    nameOnChange,
    playing,
    playingDisabled,
    playOnClick,
    resetDisabled,
    resetOnClick,
    viewport,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
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
          {/* HOME */}
          <Button
            className="flex w-fit items-center justify-center"
            onClick={homeOnClick}
            variant="secondary"
          >
            <Icon variant="home" />
          </Button>

          {/* NAME */}
          <Input label="Name" onChange={nameOnChange} value={name} />
        </div>

        <div className="flex size-full justify-center gap-2">
          {/* BACKWARD */}
          <Button
            className="flex items-center justify-center md:w-fit"
            onClick={backwardOnClick}
            variant="secondary"
          >
            <Icon variant="backward" />
          </Button>

          {/* PLAY / PAUSE */}
          <Button
            className="flex items-center justify-center md:w-fit"
            disabled={playingDisabled}
            onClick={playOnClick}
            variant="primary"
          >
            <Icon variant={!playing ? "play" : "pause"} />
          </Button>

          {/* FORWARD */}
          <Button
            className="flex items-center justify-center md:w-fit"
            onClick={forwardOnClick}
            variant="secondary"
          >
            <Icon variant="forward" />
          </Button>
        </div>

        <div className="flex size-full justify-between gap-2 md:justify-end">
          {/* ZOOM OUT */}
          <Button
            className="flex items-center justify-center md:w-fit"
            disabled={zoomOutDisabled}
            onClick={zoomOutOnClick}
            variant="secondary"
          >
            <Icon variant="zoomOut" />
          </Button>

          {/* ZOOM IN */}
          <Button
            className="flex items-center justify-center md:w-fit"
            disabled={zoomInDisabled}
            onClick={zoomInOnClick}
            variant="secondary"
          >
            <Icon variant="zoomIn" />
          </Button>

          {/* RESET */}
          <Button
            className="flex items-center justify-center md:w-fit"
            disabled={resetDisabled}
            onClick={resetOnClick}
            variant="secondary"
          >
            <Icon variant="reset" />
          </Button>
        </div>
      </Carousel>
    </div>
  );
}
