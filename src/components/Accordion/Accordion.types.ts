import { type TypographyProps } from "#src/components";

type AccordionProps = Pick<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  heading: TypographyProps;
};

export default AccordionProps;
