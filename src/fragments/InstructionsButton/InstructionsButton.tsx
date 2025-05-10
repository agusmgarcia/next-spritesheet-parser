import { twMerge } from "tailwind-merge";

import { Button, Icon } from "#src/components";

import useInstructionsButton from "./InstructionsButton.hooks";
import type InstructionsButtonProps from "./InstructionsButton.types";
import InstructionsModal from "./InstructionsModal";

export default function InstructionsButton(props: InstructionsButtonProps) {
  const { className, instructions, onClick, onClose, open } =
    useInstructionsButton(props);

  return (
    <>
      {/* MODAL */}
      <InstructionsModal
        instructions={instructions}
        onClose={onClose}
        open={open}
      />

      {/* BUTTON */}
      <Button
        className={twMerge(
          "flex size-12 items-center justify-center rounded-full shadow-sm shadow-cranberry-600",
          className,
        )}
        onClick={onClick}
        variant="secondary"
      >
        <Icon variant="interrogation" />
      </Button>
    </>
  );
}
