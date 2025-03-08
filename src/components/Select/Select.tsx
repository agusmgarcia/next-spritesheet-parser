import { twMerge } from "tailwind-merge";

import useSelect from "./Select.hooks";
import type SelectProps from "./Select.types";

export default function Select(props: SelectProps) {
  const { className, ...rest } = useSelect(props);

  return (
    <select
      {...rest}
      className={twMerge(
        "size-full cursor-pointer appearance-none rounded-lg border border-black bg-white p-2 text-black outline outline-1 outline-offset-0 outline-transparent",
        "transition-colors",
        "focus-within:-outline-offset-2 focus-within:outline-cranberry-600",
        "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
        className,
      )}
    />
  );
}
