type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  | "aria-label"
  | "autoComplete"
  | "className"
  | "disabled"
  | "max"
  | "min"
  | "name"
  | "onChange"
  | "placeholder"
  | "step"
  | "value"
> & { type?: "color" | "number" | "text" };

export default InputProps;
