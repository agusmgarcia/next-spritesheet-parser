import type ButtonProps from "./Button.types";

export default function useButton({
  type: typeFromProps,
  ...props
}: ButtonProps) {
  return { ...props, type: typeFromProps || "button" };
}
