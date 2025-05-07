import { twMerge } from "tailwind-merge";

import Button from "#src/components/Button";
import Icon from "#src/components/Icon";
import Typography from "#src/components/Typography";

import useAccordionItem from "./AccordionItem.hooks";
import type AccordionItemProps from "./AccordionItem.types";

export default function AccordionItem(props: AccordionItemProps) {
  const { children, className, expanded, heading, toggle, ...rest } =
    useAccordionItem(props);

  return (
    <div {...rest} className="flex flex-col gap-1">
      {/* HEADER */}
      <div className="flex flex-col">
        {/* HEADING */}
        <Typography {...heading}>
          {/* CHILDREN */}
          <Button
            className="group flex items-center justify-between text-white hover:text-[unset]"
            onClick={toggle}
          >
            {heading.children}
            <Icon
              className="size-8 rounded-t-lg bg-white text-black hover:text-[unset] group-hover:text-[unset]"
              variant={expanded ? "arrowUp" : "arrowDown"}
            />
          </Button>
        </Typography>

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
