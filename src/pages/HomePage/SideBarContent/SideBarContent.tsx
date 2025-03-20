import { Accordion } from "#src/components";

import AnimationsItem from "./AnimationsItem";
import FilesItem from "./FilesItem";
import SettingsItem from "./SettingsItem";
import useSideBarContent from "./SideBarContent.hooks";
import type SideBarContentProps from "./SideBarContent.types";

export default function SideBarContent(props: SideBarContentProps) {
  const {
    heading,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
    spriteIds,
    spriteIdsOnUnselectAll,
  } = useSideBarContent(props);

  return (
    <Accordion heading={heading}>
      <FilesItem
        importFileDisabled={importFileDisabled}
        importFileLoading={importFileLoading}
        importFileOnClick={importFileOnClick}
      />
      <SettingsItem />
      <AnimationsItem
        spriteIds={spriteIds}
        spriteIdsOnUnselectAll={spriteIdsOnUnselectAll}
      />
    </Accordion>
  );
}
