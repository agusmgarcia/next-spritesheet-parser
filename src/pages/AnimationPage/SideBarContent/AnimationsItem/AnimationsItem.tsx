import { Accordion, Select } from "#src/components";

import useAnimationsItem from "./AnimationsItem.hooks";
import type AnimationsItemProps from "./AnimationsItem.types";

export default function AnimationsItem(props: AnimationsItemProps) {
  const {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
    heading,
  } = useAnimationsItem(props);

  return (
    <Accordion.Item className="flex flex-col gap-1" heading={heading}>
      {/* ANIMATION SELECTOR */}
      <Select
        className="text-center [text-align-last:center]"
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
