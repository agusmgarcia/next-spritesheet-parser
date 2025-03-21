import { Accordion } from "#src/components";

import AnimationsItem from "./AnimationsItem";
import CenterItem from "./CenterItem";
import ConfigurationsItem from "./ConfigurationsItem";
import FPSItem from "./FPSItem";
import PlayingItem from "./PlayingItem";
import useSideBarContent from "./SideBarContent.hooks";
import type SideBarContentProps from "./SideBarContent.types";
import ZoomItem from "./ZoomItem";

export default function SideBarContent(props: SideBarContentProps) {
  const {
    animation,
    backwardOnClick,
    forwardOnClick,
    fps,
    fpsOnChange,
    heading,
    minusFPSDisabled,
    minusFPSOnClick,
    onionActive,
    onionDisabled,
    onionOnClick,
    playing,
    playingDisabled,
    playOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
    resetCenterDisabled,
    resetCenterOnClick,
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  } = useSideBarContent(props);

  return (
    <Accordion heading={heading}>
      <ConfigurationsItem animation={animation} />
      <PlayingItem
        backwardOnClick={backwardOnClick}
        forwardOnClick={forwardOnClick}
        playOnClick={playOnClick}
        playing={playing}
        playingDisabled={playingDisabled}
      />
      <FPSItem
        fps={fps}
        fpsOnChange={fpsOnChange}
        minusFPSDisabled={minusFPSDisabled}
        minusFPSOnClick={minusFPSOnClick}
        plusFPSDisabled={plusFPSDisabled}
        plusFPSOnClick={plusFPSOnClick}
      />
      <ZoomItem
        resetZoomDisabled={resetZoomDisabled}
        resetZoomOnClick={resetZoomOnClick}
        zoomInDisabled={zoomInDisabled}
        zoomInOnClick={zoomInOnClick}
        zoomOutDisabled={zoomOutDisabled}
        zoomOutOnClick={zoomOutOnClick}
      />
      <CenterItem
        animation={animation}
        onionActive={onionActive}
        onionDisabled={onionDisabled}
        onionOnClick={onionOnClick}
        resetCenterDisabled={resetCenterDisabled}
        resetCenterOnClick={resetCenterOnClick}
      />
      <AnimationsItem animation={animation} />
    </Accordion>
  );
}
