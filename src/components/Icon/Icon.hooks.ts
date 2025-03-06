import type IconProps from "./Icon.types";

export default function useIcon(props: IconProps) {
  return {
    ...props,
    fill: "currentColor",
    height: 24,
    viewBox: "0 0 24 24",
    width: 24,
    xmlns: "http://www.w3.org/2000/svg",
  };
}
