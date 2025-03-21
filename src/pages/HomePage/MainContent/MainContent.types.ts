import { type Func } from "@agusmgarcia/react-core";

type MainContentProps = {
  createAnimationDisabled: boolean;
  createAnimationOnClick: Func;
  exportFileDisabled: boolean;
  exportFileOnClick: Func;
  importFileDisabled: boolean;
  importFileOnClick: Func;
  mergeSpritesDisabled: boolean;
  mergeSpritesOnClick: Func;
  resetSelectionDisabled: boolean;
  resetSelectionOnClick: Func;
};

export default MainContentProps;
