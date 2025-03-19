import { Accordion, Typography } from "#src/components";

import AnimationsItem from "./AnimationsItem";
import FilesItem from "./FilesItem";
import NormalMapItem from "./NormalMapItem";
import SettingsItem from "./SettingsItem";
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
          Home
        </Typography>
      }
    >
      <FilesItem />
      <SettingsItem />
      <AnimationsItem />
      <ZoomItem />
      <NormalMapItem />
    </Accordion>
  );
}
