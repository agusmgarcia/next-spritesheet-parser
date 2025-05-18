import type DivisorProps from "./Divisor.types";

export default function Divisor(props: DivisorProps) {
  return <div {...props} className="h-[0.5px] w-full rounded-full bg-black" />;
}
