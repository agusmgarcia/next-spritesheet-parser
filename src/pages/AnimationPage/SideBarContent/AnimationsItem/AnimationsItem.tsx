import { Accordion, Select, Typography } from "#src/components";

import useAnimationsItem from "./AnimationsItem.hooks";
import type AnimationsItemProps from "./AnimationsItem.types";

export default function AnimationsItem(props: AnimationsItemProps) {
  const {
    animationSelectorOnChange,
    animationSelectorOptions,
    animationSelectorValue,
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
