import { type Func } from "@agusmgarcia/react-core";

type MainContentProps = {
  indices: number[];
  indicesOnSelect: Func<void, [index: number]>;
  indicesOnToggle: Func<void, [index: number]>;
};

export default MainContentProps;
