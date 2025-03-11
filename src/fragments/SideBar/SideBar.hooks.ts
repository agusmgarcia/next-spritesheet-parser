import { useEffect, useState } from "react";

import type SideBarProps from "./SideBar.types";

export default function useSideBar(props: SideBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return { ...props, visible };
}
