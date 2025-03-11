import { Accordion } from "#src/components";

import AnimationsItem from "./AnimationsItem";
import FilesItem from "./FilesItem";
import useSideBarContent from "./SideBarContent.hooks";
import type SideBarContentProps from "./SideBarContent.types";

export default function SideBarContent(props: SideBarContentProps) {
  const { heading, indices, unselectAll } = useSideBarContent(props);

  return (
    <Accordion heading={heading}>
      <FilesItem />
      <AnimationsItem indices={indices} unselectAll={unselectAll} />
    </Accordion>
  );
}
