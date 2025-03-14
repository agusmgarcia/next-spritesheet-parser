import { twMerge } from "tailwind-merge";

import useSelect from "./Select.hooks";
import type SelectProps from "./Select.types";

export default function Select(props: SelectProps) {
  const { className, ...rest } = useSelect(props);

  return (
    <select
      {...rest}
      className={twMerge(
        "size-full cursor-pointer appearance-none rounded-lg border border-black bg-white bg-[right_0.25rem_center] bg-no-repeat p-2 pr-7 text-black outline outline-1 outline-offset-0 outline-transparent",
        "transition-colors",
        "enabled:hover:bg-cranberry-300",
        "focus-within:-outline-offset-2 focus-within:outline-cranberry-600",
        "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
        className,
      )}
    />
  );
}
