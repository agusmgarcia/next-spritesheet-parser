import React from "react";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line project-structure/independent-modules
import { Markdown } from "../Markdown";
import useTypography from "./Typography.hooks";
import type TypographyProps from "./Typography.types";

export default function Typography(props: TypographyProps) {
  const { children, className, variant, ...rest } = useTypography(props);

  return React.createElement(
    variant || "p",
    {
      ...rest,
      className: twMerge(
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
