import { type Func } from "@agusmgarcia/react-core";

import { type SetValue } from "#src/utils";

type CarouselProps = Pick<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  hideArrows?: boolean;
  index?: number;
  onIndexChange?: Func<void, [nextIndex: SetValue<number>]>;
  pageGap?: number;
  pageSize?: number;
};

export default CarouselProps;
