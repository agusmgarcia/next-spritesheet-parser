import { Accordion, Button, Icon, Typography } from "#src/components";

import useMovementsItem from "./MovementsItem.hooks";
import type MovementsItemProps from "./MovementsItem.types";

export default function MovementsItem(props: MovementsItemProps) {
  const {
    animationOffsetDownDisabled,
    animationOffsetDownOnClick,
    animationOffsetLeftDisabled,
    animationOffsetLeftOnClick,
    animationOffsetRightDisabled,
    animationOffsetRightOnClick,
    animationOffsetUpDisabled,
    animationOffsetUpOnClick,
    ...rest
  } = useMovementsItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Movements
        </Typography>
      }
    >
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
    </Accordion.Item>
  );
}
