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
          "size-full min-h-[42px] cursor-pointer appearance-none rounded-lg border border-black bg-white p-2 outline outline-1 outline-offset-0 outline-transparent",
          "transition-colors",
          "focus-within:-outline-offset-2 focus-within:outline-cranberry-600",
          "enabled:hover:bg-cranberry-300 enabled:focus:bg-cranberry-300",
          "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
          className,
        )}
      />
    );

  if (rest.type === "checkbox")
    return (
      <input
        {...rest}
        className={twMerge(
          "relative",
          "size-[42px] max-h-[42px] max-w-[42px] cursor-pointer appearance-none rounded-lg border-black bg-white p-2 outline outline-1 outline-offset-0 outline-transparent",
          "transition-colors",
          "focus-within:-outline-offset-2 focus-within:outline-cranberry-600",
          "enabled:hover:bg-cranberry-300",
          "checked:bg-cranberry-600 checked:enabled:hover:bg-cranberry-500",
          "after:checked:absolute after:checked:left-1/2 after:checked:top-1/2 after:checked:h-4 after:checked:w-2 after:checked:-translate-x-1/2 after:checked:-translate-y-2/3 after:checked:rotate-45 after:checked:border-solid after:checked:border-white after:checked:content-[''] after:checked:[border-width:_0_3px_3px_0]",
          className,
        )}
      />
    );

  return (
    <input
      {...rest}
      className={twMerge(
        "size-full min-h-[42px] cursor-text rounded-lg border border-black bg-white p-2 text-black outline outline-1 outline-offset-0 outline-transparent",
        rest.type === "number" && "pl-4",
        "transition-colors",
        "enabled:hover:bg-cranberry-300 enabled:focus:bg-cranberry-300",
        "focus-within:-outline-offset-2 focus-within:outline-cranberry-600",
        "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
        "placeholder:italic placeholder:text-gray-400",
        className,
      )}
    />
  );
}
