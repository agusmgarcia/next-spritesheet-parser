import React, { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Icon } from "#src/components";

import type SelectProps from "./Select.types";

export default function useSelect(props: SelectProps) {
  const style = useMemo<React.CSSProperties>(
    () => ({
      backgroundImage: `url("data:image/svg+xml;utf8,${renderToStaticMarkup(
        React.createElement(Icon, { variant: "arrowDown" }),
      )
        .replaceAll(`"`, `'`)
        .replaceAll("#", "%23")}")`,
    }),
    [],
  );

  return { ...props, style };
}
