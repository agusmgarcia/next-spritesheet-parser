import { type ButtonProps } from "#src/components";

type InstructionsButtonProps = Pick<ButtonProps, "className"> & {
  instructions: {
    keys: {
      description: string;
      key: string;
      options?: Partial<{ altKey: boolean }>;
    }[];
    title: string;
  }[];
};

export default InstructionsButtonProps;
