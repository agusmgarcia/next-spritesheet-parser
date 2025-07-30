import { type Func } from "@agusmgarcia/react-essentials-utils";

import { type Animation } from "#src/store";

type PlayingItemProps = {
  animation: Animation;
  onFirstIndex: Func;
  onLastIndex: Func;
  onNextIndex: Func;
  onPreviousIndex: Func;
};

export default PlayingItemProps;
