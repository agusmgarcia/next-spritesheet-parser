type TypographyProps = Pick<
  | React.HTMLAttributes<HTMLHeadingElement>
  | React.HTMLAttributes<HTMLParagraphElement>,
  "children" | "className"
> & {
  variant?: "h1" | "h2" | "h3" | "p";
};

export default TypographyProps;
