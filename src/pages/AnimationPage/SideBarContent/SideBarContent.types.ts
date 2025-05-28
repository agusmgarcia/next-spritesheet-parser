import { type Func } from "@agusmgarcia/react-core";

import { type Animation } from "#src/store";

type SideBarContentProps = {
  animation: Animation;
  index: number;
  onNextIndex: Func;
  onPreviousIndex: Func;
};

export default SideBarContentProps;
