import React, { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Icon } from "../Icon";
import type SelectProps from "./Select.types";

export default function useSelect(props: SelectProps) {
  const style = useMemo<React.CSSProperties>(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      backgroundImage: `url("data:image/svg+xml;utf8,${renderToStaticMarkup(
        React.createElement(Icon, {
          style: {
            color: !props.disabled
              ? styles.getPropertyValue("--color-black")
              : styles.getPropertyValue("--color-gray-400"),
          },
          variant: "arrowDown",
        }),
      )
        .replaceAll(`"`, `'`)
        .replaceAll("#", "%23")}")`,
    };
  }, [props.disabled]);

  return { ...props, style };
}
