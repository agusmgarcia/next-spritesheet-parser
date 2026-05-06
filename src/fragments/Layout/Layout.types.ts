import { type InstructionsButtonProps } from "./InstructionsButton";

type LayoutProps = Pick<React.HTMLAttributes<HTMLElement>, "children"> & {
  instructions?: InstructionsButtonProps["instructions"];
  sideBar?: React.ReactNode;
};

export default LayoutProps;
