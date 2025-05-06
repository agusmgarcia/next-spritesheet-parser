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
  const { animation, heading, index, onIndexChange } = useSideBarContent(props);

  return (
    <Accordion heading={heading}>
      <ConfigurationsItem animation={animation} />
      <PlayingItem animation={animation} onIndexChange={onIndexChange} />
      <FPSItem animation={animation} />
      <ZoomItem animation={animation} />
      <CenterItem animation={animation} index={index} />
      <AnimationsItem animation={animation} />
    </Accordion>
  );
}
