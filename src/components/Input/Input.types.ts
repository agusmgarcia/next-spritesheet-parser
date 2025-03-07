type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "aria-label" | "className" | "disabled" | "max" | "min" | "onChange" | "value"
> & { type?: "number" | "text" };

export default InputProps;
