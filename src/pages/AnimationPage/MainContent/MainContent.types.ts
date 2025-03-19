import { type Func } from "@agusmgarcia/react-core";

import { type Animations } from "#src/store";

type MainContentProps = {
  animation: Animations[number];
  backwardOnClick: Func;
  forwardOnClick: Func;
  index: number;
  onionActive: boolean;
  playing: boolean;
};

export default MainContentProps;
