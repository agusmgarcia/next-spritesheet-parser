import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useCenterItem from "./CenterItem.hooks";
import type CenterItemProps from "./CenterItem.types";

export default function CenterItem(props: CenterItemProps) {
  const {
    centerToDownDisabled,
    centerToDownOnClick,
    centerToLeftDisabled,
    centerToLeftOnClick,
    centerToRightDisabled,
    centerToRightOnClick,
    centerToUpDisabled,
    centerToUpOnClick,
    centerVisible,
    colorDisabled,
    colorOnChange,
    colorValue,
    onionActive,
    onionDisabled,
    onionOnClick,
    resetCenterDisabled,
    resetCenterOnClick,
    toggleVisibilityDisabled,
    toggleVisibilityOnClick,
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
          disabled={centerToLeftDisabled}
          onClick={centerToLeftOnClick}
          variant="secondary"
        >
          <Icon variant="arrowLeft" />
        </Button>

        {/* UP */}
        <Button
          className="flex items-center justify-center"
          disabled={centerToUpDisabled}
          onClick={centerToUpOnClick}
          variant="secondary"
        >
          <Icon variant="arrowUp" />
        </Button>

        {/* DOWN */}
        <Button
          className="flex items-center justify-center"
          disabled={centerToDownDisabled}
          onClick={centerToDownOnClick}
          variant="secondary"
        >
          <Icon variant="arrowDown" />
        </Button>

        {/* RIGHT */}
        <Button
          className="flex items-center justify-center"
          disabled={centerToRightDisabled}
          onClick={centerToRightOnClick}
          variant="secondary"
        >
          <Icon variant="arrowRight" />
        </Button>
      </div>

      <div className="flex gap-1">
        {/* TOOGLE CENTER VISIBILITY */}
        <Button
          className="flex w-fit items-center justify-center"
          disabled={toggleVisibilityDisabled}
          onClick={toggleVisibilityOnClick}
          variant={centerVisible ? "primary" : "secondary"}
        >
          <Icon variant={centerVisible ? "eye" : "eyeClosed"} />
        </Button>

        {/* COLOR */}
        <Input
          aria-label="Color"
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
          <Icon variant="center" />
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
