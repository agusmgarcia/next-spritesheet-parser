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
          "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:checked:bg-gray-400",
          className,
        )}
      />
    );

  if (rest.type === "range")
    return (
      <input
        {...rest}
        className={twMerge(
          "relative my-[18px] h-[6px] w-full cursor-pointer appearance-none rounded-lg bg-white bg-gradient-to-r from-cranberry-600 to-white outline-1 outline-offset-0 outline-transparent",
          "[&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-cranberry-600 [&::-webkit-slider-thumb]:transition-colors [&::-webkit-slider-thumb]:enabled:hover:bg-cranberry-500",
          "[&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-cranberry-600 [&::-moz-range-thumb]:transition-colors [&::-moz-range-thumb]:enabled:hover:bg-cranberry-500",
          "transition-colors",
          "enabled:hover:from-cranberry-500",
          "after:absolute after:bottom-full after:translate-x-[var(--translate-x)] after:rounded-t-lg after:bg-black after:px-4 after:text-sm after:opacity-0 after:transition-[opacity,_transform] after:content-[attr(value)] hover:after:opacity-100",
          "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:from-gray-400 disabled:to-gray-100 [&::-moz-range-thumb]:disabled:bg-gray-400 [&::-webkit-slider-thumb]:disabled:bg-gray-400",
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
