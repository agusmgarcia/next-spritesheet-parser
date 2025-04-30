import { type Func } from "@agusmgarcia/react-core";

type AnimationsItemProps = {
  createAnimationDisabled: boolean;
  createAnimationOnClick: Func;
  mergeSpritesDisabled: boolean;
  mergeSpritesOnClick: Func;
  resetSelectionDisabled: boolean;
  resetSelectionOnClick: Func;
  splitSpriteDisabled: boolean;
  splitSpriteOnClick: Func;
};

export default AnimationsItemProps;
