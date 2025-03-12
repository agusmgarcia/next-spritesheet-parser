import { type Animations } from "#src/store";

type MainContentProps = {
  animation: Animations[number];
  index: number;
  playing: boolean;
};

export default MainContentProps;
