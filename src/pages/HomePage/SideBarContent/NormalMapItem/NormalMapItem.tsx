import { Accordion, Button, Icon } from "#src/components";

import useNormalMapItem from "./NormalMapItem.hooks";
import type NormalMapItemProps from "./NormalMapItem.types";

export default function NormalMapItem(props: NormalMapItemProps) {
  const { createNormalMapDisabled, createNormalMapOnClick, heading } =
    useNormalMapItem(props);

  return (
    <Accordion.Item className="flex flex-col gap-1" heading={heading}>
      {/* CREATE NORMAL MAP */}
      <Button
        className="flex items-center justify-center gap-1"
        disabled={createNormalMapDisabled}
        onClick={createNormalMapOnClick}
        variant="primary"
      >
        Create
        <Icon variant="box" />
      </Button>
    </Accordion.Item>
  );
}
