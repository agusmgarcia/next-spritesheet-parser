import { Accordion, Typography } from "#src/components";
import { ZoomItem } from "#src/fragments";

import { AnimationsItem } from "./AnimationsItem";
import { CenterItem } from "./CenterItem";
import { ConfigurationsItem } from "./ConfigurationsItem";
import { PlayingItem } from "./PlayingItem";
import useSideBarContent from "./SideBarContent.hooks";
import type SideBarContentProps from "./SideBarContent.types";

export default function SideBarContent(props: SideBarContentProps) {
  const { heading, ...rest } = useSideBarContent(props);

  return (
    <Accordion
      {...rest}
      heading={
        <Typography className="text-white" variant="h1">
          {heading}
        </Typography>
      }
    >
      <ConfigurationsItem />
      <PlayingItem />
      <AnimationsItem />
      <CenterItem />
      <ZoomItem />
    </Accordion>
  );
}
