import React, { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import tailwindConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

import { Icon } from "#src/components";

import type SelectProps from "./Select.types";

const config = resolveConfig(tailwindConfig);

export default function useSelect(props: SelectProps) {
  const style = useMemo<React.CSSProperties>(
    () => ({
      backgroundImage: `url("data:image/svg+xml;utf8,${renderToStaticMarkup(
        React.createElement(Icon, {
          style: {
            color: !props.disabled
              ? config.theme.colors.black
              : config.theme.colors.gray[400],
          },
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
