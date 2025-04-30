import { type Func } from "@agusmgarcia/react-core";

type SideBarContentProps = {
  createAnimationDisabled: boolean;
  createAnimationOnClick: Func;
  exportFileDisabled: boolean;
  exportFileLoading: boolean;
  exportFileOnClick: Func;
  importFileDisabled: boolean;
  importFileLoading: boolean;
  importFileOnClick: Func;
  mergeSpritesDisabled: boolean;
  mergeSpritesOnClick: Func;
  resetSelectionDisabled: boolean;
  resetSelectionOnClick: Func;
  splitSpriteDisabled: boolean;
  splitSpriteOnClick: Func;
};

export default SideBarContentProps;
