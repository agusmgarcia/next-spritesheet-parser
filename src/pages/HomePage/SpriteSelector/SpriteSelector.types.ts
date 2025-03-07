import { type Func } from "@agusmgarcia/react-core";

type SpriteSelectorProps = {
  indices: number[];
  toggleSelection: Func<void, [index: number]>;
};

export default SpriteSelectorProps;
