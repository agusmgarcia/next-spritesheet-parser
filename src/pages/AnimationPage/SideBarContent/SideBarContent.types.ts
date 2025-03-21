import { type Func } from "@agusmgarcia/react-core";

import { type Animations } from "#src/store";

type SideBarContentProps = {
  animation: Animations[number];
  backwardOnClick: Func;
  forwardOnClick: Func;
  fps: number;
  fpsOnChange: React.ChangeEventHandler<HTMLInputElement>;
  index: number;
  minusFPSDisabled: boolean;
  minusFPSOnClick: Func;
  onionActive: boolean;
  onionDisabled: boolean;
  onionOnClick: Func;
  playing: boolean;
  playingDisabled: boolean;
  playOnClick: Func;
  plusFPSDisabled: boolean;
  plusFPSOnClick: Func;
  resetZoomDisabled: boolean;
  resetZoomOnClick: Func;
  zoomInDisabled: boolean;
  zoomInOnClick: Func;
  zoomOutDisabled: boolean;
  zoomOutOnClick: Func;
};

export default SideBarContentProps;
