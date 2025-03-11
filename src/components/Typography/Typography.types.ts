type TypographyProps = Pick<
  | React.HTMLAttributes<HTMLHeadingElement>
  | React.HTMLAttributes<HTMLParagraphElement>,
  "children" | "className"
> & {
  variant?: "h1" | "h2" | "p";
};

export default TypographyProps;
