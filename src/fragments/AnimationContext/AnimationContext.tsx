import { createContext } from "react";

import { type Animation } from "#src/store";

import useAnimationContext from "./AnimationContext.hooks";
import type AnimationContextProps from "./AnimationContext.types";

const CONTEXT = createContext<Animation | undefined>(undefined);

export default function AnimationContext(props: AnimationContextProps) {
  const { children, ...rest } = useAnimationContext(props);

  return <CONTEXT.Provider {...rest}>{children}</CONTEXT.Provider>;
}

AnimationContext.Context = CONTEXT;
