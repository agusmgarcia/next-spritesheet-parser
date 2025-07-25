import { type Func } from "@agusmgarcia/react-essentials-utils";

type ModalProps = Pick<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  "children" | "open"
> & {
  footer?: React.ReactNode;
  heading?: React.ReactNode;
  onClose?: Func;
};

export default ModalProps;
