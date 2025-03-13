import { Accordion } from "#src/components";

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
    heading,
    index,
    onionActive,
    onionDisabled,
    onionOnClick,
    playing,
    playingDisabled,
    playOnClick,
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
      <FPSItem animation={animation} />
      <ZoomItem animation={animation} />
      <CenterItem
        animation={animation}
        index={index}
        onionActive={onionActive}
        onionDisabled={onionDisabled}
        onionOnClick={onionOnClick}
        playing={playing}
      />
    </Accordion>
  );
}
