import { Accordion, Button, Icon, Typography } from "#src/components";

import useZoomItem from "./ZoomItem.hooks";
import type ZoomItemProps from "./ZoomItem.types";

export default function ZoomItem(props: ZoomItemProps) {
  const {
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  } = useZoomItem(props);

  return (
    <Accordion.Item
      className="flex gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Zoom
        </Typography>
      }
    >
      {/* RESET ZOOM */}
      <Button
        className="flex items-center justify-center"
        disabled={resetZoomDisabled}
        onClick={resetZoomOnClick}
        variant="secondary"
      >
        <Icon variant="reset" />
      </Button>

      {/* ZOOM OUT */}
      <Button
        className="flex items-center justify-center"
        disabled={zoomOutDisabled}
        onClick={zoomOutOnClick}
        variant="secondary"
      >
        <Icon variant="zoomOut" />
      </Button>

      {/* ZOOM IN */}
      <Button
        className="flex items-center justify-center"
        disabled={zoomInDisabled}
        onClick={zoomInOnClick}
        variant="secondary"
      >
        <Icon variant="zoomIn" />
      </Button>
    </Accordion.Item>
  );
}
