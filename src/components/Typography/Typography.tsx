import React from "react";
import { twMerge } from "tailwind-merge";

import Markdown from "../Markdown";
import type TypographyProps from "./Typography.types";

export default function Typography({
  children,
  className,
  variant,
  ...rest
}: TypographyProps) {
  return React.createElement(
    variant || "p",
    {
      ...rest,
      className: twMerge(
        "font-sans",
        variant === "h1"
          ? "text-3xl"
          : variant === "h2"
            ? "text-xl"
            : variant === "h3"
              ? "text-lg"
              : "text-base",
        className,
      ),
    },
    <Markdown>{children}</Markdown>,
  );
}
