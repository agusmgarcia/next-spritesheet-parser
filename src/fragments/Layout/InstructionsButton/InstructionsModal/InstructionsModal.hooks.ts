import React, { useMemo } from "react";

import { Icon } from "#src/components";
import { isMacOS } from "#src/utils";

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
            extraKeys: [
              !!k.options?.altKey ? (isMacOS() ? "Opt" : "Alt") : "",
            ].filter((k) => !!k),
            id: k.key,
            key: transformKey(k.key),
          })),
          title: i.title,
        }))
        .concat({
          keys: [
            {
              description: "Open the instructions modal",
              extraKeys: [],
              id: "h",
              key: "H",
            },
          ],
          title: "Others",
        }),
    [instructionsFromProps],
  );

  return { ...rest, instructions };
}

function transformKey(key: string): React.ReactNode {
  switch (key) {
    case " ":
      return React.createElement(Icon, { variant: "spaceBar" });

    case "ArrowUp":
      return React.createElement(Icon, { variant: "arrowUp" });

    case "ArrowRight":
      return React.createElement(Icon, { variant: "arrowRight" });

    case "ArrowDown":
      return React.createElement(Icon, { variant: "arrowDown" });

    case "ArrowLeft":
      return React.createElement(Icon, { variant: "arrowLeft" });

    default:
      return key.toUpperCase();
  }
}
