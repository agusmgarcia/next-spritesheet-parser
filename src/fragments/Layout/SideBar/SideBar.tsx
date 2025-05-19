import { twMerge } from "tailwind-merge";

import { Button, Icon, Typography } from "#src/components";

import useSideBar from "./SideBar.hooks";
import type SideBarProps from "./SideBar.types";

export default function SideBar(props: SideBarProps) {
  const {
    children,
    className,
    collapsed,
    collapseHidden,
    onClick,
    version,
    ...rest
  } = useSideBar(props);

  return (
    <div
      {...rest}
      className={twMerge(
        "relative flex flex-col bg-gray-800 p-4 pb-0",
        "transition-transform",
        collapsed && "translate-x-full",
        className,
      )}
    >
      {!collapseHidden && (
        <Button
          className="absolute bottom-[9px] left-[-36px] flex size-9 items-center justify-center rounded-l-lg bg-gray-800 text-white"
          onClick={onClick}
        >
          <Icon variant={collapsed ? "arrowLeft" : "arrowRight"} />
        </Button>
      )}

      {/* CHILDREN */}
      <div className="size-full overflow-y-auto overflow-x-hidden">
        {children}
      </div>

      {/* VERSION */}
      <div className="py-2">
        <Typography className="text-right text-white">{version}</Typography>
      </div>
    </div>
  );
}
