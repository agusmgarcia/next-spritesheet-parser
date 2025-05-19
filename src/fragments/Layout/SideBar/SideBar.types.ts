type SideBarProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className"
> & { collapseHidden?: boolean; version?: string };

export default SideBarProps;
