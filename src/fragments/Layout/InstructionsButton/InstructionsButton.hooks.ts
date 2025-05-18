import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useState } from "react";

import { useKeyDown } from "#src/utils";

import type InstructionsButtonProps from "./InstructionsButton.types";

export default function useInstructionsButton({
  instructions: instructionsFromProps,
  ...rest
}: InstructionsButtonProps) {
  const [open, setOpen] = useState(false);

  const onClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => setOpen(true),
    [],
  );

  const onOpen = useCallback<Func>(() => setOpen(true), []);

  const onClose = useCallback<Func>(() => setOpen(false), []);

  useKeyDown("h", onOpen);

  return {
    ...rest,
    instructionsModalProps: {
      instructions: instructionsFromProps,
      onClose,
      open,
    },
    onClick,
  };
}
