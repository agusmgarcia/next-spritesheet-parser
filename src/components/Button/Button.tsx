import { twMerge } from "tailwind-merge";

import Markdown from "../Markdown";
import useButton from "./Button.hooks";
import type ButtonProps from "./Button.types";

export default function Button(props: ButtonProps) {
  const { children, className, variant, ...rest } = useButton(props);

  switch (variant) {
    case "primary":
      return (
        <button
          {...rest}
          className={twMerge(
            "size-full cursor-pointer rounded-lg border border-cranberry-600 bg-cranberry-600 p-2 text-white outline outline-1 outline-offset-0 outline-transparent",
            "transition-colors",
            "enabled:hover:bg-cranberry-500",
            "focus-within:-outline-offset-2 focus-within:outline-white",
            "disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400",
            className,
          )}
        >
          <Markdown>{children}</Markdown>
        </button>
      );

    case "secondary":
      return (
        <button
          {...rest}
          className={twMerge(
            "size-full cursor-pointer rounded-lg border border-black bg-white p-2 text-black outline outline-1 outline-offset-0 outline-transparent",
            "transition-colors",
            "enabled:hover:bg-cranberry-300",
            "focus-within:-outline-offset-2 focus-within:outline-cranberry-600",
            "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
            className,
          )}
        >
          <Markdown>{children}</Markdown>
        </button>
      );

    case "raw":
    default:
      return (
        <button
          {...rest}
          className={twMerge(
            "size-full cursor-pointer text-black outline outline-1 outline-offset-0 outline-transparent",
            "transition-colors",
            "enabled:hover:text-cranberry-300",
            "focus-within:-outline-offset-2 focus-within:outline-cranberry-600",
            "disabled:cursor-not-allowed disabled:text-gray-400",
            className,
          )}
        >
          <Markdown>{children}</Markdown>
        </button>
      );
  }
}
