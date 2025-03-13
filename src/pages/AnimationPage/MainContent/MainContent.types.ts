import { type Animations } from "#src/store";

type MainContentProps = {
  animation: Animations[number];
  index: number;
  onionActive: boolean;
  playing: boolean;
};

export default MainContentProps;
