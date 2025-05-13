import { children as childrenModule } from "@agusmgarcia/react-core";
import ReactMarkdown from "react-markdown";

import useMarkdown from "./Markdown.hooks";
import type MarkdownProps from "./Markdown.types";

export default function Markdown(props: MarkdownProps) {
  const { children, ...rest } = useMarkdown(props);

  return childrenModule.mapOfType(
    "string",
    children,
    (child) => (
      <ReactMarkdown {...rest}>
        {child.replaceAll("\r", "").replaceAll("\n\n", "<br />")}
      </ReactMarkdown>
    ),
    (child) => childrenModule.isOfType(Markdown, child),
  );
}
