import useAccordion from "./Accordion.hooks";
import type AccordionProps from "./Accordion.types";
import { AccordionItem } from "./AccordionItem";

export default function Accordion(props: AccordionProps) {
  const { children, heading, ...rest } = useAccordion(props);

  return (
    <div {...rest} className="flex size-full flex-col gap-4">
      {/* HEADING */}
      {heading}

      {/* CHILDREN */}
      <div className="flex size-full flex-col gap-2 overflow-auto">
        {children}
      </div>
    </div>
  );
}

Accordion.Item = AccordionItem;
