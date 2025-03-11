import { useCallback, useState } from "react";

import type AccordionItemProps from "./AccordionItem.types";

export default function useAccordionItem(props: AccordionItemProps) {
  const [expanded, setExpanded] = useState(true);

  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  return { ...props, expanded, toggle };
}
