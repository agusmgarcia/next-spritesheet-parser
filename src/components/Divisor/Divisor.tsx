import useDivisor from "./Divisor.hooks";
import type DivisorProps from "./Divisor.types";

export default function Divisor(props: DivisorProps) {
  const { ...rest } = useDivisor(props);

  return <div {...rest} className="h-px w-full rounded-full bg-black" />;
}
