import { Accordion, Typography } from "#src/components";

import AnimationsItem from "./AnimationsItem";
import CenterItem from "./CenterItem";
import ConfigurationsItem from "./ConfigurationsItem";
import FPSItem from "./FPSItem";
import PlayingItem from "./PlayingItem";
import type SideBarContentProps from "./SideBarContent.types";
import ZoomItem from "./ZoomItem";

export default function SideBarContent({
  animation,
  index,
  onIndexChange,
  ...rest
}: SideBarContentProps) {
  return (
    <Accordion
      {...rest}
      heading={
        <Typography className="text-white" variant="h1">
          {animation.name}
        </Typography>
      }
    >
      <ConfigurationsItem animation={animation} />
      <PlayingItem animation={animation} onIndexChange={onIndexChange} />
      <FPSItem animation={animation} />
      <CenterItem animation={animation} index={index} />
      <ZoomItem animation={animation} />
      <AnimationsItem animation={animation} />
    </Accordion>
  );
}
