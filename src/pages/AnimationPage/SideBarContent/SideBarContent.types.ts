import { type Animations } from "#src/store";

type SideBarContentProps = {
  animation: Animations[number];
  backwardOnClick: React.MouseEventHandler<HTMLButtonElement>;
  forwardOnClick: React.MouseEventHandler<HTMLButtonElement>;
  index: number;
  playing: boolean;
  playingDisabled: boolean;
  playOnClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default SideBarContentProps;
