import { useMemo } from "react";

import type InstructionsModalProps from "./InstructionsModal.types";

export default function useInstructionsModal({
  instructions: instructionsFromProps,
  ...rest
}: InstructionsModalProps) {
  const instructions = useMemo(
    () =>
      instructionsFromProps
        ?.map((i) => ({
          keys: i.keys.map((k) => ({
            description: k.description,
            extraKeys: [!!k.options?.altKey && "Alt"].filter((k) => !!k),
            key: k.key.toUpperCase(),
          })),
          title: i.title,
        }))
        .concat({
          keys: [
            {
              description: "Open the instructions modal",
              extraKeys: [],
              key: "H",
            },
          ],
          title: "Others",
        }),
    [instructionsFromProps],
  );

  return { ...rest, instructions };
}
