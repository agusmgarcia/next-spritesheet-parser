import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import usePlayingItem from "./PlayingItem.hooks";
import type PlayingItemProps from "./PlayingItem.types";

export default function PlayingItem(props: PlayingItemProps) {
  const {
    backwardOnClick,
    forwardOnClick,
    fps,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    playing,
    playingDisabled,
    playOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
    ...rest
  } = usePlayingItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex flex-col gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Playing
        </Typography>
      }
    >
      <div className="flex gap-1">
        {/* BACKWARD */}
        <Button
          className="flex items-center justify-center"
          onClick={backwardOnClick}
          variant="secondary"
        >
          <Icon variant="backward" />
        </Button>

        {/* PLAY / PAUSE */}
        <Button
          className="flex items-center justify-center"
          disabled={playingDisabled}
          onClick={playOnClick}
          variant="primary"
        >
          <Icon variant={!playing ? "play" : "pause"} />
        </Button>

        {/* FORWARD */}
        <Button
          className="flex items-center justify-center"
          onClick={forwardOnClick}
          variant="secondary"
        >
          <Icon variant="forward" />
        </Button>
      </div>

      <div className="flex gap-1">
        {/* MINUS FPS */}
        <Button
          className="flex w-fit items-center justify-center"
          disabled={minusFPSDisabled}
          onClick={minusFPSOnClick}
          variant="secondary"
        >
          <Icon variant="minus" />
        </Button>

        {/* FPS */}
        <Input
          aria-label="FPS"
          className="text-center"
          min={1}
          name="fps"
          onChange={fpsOnChange}
          type="number"
          value={fps}
        />

        {/* PLUS FPS */}
        <Button
          className="flex w-fit items-center justify-center"
          disabled={plusFPSDisabled}
          onClick={plusFPSOnClick}
          variant="secondary"
        >
          <Icon variant="plus" />
        </Button>
      </div>
    </Accordion.Item>
  );
}
