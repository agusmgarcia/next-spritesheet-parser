import { twMerge } from "tailwind-merge";

import { Button, Icon } from "#src/components";

import useInstructionsButton from "./InstructionsButton.hooks";
import type InstructionsButtonProps from "./InstructionsButton.types";
import InstructionsModal from "./InstructionsModal";

export default function InstructionsButton(props: InstructionsButtonProps) {
  const { className, instructionsModalProps, ...rest } =
    useInstructionsButton(props);

  return (
    <>
      {/* BUTTON */}
      <Button
        {...rest}
        className={twMerge(
          "flex size-12 items-center justify-center rounded-full shadow-sm shadow-cranberry-600",
          className,
        )}
        variant="secondary"
      >
        <Icon variant="interrogation" />
      </Button>

      {/* MODAL */}
      <InstructionsModal {...instructionsModalProps} />
    </>
  );
}
