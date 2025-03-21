import { type Func } from "@agusmgarcia/react-core";

import { type Animations } from "#src/store";

type CenterItemProps = {
  animation: Animations[number];
  index: number;
  onionActive: boolean;
  onionDisabled: boolean;
  onionOnClick: Func;
  playing: boolean;
};

export default CenterItemProps;
