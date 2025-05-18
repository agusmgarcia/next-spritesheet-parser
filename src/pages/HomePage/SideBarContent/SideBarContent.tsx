import { Accordion, Typography } from "#src/components";

import AnimationsItem from "./AnimationsItem";
import FilesItem from "./FilesItem";
import SettingsItem from "./SettingsItem";
import type SideBarContentProps from "./SideBarContent.types";
import ZoomItem from "./ZoomItem";

export default function SideBarContent(props: SideBarContentProps) {
  return (
    <Accordion
      {...props}
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
    </Accordion>
  );
}
