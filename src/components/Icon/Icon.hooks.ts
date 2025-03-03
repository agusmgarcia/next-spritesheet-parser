import type IconProps from "./Icon.types";

export default function useIcon(props: IconProps) {
  return {
    ...props,
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
  };
}
