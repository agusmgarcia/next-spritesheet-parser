type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "disabled" | "onClick" | "type"
> & {
  variant: "primary";
};

export default ButtonProps;
