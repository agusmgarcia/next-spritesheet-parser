import React, { useMemo } from "react";
import type ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { twMerge } from "tailwind-merge";

import type MarkdownProps from "./Markdown.types";

export default function useMarkdown(props: MarkdownProps) {
  const allowedElements = useMemo<string[]>(
    () => ["br", "del", "em", "p", "s", "strong"],
    [],
  );

  const components = useMemo<Parameters<typeof ReactMarkdown>[0]["components"]>(
    () => ({
      br: ({ className, node: _, ...rest }) =>
        React.createElement("br", {
          ...rest,
          className: twMerge("mt-2 block content-['']", className),
        }),
      p: ({ children }) => children,
      strong: ({ className, node: _, ...rest }) =>
        React.createElement("strong", {
          ...rest,
          className: twMerge("font-medium", className),
        }),
    }),
    [],
  );

  const rehypePlugins = useMemo<
    Parameters<typeof ReactMarkdown>[0]["rehypePlugins"]
  >(() => [rehypeRaw], []);

  const remarkPlugins = useMemo<
    Parameters<typeof ReactMarkdown>[0]["remarkPlugins"]
  >(() => [remarkGfm], []);

  return {
    ...props,
    allowedElements,
    components,
    rehypePlugins,
    remarkPlugins,
  };
}
