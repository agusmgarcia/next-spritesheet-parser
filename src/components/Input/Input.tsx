import { twMerge } from "tailwind-merge";

import useInput from "./Input.hooks";
import type InputProps from "./Input.types";

export default function Input(props: InputProps) {
  const { className, ...rest } = useInput(props);

  if (rest.type === "color")
    return (
      <input
        {...rest}
        className={twMerge(
          "size-full cursor-pointer appearance-none rounded-lg border border-black bg-white p-2 outline outline-1 outline-offset-0 outline-transparent",
          "transition-colors",
          "focus-within:-outline-offset-2 focus-within:outline-cranberry-600",
          "enabled:hover:bg-cranberry-300 enabled:focus:bg-cranberry-300",
          "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
          className,
        )}
      />
    );

  return (
    <input
      {...rest}
      className={twMerge(
        "size-full cursor-text rounded-lg border border-black bg-white p-2 text-black outline outline-1 outline-offset-0 outline-transparent",
        "transition-colors",
        "enabled:hover:bg-cranberry-300 enabled:focus:bg-cranberry-300",
        "focus-within:-outline-offset-2 focus-within:outline-cranberry-600",
        "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
        className,
      )}
    />
  );
}
