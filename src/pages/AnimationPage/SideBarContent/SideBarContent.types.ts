import { type Animations } from "#src/store";

type SideBarContentProps = {
  animation: Animations[number];
  backwardOnClick: React.MouseEventHandler<HTMLButtonElement>;
  forwardOnClick: React.MouseEventHandler<HTMLButtonElement>;
  index: number;
  onionActive: boolean;
  onionDisabled: boolean;
  onionOnClick: React.MouseEventHandler<HTMLButtonElement>;
  playing: boolean;
  playingDisabled: boolean;
  playOnClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default SideBarContentProps;
