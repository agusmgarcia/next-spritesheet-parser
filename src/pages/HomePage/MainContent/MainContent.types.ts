import { type Func } from "@agusmgarcia/react-core";

type MainContentProps = {
  spriteIds: string[];
  spriteIdsOnSelect: Func<void, [spriteId: string]>;
  spriteIdsOnToggle: Func<void, [spriteId: string]>;
};

export default MainContentProps;
