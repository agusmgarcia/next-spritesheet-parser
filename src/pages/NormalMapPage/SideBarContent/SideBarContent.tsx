import { Accordion, Typography } from "#src/components";
import { ZoomItem } from "#src/fragments";

import ConfigurationsItem from "./ConfigurationsItem";
import SettingsItem from "./SettingsItem";
import useSideBarContent from "./SideBarContent.hooks";
import type SideBarContentProps from "./SideBarContent.types";

export default function SideBarContent(props: SideBarContentProps) {
  const { ...rest } = useSideBarContent(props);

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
      <SettingsItem />
      <ZoomItem />
    </Accordion>
  );
}
