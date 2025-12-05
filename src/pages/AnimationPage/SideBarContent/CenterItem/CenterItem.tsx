import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useCenterItem from "./CenterItem.hooks";
import type CenterItemProps from "./CenterItem.types";

export default function CenterItem(props: CenterItemProps) {
  const {
    animationCenterVisible,
    animationColor,
    animationGrid,
    animationOnion,
    disableAnimationCenter,
    disableAnimationCenterDisabled,
    disableAnimationGrid,
    disableAnimationGridDisabled,
    disableAnimationOnion,
    disableAnimationOnionDisabled,
    enableAnimationCenter,
    enableAnimationCenterDisabled,
    enableAnimationGrid,
    enableAnimationGridDisabled,
    enableAnimationOnion,
    enableAnimationOnionDisabled,
    resetAnimationCenter,
    resetAnimationCenterDisabled,
    setAnimationColor,
    setAnimationColorDisabled,
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

        {/* GRID */}
        <Button
          className="flex w-fit items-center justify-center"
          disabled={gridDisabled}
          onClick={gridOnClick}
          variant={gridActive ? "primary" : "secondary"}
        >
          <Icon variant="grid" />
        </Button>

        {/* COLOR */}
        <Input
          aria-label="Color"
          disabled={setAnimationColorDisabled}
          name="color"
          onChange={setAnimationColor}
          type="color"
          value={animationColor}
        />

        {/* RESET CENTER */}
        <Button
          className="flex w-fit items-center justify-center"
          disabled={resetAnimationCenterDisabled}
          onClick={resetAnimationCenter}
          variant="secondary"
        >
          <Icon variant="center" />
        </Button>

        {/* DISABLE ANIMATION ONION */}
        {animationOnion && (
          <Button
            className="flex w-fit items-center justify-center"
            disabled={disableAnimationOnionDisabled}
            onClick={disableAnimationOnion}
            variant="primary"
          >
            <Icon variant="stack" />
          </Button>
        )}

        {/* ENABLE ANIMATION ONION */}
        {!animationOnion && (
          <Button
            className="flex w-fit items-center justify-center"
            disabled={enableAnimationOnionDisabled}
            onClick={enableAnimationOnion}
            variant="primary"
          >
            <Icon variant="stack" />
          </Button>
        )}
      </div>
    </Accordion.Item>
  );
}
