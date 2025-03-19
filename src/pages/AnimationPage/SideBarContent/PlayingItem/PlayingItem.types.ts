import { type Func } from "@agusmgarcia/react-core";

type PlayingItemProps = {
  backwardOnClick: Func;
  forwardOnClick: Func;
  playing: boolean;
  playingDisabled: boolean;
  playOnClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default PlayingItemProps;
