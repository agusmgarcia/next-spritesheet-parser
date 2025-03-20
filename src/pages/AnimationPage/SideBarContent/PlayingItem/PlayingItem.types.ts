import { type Func } from "@agusmgarcia/react-core";

type PlayingItemProps = {
  backwardOnClick: Func;
  forwardOnClick: Func;
  playing: boolean;
  playingDisabled: boolean;
  playOnClick: Func;
};

export default PlayingItemProps;
