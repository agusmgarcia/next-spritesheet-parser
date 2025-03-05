import { type Func } from "@agusmgarcia/react-core";

import { type SetValue } from "#src/utils";

type CarouselProps = {
  children?: React.ReactNode;
  index?: number;
  onIndexChange?: Func<void, [nextIndex: SetValue<number>]>;
  pageGap?: number;
  pageSize?: number;
};

export default CarouselProps;
