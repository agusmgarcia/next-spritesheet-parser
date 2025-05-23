import { Accordion, Typography } from "#src/components";
import { ZoomItem } from "#src/fragments";

import AnimationsItem from "./AnimationsItem";
import CenterItem from "./CenterItem";
import ConfigurationsItem from "./ConfigurationsItem";
import PlayingItem from "./PlayingItem";
import type SideBarContentProps from "./SideBarContent.types";

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
          {animation.name || "Animation"}
        </Typography>
      }
    >
      <ConfigurationsItem animation={animation} />
      <PlayingItem animation={animation} onIndexChange={onIndexChange} />
      <CenterItem animation={animation} index={index} />
      <ZoomItem />
      <AnimationsItem animation={animation} />
    </Accordion>
  );
}
