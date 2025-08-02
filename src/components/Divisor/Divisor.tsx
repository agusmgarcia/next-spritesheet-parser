import { twMerge } from "tailwind-merge";

import useDivisor from "./Divisor.hooks";
import type DivisorProps from "./Divisor.types";

export default function Divisor(props: DivisorProps) {
  const { className, ...rest } = useDivisor(props);

  return (
    <div
      {...rest}
      className={twMerge("h-px w-full rounded-full bg-black", className)}
    />
  );
}
