import { useCallback, useState } from "react";

import type AccordionItemProps from "./AccordionItem.types";

export default function useAccordionItem({
  defaultCollapsed,
  ...rest
}: AccordionItemProps) {
  const [expanded, setExpanded] = useState(!defaultCollapsed);

  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  return { ...rest, expanded, toggle };
}
