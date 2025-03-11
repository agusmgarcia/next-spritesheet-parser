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
      <div className="relative flex flex-col">
        {/* HEADING */}
        <Typography
          {...heading}
          className={twMerge("text-white", heading.className)}
        >
          <Button className="text-left" onClick={toggle}>
            {heading.children}
          </Button>
        </Typography>

        {/* DIVIDER */}
        <div className="h-[2px] w-full bg-white" />

        {/* COLLAPSE / EXPAND */}
        <div className="absolute bottom-0 right-0 size-8 rounded-t-lg bg-white">
          <Button className="flex items-center justify-center" onClick={toggle}>
            <Icon variant={expanded ? "arrowUp" : "arrowDown"} />
          </Button>
        </div>
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
