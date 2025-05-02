import React, { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Icon } from "#src/components";

import type SelectProps from "./Select.types";

export default function useSelect(props: SelectProps) {
  const style = useMemo<React.CSSProperties>(
    () => ({
      backgroundImage: `url("data:image/svg+xml;utf8,${renderToStaticMarkup(
        React.createElement(Icon, {
          style: { color: !props.disabled ? "black" : "rgb(156 163 175)" },
          variant: "arrowDown",
        }),
      )
        .replaceAll(`"`, `'`)
        .replaceAll("#", "%23")}")`,
    }),
    [props.disabled],
  );

  return { ...props, style };
}
