import { type Animation } from "#src/store";

type PlayingItemProps = {
  animation: Animation;
  onIndexChange: React.Dispatch<React.SetStateAction<number>>;
};

export default PlayingItemProps;
