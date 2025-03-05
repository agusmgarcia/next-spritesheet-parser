import { twMerge } from "tailwind-merge";

import useInput from "./Input.hooks";
import type InputProps from "./Input.types";

export default function Input(props: InputProps) {
  const { className, label, ...rest } = useInput(props);

  return (
    <input
      {...rest}
      aria-label={label}
      className={twMerge(
        "rounded-lg border border-black p-2 focus-visible:outline-cranberry-600",
        "transition-colors",
        "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:placeholder:text-gray-500",
        className,
      )}
      placeholder={label}
    />
  );
}
