import { type Func } from "@agusmgarcia/react-essentials-utils";

import { type Animation } from "#src/store";

type SideBarContentProps = {
  animation: Animation;
  index: number;
  onFirstIndex: Func;
  onLastIndex: Func;
  onNextIndex: Func;
  onPreviousIndex: Func;
};

export default SideBarContentProps;
