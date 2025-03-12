import { type Animations } from "#src/store";

type CenterItemProps = {
  animation: Animations[number];
  index: number;
  playing: boolean;
};

export default CenterItemProps;
