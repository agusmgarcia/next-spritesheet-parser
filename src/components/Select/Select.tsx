import { twMerge } from "tailwind-merge";

import useSelect from "./Select.hooks";
import type SelectProps from "./Select.types";

export default function Select(props: SelectProps) {
  const { className, ...rest } = useSelect(props);

  return (
    <select
      {...rest}
      className={twMerge(
        "size-full cursor-pointer rounded-lg border border-black p-2 text-black",
        "transition-colors",
        "focus-within:outline-cranberry-600",
        "disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400",
        className,
      )}
    />
  );
}
