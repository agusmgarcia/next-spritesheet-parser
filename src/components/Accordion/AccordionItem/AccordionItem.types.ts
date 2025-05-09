type AccordionItemProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className"
> & { defaultCollapsed?: boolean; heading?: React.ReactNode };

export default AccordionItemProps;
