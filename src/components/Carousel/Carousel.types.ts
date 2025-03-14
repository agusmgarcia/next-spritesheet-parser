import { type Func } from "@agusmgarcia/react-core";

type CarouselProps = Pick<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  hideArrows?: boolean;
  index?: number;
  onIndexChange?: Func<void, [nextIndex: React.SetStateAction<number>]>;
  pageGap?: number;
  pageSize?: number;
};

export default CarouselProps;
