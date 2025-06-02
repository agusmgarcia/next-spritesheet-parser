import { useMemo } from "react";
import tailwindConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

import type InputProps from "./Input.types";

const config = resolveConfig(tailwindConfig);

export default function useInput(props: InputProps) {
  const style = useMemo<React.CSSProperties | undefined>(() => {
    if (props.type !== "range") return undefined;

    const min = +(props.min || "");
    if (isNaN(min)) return undefined;

    const max = +(props.max || "");
    if (isNaN(max)) return undefined;

    const value = +(props.value || "");
    if (isNaN(value)) return;

    const progress = (value / max) * 100;
    const cranberry500 = (config.theme.colors as any).cranberry[500];
    const white = config.theme.colors.white;
    const gray100 = config.theme.colors.gray[100];
    const gray400 = config.theme.colors.gray[400];

    return {
      background: `linear-gradient(to right, ${!props.disabled ? cranberry500 : gray400} ${progress}%, ${!props.disabled ? white : gray100} ${progress}%)`,
    };
  }, [props.disabled, props.max, props.min, props.type, props.value]);

  return { ...props, style };
}
