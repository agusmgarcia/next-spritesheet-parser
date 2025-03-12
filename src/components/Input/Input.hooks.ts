import type InputProps from "./Input.types";

export default function useInput({ type: typeFromProps, ...rest }: InputProps) {
  return { ...rest, type: typeFromProps || "text" };
}
