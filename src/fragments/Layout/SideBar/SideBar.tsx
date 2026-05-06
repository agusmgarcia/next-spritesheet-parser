import { twMerge } from "tailwind-merge";

import { Typography } from "#src/components";

import useSideBar from "./SideBar.hooks";
import type SideBarProps from "./SideBar.types";

export default function SideBar(props: SideBarProps) {
  const { children, className, version, ...rest } = useSideBar(props);

  return (
    <div
      {...rest}
      className={twMerge(
        "relative flex flex-col bg-gray-800 p-4 pb-0",
        className,
      )}
    >
      {/* CHILDREN */}
      <div className="size-full overflow-x-hidden overflow-y-auto">
        {children}
      </div>

      {/* VERSION */}
      <div className="py-2">
        <Typography className="text-right text-white">{version}</Typography>
      </div>
    </div>
  );
}
