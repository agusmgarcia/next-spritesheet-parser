import { SideBar } from "#src/fragments";

import useAnimationPage from "./AnimationPage.hooks";
import type AnimationPageProps from "./AnimationPage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function AnimationPage(props: AnimationPageProps) {
  const {
    animation,
    backwardOnClick,
    forwardOnClick,
    index,
    onionActive,
    onionDisabled,
    onionOnClick,
    playing,
    playingDisabled,
    playOnClick,
    resetZoomDisabled,
    resetZoomOnClick,
    zoomInDisabled,
    zoomInOnClick,
    zoomOutDisabled,
    zoomOutOnClick,
  } = useAnimationPage(props);

  if (!animation) return <></>;

  return (
    <>
      {/* MAIN */}
      <MainContent
        animation={animation}
        backwardOnClick={backwardOnClick}
        forwardOnClick={forwardOnClick}
        index={index}
        onionActive={onionActive}
        onionDisabled={onionDisabled}
        onionOnClick={onionOnClick}
        playOnClick={playOnClick}
        playing={playing}
        playingDisabled={playingDisabled}
        resetZoomDisabled={resetZoomDisabled}
        resetZoomOnClick={resetZoomOnClick}
        zoomInDisabled={zoomInDisabled}
        zoomInOnClick={zoomInOnClick}
        zoomOutDisabled={zoomOutDisabled}
        zoomOutOnClick={zoomOutOnClick}
      />

      {/* SIDEBAR */}
      <SideBar>
        <SideBarContent
          animation={animation}
          backwardOnClick={backwardOnClick}
          forwardOnClick={forwardOnClick}
          index={index}
          onionActive={onionActive}
          onionDisabled={onionDisabled}
          onionOnClick={onionOnClick}
          playOnClick={playOnClick}
          playing={playing}
          playingDisabled={playingDisabled}
          resetZoomDisabled={resetZoomDisabled}
          resetZoomOnClick={resetZoomOnClick}
          zoomInDisabled={zoomInDisabled}
          zoomInOnClick={zoomInOnClick}
          zoomOutDisabled={zoomOutDisabled}
          zoomOutOnClick={zoomOutOnClick}
        />
      </SideBar>
    </>
  );
}
