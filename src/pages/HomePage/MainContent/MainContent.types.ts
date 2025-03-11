import { type Func } from "@agusmgarcia/react-core";

type MainContentProps = {
  indices: number[];
  select: Func<void, [index: number]>;
  toggleSelection: Func<void, [index: number]>;
};

export default MainContentProps;
