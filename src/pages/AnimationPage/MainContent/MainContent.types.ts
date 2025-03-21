import { type Func } from "@agusmgarcia/react-core";

import { type Animations } from "#src/store";

type MainContentProps = {
  animation: Animations[number];
  backwardOnClick: Func;
  forwardOnClick: Func;
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
  resetCenterDisabled: boolean;
  resetCenterOnClick: Func;
  resetZoomDisabled: boolean;
  resetZoomOnClick: Func;
  zoomInDisabled: boolean;
  zoomInOnClick: Func;
  zoomOutDisabled: boolean;
  zoomOutOnClick: Func;
};

export default MainContentProps;
