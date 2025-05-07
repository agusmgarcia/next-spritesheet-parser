import { useCallback, useEffect, useState } from "react";

import type AccordionItemProps from "./AccordionItem.types";

export default function useAccordionItem({
  defaultCollapsed,
  ...rest
}: AccordionItemProps) {
  const [expanded, setExpanded] = useState(!defaultCollapsed);

  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  useEffect(() => {
    setExpanded(!defaultCollapsed);
  }, [defaultCollapsed]);

  return { ...rest, expanded, toggle };
}
