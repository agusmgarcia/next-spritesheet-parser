type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "disabled" | "onChange" | "value"
> & { label: string; type?: "text" };

export default InputProps;
