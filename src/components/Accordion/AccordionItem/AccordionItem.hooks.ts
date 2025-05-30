import { children } from "@agusmgarcia/react-core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Button, Icon, Typography } from "#src/components";

import type AccordionItemProps from "./AccordionItem.types";

export default function useAccordionItem({
  defaultCollapsed: defaultCollapsedFromProps,
  heading: headingFromProps,
  ...rest
}: AccordionItemProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(!defaultCollapsedFromProps);

  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  const heading = children.mapOfType(Typography, headingFromProps, (child) =>
    React.createElement(
      Typography,
      {
        ...child.props,
        className: twMerge(
          child.props.className,
          "[&>button:not(:hover)>svg]:text-black transition-colors",
        ),
      },
      React.createElement(
        Button,
        {
          className: "flex items-center justify-between",
          onClick: toggle,
          variant: "raw",
        },
        child.props.children,
        React.createElement(Icon, {
          className:
            "flex size-9 items-center justify-center rounded-lg rounded-b-none bg-white",
          variant: expanded ? "arrowUp" : "arrowDown",
        }),
      ),
    ),
  );

  useEffect(() => {
    setExpanded(!defaultCollapsedFromProps);
  }, [defaultCollapsedFromProps]);

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
