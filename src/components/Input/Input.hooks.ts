import type InputProps from "./Input.types";

export default function useInput({ type, ...props }: InputProps) {
  return { ...props, type: type || "text" };
}
