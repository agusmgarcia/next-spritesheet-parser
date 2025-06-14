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
        .filter((i) => i.title !== "Others")
        .map((i) => ({ keys: i.keys.map(toKey), title: i.title }))
        .concat({
          keys: [
            ...instructionsFromProps
              .filter((i) => i.title === "Others")
              .flatMap((i) => i.keys)
              .map(toKey),
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

function toKey(
  key: InstructionsModalProps["instructions"][number]["keys"][number],
): {
  description: string;
  extraKeys: string[];
  id: string;
  key: React.ReactNode;
} {
  return {
    description: key.description,
    extraKeys: [
      !!key.options?.altKey ? (isMacOS() ? "Opt" : "Alt") : "",
    ].filter((k) => !!k),
    id: key.key,
    key: transformKey(key.key),
  };
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
