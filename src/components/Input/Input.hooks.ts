import { useDimensions } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useRef } from "react";

import type InputProps from "./Input.types";

export default function useInput(props: InputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const dimensions = useDimensions(ref);

  const progress = useMemo<number | undefined>(() => {
    if (props.type !== "range") return undefined;

    const min = +(props.min || "");
    if (isNaN(min)) return undefined;

    const max = +(props.max || "");
    if (isNaN(max)) return undefined;

    const value = +(props.value || "");
    if (isNaN(value)) return undefined;

    if (min >= max) return 100;

    return Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  }, [props.max, props.min, props.type, props.value]);

  useEffect(() => {
    const input = ref.current;
    if (!input) return;

    if (typeof progress === "undefined") return;

    input.style.setProperty("--tw-gradient-from-position", `${progress}%`);
    input.style.setProperty("--tw-gradient-to-position", `${progress}%`);

    if (progress > 66) input.style.setProperty("--translate-x", "0px");
    else
      input.style.setProperty(
        "--translate-x",
        `calc(${dimensions.width}px - 100%)`,
      );

    return () => {
      input.style.removeProperty("--translate-x");
      input.style.removeProperty("--tw-gradient-to-position");
      input.style.removeProperty("--tw-gradient-from-position");
    };
  }, [dimensions.width, progress]);

  return { ...props, ref };
}
