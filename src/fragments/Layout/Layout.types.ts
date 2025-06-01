import { type InstructionsButtonProps } from "./InstructionsButton";

type LayoutProps = Pick<React.HTMLAttributes<HTMLElement>, "children"> & {
  instructions?: InstructionsButtonProps["instructions"];
  sideBar?: React.ReactNode;
  sideBarCollapsable?: boolean;
};

export default LayoutProps;
