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
  resetSelectionDisabled: boolean;
  resetSelectionOnClick: Func;
  spriteIds: string[];
  spriteIdsOnUnselectAll: Func;
};

export default SideBarContentProps;
