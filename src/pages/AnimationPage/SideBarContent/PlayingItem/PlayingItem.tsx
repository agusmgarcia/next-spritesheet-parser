import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import usePlayingItem from "./PlayingItem.hooks";
import type PlayingItemProps from "./PlayingItem.types";

export default function PlayingItem(props: PlayingItemProps) {
  const {
    animationFPS,
    animationPlaying,
    backwardAnimationIndex,
    backwardAnimationIndexDisabled,
    forwardAnimationIndex,
    forwardAnimationIndexDisabled,
    minusAnimationFPS,
    minusAnimationFPSDisabled,
    plusAnimationFPS,
    plusAnimationFPSDisabled,
    resumeAnimation,
    resumeAnimationDisabled,
    setAnimationFPS,
    setAnimationFPSDisabled,
    stopAnimation,
    stopAnimationDisabled,
    toFirstAnimationIndex,
    toFirstAnimationIndexDisabled,
    toLastAnimationIndex,
    toLastAnimationIndexDisabled,
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
        {/* TO FIRST */}
        <Button
          className="flex items-center justify-center"
          disabled={toFirstAnimationIndexDisabled}
          onClick={toFirstAnimationIndex}
          variant="secondary"
        >
          <Icon variant="backwardFast" />
        </Button>

        {/* BACKWARD */}
        <Button
          className="flex items-center justify-center"
          disabled={backwardAnimationIndexDisabled}
          onClick={backwardAnimationIndex}
          variant="secondary"
        >
          <Icon variant="backward" />
        </Button>

        {/* PAUSE */}
        {animationPlaying && (
          <Button
            className="flex items-center justify-center"
            disabled={stopAnimationDisabled}
            onClick={stopAnimation}
            variant="primary"
          >
            <Icon variant="pause" />
          </Button>
        )}

        {/* PLAY */}
        {!animationPlaying && (
          <Button
            className="flex items-center justify-center"
            disabled={resumeAnimationDisabled}
            onClick={resumeAnimation}
            variant="primary"
          >
            <Icon variant="play" />
          </Button>
        )}

        {/* FORWARD */}
        <Button
          className="flex items-center justify-center"
          disabled={forwardAnimationIndexDisabled}
          onClick={forwardAnimationIndex}
          variant="secondary"
        >
          <Icon variant="forward" />
        </Button>

        {/* TO LAST */}
        <Button
          className="flex items-center justify-center"
          disabled={toLastAnimationIndexDisabled}
          onClick={toLastAnimationIndex}
          variant="secondary"
        >
          <Icon variant="forwardFast" />
        </Button>
      </div>

      <div className="flex gap-1">
        {/* MINUS FPS */}
        <Button
          className="flex w-fit items-center justify-center"
          disabled={minusAnimationFPSDisabled}
          onClick={minusAnimationFPS}
          variant="secondary"
        >
          <Icon variant="minus" />
        </Button>

        {/* FPS */}
        <Input
          aria-label="FPS"
          className="text-center"
          disabled={setAnimationFPSDisabled}
          min={1}
          name="fps"
          onChange={setAnimationFPS}
          type="number"
          value={animationFPS}
        />

        {/* PLUS FPS */}
        <Button
          className="flex w-fit items-center justify-center"
          disabled={plusAnimationFPSDisabled}
          onClick={plusAnimationFPS}
          variant="secondary"
        >
          <Icon variant="plus" />
        </Button>
      </div>
    </Accordion.Item>
  );
}
