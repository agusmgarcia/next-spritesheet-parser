import { type Func } from "@agusmgarcia/react-core";

import { type Animation } from "#src/store";

type SideBarContentProps = {
  animation: Animation;
  backwardOnClick: Func;
  forwardOnClick: Func;
  fps: number;
  fpsOnChange: React.ChangeEventHandler<HTMLInputElement>;
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
  resetCenterDisabled: boolean;
  resetCenterOnClick: Func;
  resetZoomDisabled: boolean;
  resetZoomOnClick: Func;
  zoomInDisabled: boolean;
  zoomInOnClick: Func;
  zoomOutDisabled: boolean;
  zoomOutOnClick: Func;
};

export default SideBarContentProps;
