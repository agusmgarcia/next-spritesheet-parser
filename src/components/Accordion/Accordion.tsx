import { twMerge } from "tailwind-merge";

import { Typography } from "#src/components";

import useAccordion from "./Accordion.hooks";
import type AccordionProps from "./Accordion.types";
import AccordionItem from "./AccordionItem";

export default function Accordion(props: AccordionProps) {
  const { heading, ...rest } = useAccordion(props);

  return (
    <div className="flex size-full flex-col gap-4">
      {/* TITLE */}
      <Typography
        {...heading}
        className={twMerge("text-white", heading.className)}
      />

      {/* CHILDREN */}
      <div {...rest} className="flex size-full flex-col gap-2 overflow-auto" />
    </div>
  );
}

Accordion.Item = AccordionItem;
