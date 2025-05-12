import { Accordion, Typography } from "#src/components";

import AnimationsItem from "./AnimationsItem";
import FilesItem from "./FilesItem";
import SettingsItem from "./SettingsItem";
import ZoomItem from "./ZoomItem";

export default function SideBarContent() {
  return (
    <Accordion
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
