import { twMerge } from "tailwind-merge";

import useInput from "./Input.hooks";
import type InputProps from "./Input.types";

export default function Input(props: InputProps) {
  const { className, ...rest } = useInput(props);

  return (
    <input
      {...rest}
      className={twMerge(
        "size-full cursor-text rounded-lg border border-black p-2 text-black",
        "transition-colors",
        "focus-visible:outline-cranberry-600",
        "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
        className,
      )}
    />
  );
}
