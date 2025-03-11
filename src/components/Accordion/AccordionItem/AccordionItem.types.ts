import { type TypographyProps } from "#src/components/Typography";

type AccordionItemProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className"
> & { heading: TypographyProps };

export default AccordionItemProps;
