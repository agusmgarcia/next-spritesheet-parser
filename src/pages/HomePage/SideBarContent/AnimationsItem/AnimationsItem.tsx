import { Accordion, Button, Icon, Select } from "#src/components";

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
    heading,
    resetSelectionDisabled,
    resetSelectionOnClick,
  } = useAnimationsItem(props);

  return (
    <Accordion.Item className="flex flex-col gap-1" heading={heading}>
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

      {/* RESET SELECTION */}
      <Button
        className="flex items-center justify-center gap-1"
        disabled={resetSelectionDisabled}
        onClick={resetSelectionOnClick}
        variant="secondary"
      >
        Reset
        <Icon variant="reset" />
      </Button>

      {/* ANIMATION SELECTOR */}
      <Select
        className="text-center"
        disabled={animationSelectorDisabled}
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
