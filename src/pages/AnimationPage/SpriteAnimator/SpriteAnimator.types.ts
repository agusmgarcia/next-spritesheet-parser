import { type SpriteSheet } from "#src/store";

type SpriteAnimatorProps = {
  animation: SpriteSheet["animations"][number];
  index: number;
  scale: number;
};

export default SpriteAnimatorProps;
