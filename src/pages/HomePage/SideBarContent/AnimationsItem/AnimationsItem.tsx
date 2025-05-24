import { Accordion, Button, Icon, Select, Typography } from "#src/components";

import useAnimationsItem from "./AnimationsItem.hooks";
import type AnimationsItemProps from "./AnimationsItem.types";

export default function AnimationsItem(props: AnimationsItemProps) {
  const {
    animationSelectorDisabled,
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
    createAnimationDisabled,
    createAnimationOnClick,
    mergeSpritesDisabled,
    mergeSpritesOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
    splitSpriteDisabled,
    splitSpriteOnClick,
    ...rest
  } = useAnimationsItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex flex-col gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Animations
        </Typography>
      }
    >
      {/* CREATE ANIMATION */}
      <Button
        className="flex items-center justify-center gap-1"
        disabled={createAnimationDisabled}
        onClick={createAnimationOnClick}
        variant="primary"
      >
        Create
        <Icon variant="roundedPlay" />
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

      {/* ANIMATION SELECTOR */}
      <Select
        className="text-center [text-align-last:center]"
        disabled={animationSelectorDisabled}
        name="animationSelector"
        onChange={animationSelectorOnChange}
        value={animationSelectorValue}
      >
        {animationSelectorOptions.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </Select>
    </Accordion.Item>
  );
}
