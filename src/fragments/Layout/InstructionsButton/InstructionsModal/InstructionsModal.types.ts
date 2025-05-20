import { type ModalProps } from "#src/components";

type InstructionsModalProps = Pick<ModalProps, "onClose" | "open"> & {
  instructions: {
    keys: {
      description: string;
      key: string;
      options?: Partial<{ altKey: boolean }>;
    }[];
    title: string;
  }[];
};

export default InstructionsModalProps;
