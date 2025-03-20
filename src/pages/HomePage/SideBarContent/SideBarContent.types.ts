import { type Func } from "@agusmgarcia/react-core";

type SideBarContentProps = {
  importFileDisabled: boolean;
  importFileLoading: boolean;
  importFileOnClick: Func;
  spriteIds: string[];
  spriteIdsOnUnselectAll: Func;
};

export default SideBarContentProps;
