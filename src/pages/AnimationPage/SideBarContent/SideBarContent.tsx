import { Accordion, Typography } from "#src/components";
import { ZoomItem } from "#src/fragments";

import AnimationsItem from "./AnimationsItem";
import CenterItem from "./CenterItem";
import ConfigurationsItem from "./ConfigurationsItem";
import PlayingItem from "./PlayingItem";
import useSideBarContent from "./SideBarContent.hooks";
import type SideBarContentProps from "./SideBarContent.types";

export default function SideBarContent(props: SideBarContentProps) {
  const {
    animation,
    index,
    onFirstIndex,
    onLastIndex,
    onNextIndex,
    onPreviousIndex,
    ...rest
  } = useSideBarContent(props);

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
      <AnimationsItem animation={animation} />
      <PlayingItem
        animation={animation}
        onFirstIndex={onFirstIndex}
        onLastIndex={onLastIndex}
        onNextIndex={onNextIndex}
        onPreviousIndex={onPreviousIndex}
      />
      <CenterItem animation={animation} index={index} />
      <ZoomItem />
    </Accordion>
  );
}
