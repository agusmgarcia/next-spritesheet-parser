import { children } from "@agusmgarcia/react-essentials-utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Button, Icon, Typography } from "#src/components";

import type AccordionItemProps from "./AccordionItem.types";

export default function useAccordionItem({
  defaultCollapsed: defaultCollapsedFromProps,
  disabled: disabledFromProps,
  heading: headingFromProps,
  ...rest
}: AccordionItemProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(!defaultCollapsedFromProps);

  const toggle = useCallback(() => {
    if (!!disabledFromProps) return;
    setExpanded((prev) => !prev);
  }, [disabledFromProps]);

  const heading = children.mapOfType(Typography, headingFromProps, (child) =>
    React.createElement(
      Typography,
      child.props,
      React.createElement(
        Button,
        {
          className: "group flex items-center justify-between text-white",
          disabled: disabledFromProps,
          onClick: toggle,
          variant: "raw",
        },
        child.props.children,
        React.createElement(Icon, {
          className:
            "flex size-9 items-center justify-center rounded-lg rounded-b-none bg-white group-[&:not(:hover):enabled]:text-black transition-colors",
          variant: expanded ? "arrowUp" : "arrowDown",
        }),
      ),
    ),
  );

  useEffect(() => {
    setExpanded(!defaultCollapsedFromProps);
  }, [defaultCollapsedFromProps, disabledFromProps]);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    if (!expanded) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== body) return;
      body.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    };

    body.addEventListener("transitionend", handleTransitionEnd);
    return () => body.removeEventListener("transitionend", handleTransitionEnd);
  }, [expanded]);

  return { ...rest, bodyRef, expanded, heading };
}
