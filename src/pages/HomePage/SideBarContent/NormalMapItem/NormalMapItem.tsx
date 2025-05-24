import { Accordion, Button, Icon, Typography } from "#src/components";

import useNormalMapItem from "./NormalMapItem.hooks";
import type NormalMapItemProps from "./NormalMapItem.types";

export default function NormalMapItem(props: NormalMapItemProps) {
  const {
    createNormalMapDisabled,
    createNormalMapLoading,
    createNormalMapOnClick,
    ...rest
  } = useNormalMapItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex flex-col gap-1"
      defaultCollapsed={true}
      heading={
        <Typography className="text-white" variant="h2">
          Normal Map
        </Typography>
      }
    >
      {/* CREATE NORMAL MAP */}
      <Button
        className="flex items-center justify-center gap-1"
        disabled={createNormalMapDisabled}
        onClick={createNormalMapOnClick}
        variant="primary"
      >
        Create
        <Icon
          className={!createNormalMapLoading ? undefined : "animate-spin"}
          variant={!createNormalMapLoading ? "box" : "spinner"}
        />
      </Button>
    </Accordion.Item>
  );
}
