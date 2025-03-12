import { Accordion, Button, Icon, Input } from "#src/components";

import useCenterItem from "./CenterItem.hooks";
import type CenterItemProps from "./CenterItem.types";

export default function CenterItem(props: CenterItemProps) {
  const {
    colorDisabled,
    colorOnChange,
    colorValue,
    heading,
    resetCenterDisabled,
    resetCenterOnClick,
  } = useCenterItem(props);

  return (
    <Accordion.Item className="flex gap-1" heading={heading}>
      {/* RESET CENTER */}
      <Button
        className="flex w-fit items-center justify-center"
        disabled={resetCenterDisabled}
        onClick={resetCenterOnClick}
        variant="secondary"
      >
        <Icon variant="reset" />
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
