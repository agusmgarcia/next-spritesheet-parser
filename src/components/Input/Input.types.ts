type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "aria-label" | "className" | "disabled" | "onChange" | "value"
> & { label: string; type?: "text" };

export default InputProps;
