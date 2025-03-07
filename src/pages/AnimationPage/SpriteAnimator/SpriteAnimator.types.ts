import { type Animations } from "#src/store";

type SpriteAnimatorProps = {
  animation: Animations[number];
  index: number;
  scale: number;
};

export default SpriteAnimatorProps;
