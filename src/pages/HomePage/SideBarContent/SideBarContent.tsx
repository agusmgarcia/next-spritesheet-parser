import { Accordion, Typography } from "#src/components";

import AnimationsItem from "./AnimationsItem";
import FilesItem from "./FilesItem";
import SettingsItem from "./SettingsItem";

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
    </Accordion>
  );
}
