import { Accordion, Button, Icon } from "#src/components";

import usePlayingItem from "./PlayingItem.hooks";
import type PlayingItemProps from "./PlayingItem.types";

export default function PlayingItem(props: PlayingItemProps) {
  const {
    backwardOnClick,
    forwardOnClick,
    heading,
    playing,
    playingDisabled,
    playOnClick,
  } = usePlayingItem(props);

  return (
    <Accordion.Item className="flex gap-1" heading={heading}>
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
    </Accordion.Item>
  );
}
