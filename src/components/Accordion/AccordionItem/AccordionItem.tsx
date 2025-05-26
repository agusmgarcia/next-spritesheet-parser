import { twMerge } from "tailwind-merge";

import useAccordionItem from "./AccordionItem.hooks";
import type AccordionItemProps from "./AccordionItem.types";

export default function AccordionItem(props: AccordionItemProps) {
  const { bodyRef, children, className, expanded, heading, ...rest } =
    useAccordionItem(props);

  return (
    <div {...rest} className="flex flex-col gap-1">
      {/* HEADER */}
      <div className="flex flex-col">
        {heading}

        {/* DIVIDER */}
        <div className="h-[2px] w-full bg-white" />
      </div>

      {/* BODY */}
      <div
        ref={bodyRef}
        className={twMerge(
          "overflow-hidden transition-[max-height]",
          expanded ? "max-h-dvh" : "max-h-0",
        )}
      >
        <div className={twMerge("size-full py-2", className)}>{children}</div>
      </div>
    </div>
  );
}
