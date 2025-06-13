type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  | "aria-label"
  | "autoComplete"
  | "checked"
  | "className"
  | "disabled"
  | "id"
  | "max"
  | "min"
  | "name"
  | "onChange"
  | "placeholder"
  | "step"
  | "value"
> & { type?: "checkbox" | "color" | "number" | "range" | "text" };

export default InputProps;
