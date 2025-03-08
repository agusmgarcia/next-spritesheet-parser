import { type Func } from "@agusmgarcia/react-core";

import { type Animations } from "#src/store";
import { type SetValue } from "#src/utils";

type ToolBarProps = {
  animation: Animations[number];
  className?: string;
  onIndexChange: Func<void, [newIndex: SetValue<number>]>;
};

export default ToolBarProps;
