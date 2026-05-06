import { Accordion, Button, Icon, Typography } from "#src/components";

import useSpritesItem from "./SpritesItem.hooks";
import type SpritesItemProps from "./SpritesItem.types";

export default function SpritesItem(props: SpritesItemProps) {
  const {
    mergeSpritesDisabled,
    mergeSpritesOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
    splitSpriteDisabled,
    splitSpriteOnClick,
    ...rest
  } = useSpritesItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex flex-col gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Sprites
        </Typography>
      }
    >
      {/* RESET SELECTION */}
      <Button
        className="flex items-center justify-center gap-1"
        disabled={resetSelectionDisabled}
        onClick={resetSelectionOnClick}
        variant="secondary"
      >
        Clear
        <Icon variant="eraser" />
      </Button>

      {/* SPLIT SPRITES */}
      {!splitSpriteDisabled && (
        <Button
          className="flex items-center justify-center gap-1"
          disabled={splitSpriteDisabled}
          onClick={splitSpriteOnClick}
          variant="secondary"
        >
          Split
          <Icon variant="split" />
        </Button>
      )}

      {/* MERGE SPRITES */}
      {splitSpriteDisabled && (
        <Button
          className="flex items-center justify-center gap-1"
          disabled={mergeSpritesDisabled}
          onClick={mergeSpritesOnClick}
          variant="secondary"
        >
          Merge
          <Icon variant="merge" />
        </Button>
      )}
    </Accordion.Item>
  );
}
