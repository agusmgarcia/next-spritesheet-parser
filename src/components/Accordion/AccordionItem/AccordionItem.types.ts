type AccordionItemProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className"
> & {
  defaultCollapsed?: boolean;
  disabled?: boolean;
  heading?: React.ReactNode;
};

export default AccordionItemProps;
