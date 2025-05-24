import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useCenterItem from "./CenterItem.hooks";
import type CenterItemProps from "./CenterItem.types";

export default function CenterItem(props: CenterItemProps) {
  const {
    animationOffsetDownDisabled,
    animationOffsetDownOnClick,
    animationOffsetLeftDisabled,
    animationOffsetLeftOnClick,
    animationOffsetRightDisabled,
    animationOffsetRightOnClick,
    animationOffsetUpDisabled,
    animationOffsetUpOnClick,
    colorDisabled,
    colorOnChange,
    colorValue,
    onionActive,
    onionDisabled,
    onionOnClick,
    resetCenterDisabled,
    resetCenterOnClick,
    ...rest
  } = useCenterItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex flex-col gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Center
        </Typography>
      }
    >
      <div className="flex gap-1">
        {/* LEFT */}
        <Button
          className="flex items-center justify-center"
          disabled={animationOffsetLeftDisabled}
          onClick={animationOffsetLeftOnClick}
          variant="secondary"
        >
          <Icon variant="arrowLeft" />
        </Button>

        {/* UP */}
        <Button
          className="flex items-center justify-center"
          disabled={animationOffsetUpDisabled}
          onClick={animationOffsetUpOnClick}
          variant="secondary"
        >
          <Icon variant="arrowUp" />
        </Button>

        {/* DOWN */}
        <Button
          className="flex items-center justify-center"
          disabled={animationOffsetDownDisabled}
          onClick={animationOffsetDownOnClick}
          variant="secondary"
        >
          <Icon variant="arrowDown" />
        </Button>

        {/* RIGHT */}
        <Button
          className="flex items-center justify-center"
          disabled={animationOffsetRightDisabled}
          onClick={animationOffsetRightOnClick}
          variant="secondary"
        >
          <Icon variant="arrowRight" />
        </Button>
      </div>

      <div className="flex gap-1">
        {/* COLOR */}
        <Input
          disabled={colorDisabled}
          name="color"
          onChange={colorOnChange}
          type="color"
          value={colorValue}
        />

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
      </div>
    </Accordion.Item>
  );
}
