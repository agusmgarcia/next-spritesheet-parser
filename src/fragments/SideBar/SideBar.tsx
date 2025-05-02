import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

import useSideBar from "./SideBar.hooks";
import type SideBarProps from "./SideBar.types";

const CONTAINER_ID = "__side_bar_container__";

export default function SideBar(props: SideBarProps) {
  const { children, className, visible, ...rest } = useSideBar(props);

  if (!visible) return <></>;

  const container = document.getElementById(CONTAINER_ID);
  if (!container) return <></>;

  return ReactDOM.createPortal(
    <div {...rest} className={twMerge("size-full", className)}>
      {children}
    </div>,
    container,
  );
}

SideBar.Container = function SideBarContainer(
  props: Pick<React.HTMLAttributes<HTMLDivElement>, "className">,
) {
  return <div className={props.className} id={CONTAINER_ID} />;
};
