import { type Func } from "@agusmgarcia/react-core";

import { type Animations } from "#src/store";

type CenterItemProps = {
  animation: Animations[number];
  onionActive: boolean;
  onionDisabled: boolean;
  onionOnClick: Func;
  resetCenterDisabled: boolean;
  resetCenterOnClick: Func;
};

export default CenterItemProps;
