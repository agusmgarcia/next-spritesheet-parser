import { useCallback, useState } from "react";

import type SideBarProps from "./SideBar.types";

export default function useSideBar(props: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const onClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => setCollapsed((prev) => !prev),
    [],
  );

  return { ...props, collapsed, onClick };
}
