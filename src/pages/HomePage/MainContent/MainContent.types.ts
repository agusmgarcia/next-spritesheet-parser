import { type Func } from "@agusmgarcia/react-core";

type MainContentProps = {
  createAnimationDisabled: boolean;
  createAnimationOnClick: Func;
  exportFileDisabled: boolean;
  exportFileOnClick: Func;
  importFileDisabled: boolean;
  importFileOnClick: Func;
  resetSelectionDisabled: boolean;
  resetSelectionOnClick: Func;
  spriteIds: string[];
  spriteIdsOnSelect: Func<void, [spriteId: string]>;
  spriteIdsOnToggle: Func<void, [spriteId: string]>;
};

export default MainContentProps;
