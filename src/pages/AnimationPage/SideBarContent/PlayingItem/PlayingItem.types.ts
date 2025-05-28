import { type Func } from "@agusmgarcia/react-core";

import { type Animation } from "#src/store";

type PlayingItemProps = {
  animation: Animation;
  onNextIndex: Func;
  onPreviousIndex: Func;
};

export default PlayingItemProps;
