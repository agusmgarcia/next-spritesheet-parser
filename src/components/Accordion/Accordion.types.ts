import { type TypographyProps } from "../Typography";

type AccordionProps = Pick<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  heading: TypographyProps;
};

export default AccordionProps;
