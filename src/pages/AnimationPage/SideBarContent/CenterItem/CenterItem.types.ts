import { type Animations } from "#src/store";

type CenterItemProps = {
  animation: Animations[number];
  index: number;
  onionActive: boolean;
  onionDisabled: boolean;
  onionOnClick: React.MouseEventHandler<HTMLButtonElement>;
  playing: boolean;
};

export default CenterItemProps;
