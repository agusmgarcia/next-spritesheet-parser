import { type Func } from "@agusmgarcia/react-core";

import { type Animations } from "#src/store";

type SideBarContentProps = {
  animation: Animations[number];
  backwardOnClick: Func;
  forwardOnClick: Func;
  index: number;
  onionActive: boolean;
  onionDisabled: boolean;
  onionOnClick: React.MouseEventHandler<HTMLButtonElement>;
  playing: boolean;
  playingDisabled: boolean;
  playOnClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default SideBarContentProps;
