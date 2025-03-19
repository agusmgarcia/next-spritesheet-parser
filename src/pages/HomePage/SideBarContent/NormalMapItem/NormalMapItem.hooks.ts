import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { type TypographyProps } from "#src/components";
import { useSpriteSheet } from "#src/store";

import type NormalMapItemProps from "./NormalMapItem.types";

export default function useNormalMapItem(props: NormalMapItemProps) {
  const heading = useMemo<TypographyProps>(
    () => ({ children: "Normal Map", variant: "h2" }),
    [],
  );

  const { createNormalMapDisabled, createNormalMapOnClick } =
    useCreateNormalMap();

  return { ...props, createNormalMapDisabled, createNormalMapOnClick, heading };
}

function useCreateNormalMap() {
  const { push } = useRouter();

  const { spriteSheet } = useSpriteSheet();

  const createNormalMapDisabled = useMemo<boolean>(
    () => !spriteSheet,
    [spriteSheet],
  );

  const createNormalMapOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => push("/normal-map"), [push]);

  return { createNormalMapDisabled, createNormalMapOnClick };
}
