import { twMerge } from "tailwind-merge";

import useButton from "./Button.hooks";
import type ButtonProps from "./Button.types";

export default function Button(props: ButtonProps) {
  const { className, variant, ...rest } = useButton(props);

  switch (variant) {
    case "primary":
      return (
        <button
          {...rest}
          className={twMerge(
            "size-full cursor-pointer rounded-lg border border-cranberry-600 bg-cranberry-600 p-2 text-white",
            "transition-colors",
            "enabled:hover:bg-cranberry-500",
            "disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400",
            className,
          )}
        />
      );

    case "secondary":
      return (
        <button
          {...rest}
          className={twMerge(
            "size-full cursor-pointer rounded-lg border border-black bg-white p-2 text-black",
            "transition-colors",
            "enabled:hover:bg-cranberry-300",
            "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
            className,
          )}
        />
      );

    case "raw":
    default:
      return (
        <button
          {...rest}
          className={twMerge(
            "size-full cursor-pointer",
            "transition-colors",
            "enabled:hover:text-cranberry-300",
            "disabled:cursor-not-allowed disabled:text-gray-400",
            className,
          )}
        />
      );
  }
}
