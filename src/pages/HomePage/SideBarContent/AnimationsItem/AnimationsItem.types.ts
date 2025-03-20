import { type Func } from "@agusmgarcia/react-core";

type AnimationsItemProps = {
  createAnimationDisabled: boolean;
  createAnimationOnClick: Func;
  spriteIds: string[];
  spriteIdsOnUnselectAll: Func;
};

export default AnimationsItemProps;
