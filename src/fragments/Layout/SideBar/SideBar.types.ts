type SideBarProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "style"
> & {
  version?: string;
};

export default SideBarProps;
