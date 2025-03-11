import { useMemo } from "react";

import { type TypographyProps } from "../Typography";
import type AccordionProps from "./Accordion.types";

export default function useAccordion({
  heading: headingFromProps,
  ...props
}: AccordionProps) {
  const heading = useMemo<TypographyProps>(
    () => ({
      ...headingFromProps,
      children: headingFromProps.children || "No name",
      className: !headingFromProps.children
        ? !!headingFromProps.className
          ? `invisible ${headingFromProps.className}`
          : "invisible"
        : headingFromProps.className,
    }),
    [headingFromProps],
  );

  return { ...props, heading };
}
