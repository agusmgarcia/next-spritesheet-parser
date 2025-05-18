import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useFPSItem from "./FPSItem.hooks";
import type FPSItemProps from "./FPSItem.types";

export default function FPSItem(props: FPSItemProps) {
  const {
    fps,
    fpsOnChange,
    minusFPSDisabled,
    minusFPSOnClick,
    plusFPSDisabled,
    plusFPSOnClick,
    ...rest
  } = useFPSItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          FPS
        </Typography>
      }
    >
      {/* MINUS FPS */}
      <Button
        className="flex w-fit items-center justify-center"
        disabled={minusFPSDisabled}
        onClick={minusFPSOnClick}
        variant="secondary"
      >
        <Icon variant="minus" />
      </Button>

      {/* FPS */}
      <Input
        aria-label="FPS"
        className="text-center"
        min={1}
        onChange={fpsOnChange}
        type="number"
        value={fps}
      />

      {/* PLUS FPS */}
      <Button
        className="flex w-fit items-center justify-center"
        disabled={plusFPSDisabled}
        onClick={plusFPSOnClick}
        variant="secondary"
      >
        <Icon variant="plus" />
      </Button>
    </Accordion.Item>
  );
}
