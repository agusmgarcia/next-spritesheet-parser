import { type Func } from "@agusmgarcia/react-core";

type AnimationsItemProps = {
  createAnimationDisabled: boolean;
  createAnimationOnClick: Func;
  mergeSpritesDisabled: boolean;
  mergeSpritesLoading: boolean;
  mergeSpritesOnClick: Func;
  resetSelectionDisabled: boolean;
  resetSelectionOnClick: Func;
};

export default AnimationsItemProps;
