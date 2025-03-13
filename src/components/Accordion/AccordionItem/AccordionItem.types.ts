import { type TypographyProps } from "#src/components/Typography";

type AccordionItemProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className"
> & { defaultCollapsed?: boolean; heading: TypographyProps };

export default AccordionItemProps;
