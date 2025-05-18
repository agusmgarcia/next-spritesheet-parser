import { twMerge } from "tailwind-merge";

import { Button, Icon } from "#src/components";

import useAccordionItem from "./AccordionItem.hooks";
import type AccordionItemProps from "./AccordionItem.types";

export default function AccordionItem(props: AccordionItemProps) {
  const { children, className, expanded, heading, toggle, ...rest } =
    useAccordionItem(props);

  return (
    <div {...rest} className="flex flex-col gap-1">
      {/* HEADER */}
      <div className="flex flex-col">
        <div
          className={twMerge(
            "flex items-center justify-between",
            !heading && "justify-end",
          )}
        >
          {/* HEADING */}
          {heading}

          <Button
            className="flex size-8 items-center justify-center rounded-b-none"
            onClick={toggle}
            variant="secondary"
          >
            <Icon variant={expanded ? "arrowUp" : "arrowDown"} />
          </Button>
        </div>

        {/* DIVIDER */}
        <div className="h-[2px] w-full bg-white" />
      </div>

      {/* BODY */}
      <div
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
