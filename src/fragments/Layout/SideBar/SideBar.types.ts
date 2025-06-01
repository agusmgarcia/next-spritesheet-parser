import { type Func } from "@agusmgarcia/react-core";

type SideBarProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className"
> & {
  collapsed?: boolean;
  onCollapsedChange?: Func<void, [collapsed: boolean]>;
  version?: string;
};

export default SideBarProps;
