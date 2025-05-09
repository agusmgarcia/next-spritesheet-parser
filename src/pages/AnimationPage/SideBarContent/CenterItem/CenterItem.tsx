import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useCenterItem from "./CenterItem.hooks";
import type CenterItemProps from "./CenterItem.types";

export default function CenterItem(props: CenterItemProps) {
  const {
    colorDisabled,
    colorOnChange,
    colorValue,
    onionActive,
    onionDisabled,
    onionOnClick,
    resetCenterDisabled,
    resetCenterOnClick,
  } = useCenterItem(props);

  return (
    <Accordion.Item
      className="flex gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Center
        </Typography>
      }
    >
      {/* RESET CENTER */}
      <Button
        className="flex w-fit items-center justify-center"
        disabled={resetCenterDisabled}
        onClick={resetCenterOnClick}
        variant="secondary"
      >
        <Icon variant="reset" />
      </Button>

      {/* ONION */}
      <Button
        className="flex w-fit items-center justify-center"
        disabled={onionDisabled}
        onClick={onionOnClick}
        variant={onionActive ? "primary" : "secondary"}
      >
        <Icon variant="stack" />
      </Button>

      {/* COLOR */}
      <Input
        disabled={colorDisabled}
        onChange={colorOnChange}
        type="color"
        value={colorValue}
      />
    </Accordion.Item>
  );
}
