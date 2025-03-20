import { type Func } from "@agusmgarcia/react-core";

type SideBarContentProps = {
  exportFileDisabled: boolean;
  exportFileLoading: boolean;
  exportFileOnClick: Func;
  importFileDisabled: boolean;
  importFileLoading: boolean;
  importFileOnClick: Func;
  spriteIds: string[];
  spriteIdsOnUnselectAll: Func;
};

export default SideBarContentProps;
