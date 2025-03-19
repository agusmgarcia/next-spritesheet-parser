import { Accordion, Typography } from "#src/components";

import ConfigurationsItem from "./ConfigurationsItem";
import NormalMapSettingsItem from "./NormalMapSettingsItem";
import useSideBarContent from "./SideBarContent.hooks";
import type SideBarContentProps from "./SideBarContent.types";
import ZoomItem from "./ZoomItem";

export default function SideBarContent(props: SideBarContentProps) {
  const rest = useSideBarContent(props);

  return (
    <Accordion
      {...rest}
      heading={
        <Typography className="text-white" variant="h1">
          Normal Map
        </Typography>
      }
    >
      <ConfigurationsItem />
      <NormalMapSettingsItem />
      <ZoomItem />
    </Accordion>
  );
}
