import { type Animation } from "#src/store";

type SideBarContentProps = {
  animation: Animation;
  index: number;
  onIndexChange: React.Dispatch<React.SetStateAction<number>>;
};

export default SideBarContentProps;
