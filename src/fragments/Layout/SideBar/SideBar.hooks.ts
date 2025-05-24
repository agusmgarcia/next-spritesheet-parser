import { useCallback } from "react";

import type SideBarProps from "./SideBar.types";

export default function useSideBar({
  collapsedOnChange,
  ...rest
}: SideBarProps) {
  const onClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const collapsed = event.currentTarget.dataset.collapsed === "true";
      collapsedOnChange?.(!collapsed);
    },
    [collapsedOnChange],
  );

  return { ...rest, onClick };
}
