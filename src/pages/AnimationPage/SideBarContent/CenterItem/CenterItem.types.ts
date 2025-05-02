import { type Func } from "@agusmgarcia/react-core";

import { type Animation } from "#src/store";

type CenterItemProps = {
  animation: Animation;
  onionActive: boolean;
  onionDisabled: boolean;
  onionOnClick: Func;
  resetCenterDisabled: boolean;
  resetCenterOnClick: Func;
};

export default CenterItemProps;
