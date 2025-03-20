import { useMemo } from "react";

import { type TypographyProps } from "#src/components";

import type FilesItemProps from "./FilesItem.types";

export default function useFilesItem(props: FilesItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({
      children: "Files",
      variant: "h2",
    }),
    [],
  );

  return { ...props, heading };
}
