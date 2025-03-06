type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "disabled" | "onClick" | "type"
> & {
  variant?: "primary" | "raw" | "secondary";
};

export default ButtonProps;
