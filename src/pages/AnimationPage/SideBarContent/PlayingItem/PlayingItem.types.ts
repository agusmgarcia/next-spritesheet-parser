type PlayingItemProps = {
  backwardOnClick: React.MouseEventHandler<HTMLButtonElement>;
  forwardOnClick: React.MouseEventHandler<HTMLButtonElement>;
  playing: boolean;
  playingDisabled: boolean;
  playOnClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default PlayingItemProps;
