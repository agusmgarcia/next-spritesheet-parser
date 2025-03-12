import type ButtonProps from "./Button.types";

export default function useButton({
  type: typeFromProps,
  ...rest
}: ButtonProps) {
  return { ...rest, type: typeFromProps || "button" };
}
