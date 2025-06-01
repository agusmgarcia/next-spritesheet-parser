import { useCallback, useMemo } from "react";

import type SideBarProps from "./SideBar.types";

export default function useSideBar({
  collapsed: collapsedFromProps,
  onCollapsedChange: onCollapsedChangeFromProps,
  ...rest
}: SideBarProps) {
  const collapseHidden = useMemo<boolean>(
    () =>
      typeof collapsedFromProps === "undefined" &&
      typeof onCollapsedChangeFromProps === "undefined",
    [collapsedFromProps, onCollapsedChangeFromProps],
  );

  const onClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) =>
      onCollapsedChangeFromProps?.(
        event.currentTarget.dataset.collapsed !== "true",
      ),
    [onCollapsedChangeFromProps],
  );

  return { ...rest, collapsed: collapsedFromProps, collapseHidden, onClick };
}
