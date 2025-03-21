import { type Func } from "@agusmgarcia/react-core";

type ZoomItemProps = {
  resetZoomDisabled: boolean;
  resetZoomOnClick: Func;
  zoomInDisabled: boolean;
  zoomInOnClick: Func;
  zoomOutDisabled: boolean;
  zoomOutOnClick: Func;
};

export default ZoomItemProps;
