import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useCenterItem from "./CenterItem.hooks";
import type CenterItemProps from "./CenterItem.types";

export default function CenterItem(props: CenterItemProps) {
  const {
    animationCenter,
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
        {/* DISABLE ANIMATION CENTER */}
        {animationCenter && (
          <Button
            className="flex w-fit items-center justify-center"
            disabled={disableAnimationCenterDisabled}
            onClick={disableAnimationCenter}
            variant="primary"
          >
            <Icon variant="eye" />
          </Button>
        )}

        {/* ENABLE ANIMATION CENTER */}
        {!animationCenter && (
          <Button
            className="flex w-fit items-center justify-center"
            disabled={enableAnimationCenterDisabled}
            onClick={enableAnimationCenter}
            variant="primary"
          >
            <Icon variant="eyeClosed" />
          </Button>
        )}

        {/* DISABLE ANIMATION GRID */}
        {animationGrid && (
          <Button
            className="flex w-fit items-center justify-center"
            disabled={disableAnimationGridDisabled}
            onClick={disableAnimationGrid}
            variant="primary"
          >
            <Icon variant="grid" />
          </Button>
        )}

        {/* ENABLE ANIMATION GRID */}
        {!animationGrid && (
          <Button
            className="flex w-fit items-center justify-center"
            disabled={enableAnimationGridDisabled}
            onClick={enableAnimationGrid}
            variant="secondary"
          >
            <Icon variant="grid" />
          </Button>
        )}

        {/* ANIMATION COLOR */}
        <Input
          aria-label="Color"
          disabled={setAnimationColorDisabled}
          name="color"
          onChange={setAnimationColor}
          type="color"
          value={animationColor}
        />

        {/* RESET ANIMATION CENTER */}
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
            variant="secondary"
          >
            <Icon variant="stack" />
          </Button>
        )}
      </div>
    </Accordion.Item>
  );
}
