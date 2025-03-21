import { Accordion } from "#src/components";

import AnimationsItem from "./AnimationsItem";
import FilesItem from "./FilesItem";
import SettingsItem from "./SettingsItem";
import useSideBarContent from "./SideBarContent.hooks";
import type SideBarContentProps from "./SideBarContent.types";

export default function SideBarContent(props: SideBarContentProps) {
  const {
    createAnimationDisabled,
    createAnimationOnClick,
    exportFileDisabled,
    exportFileLoading,
    exportFileOnClick,
    heading,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
    mergeSpritesDisabled,
    mergeSpritesLoading,
    mergeSpritesOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
  } = useSideBarContent(props);

  return (
    <Accordion heading={heading}>
      <FilesItem
        exportFileDisabled={exportFileDisabled}
        exportFileLoading={exportFileLoading}
        exportFileOnClick={exportFileOnClick}
        importFileDisabled={importFileDisabled}
        importFileLoading={importFileLoading}
        importFileOnClick={importFileOnClick}
      />
      <SettingsItem />
      <AnimationsItem
        createAnimationDisabled={createAnimationDisabled}
        createAnimationOnClick={createAnimationOnClick}
        mergeSpritesDisabled={mergeSpritesDisabled}
        mergeSpritesLoading={mergeSpritesLoading}
        mergeSpritesOnClick={mergeSpritesOnClick}
        resetSelectionDisabled={resetSelectionDisabled}
        resetSelectionOnClick={resetSelectionOnClick}
      />
    </Accordion>
  );
}
