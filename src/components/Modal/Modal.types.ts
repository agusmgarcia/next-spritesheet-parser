import { type Func } from "@agusmgarcia/react-core";

type ModalProps = {
  children?: React.ReactNode;
  footer?: React.ReactNode;
  heading?: React.ReactNode;
  onClose?: Func;
  open?: boolean;
};

export default ModalProps;
