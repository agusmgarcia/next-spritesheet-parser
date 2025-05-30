import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useNormalMap, useSpriteSheet } from "#src/store";

import type NormalMapItemProps from "./NormalMapItem.types";

export default function useNormalMapItem(props: NormalMapItemProps) {
  const {
    createNormalMapDisabled,
    createNormalMapLoading,
    createNormalMapOnClick,
  } = useCreateNormalMap();

  return {
    ...props,
    createNormalMapDisabled,
    createNormalMapLoading,
    createNormalMapOnClick,
  };
}

function useCreateNormalMap() {
  const { push } = useRouter();

  const { spriteSheet, spriteSheetLoading } = useSpriteSheet();
  const { normalMap, normalMapLoading } = useNormalMap();

  const createNormalMapDisabled = useMemo<boolean>(
    () =>
      !spriteSheet?.image.url ||
      spriteSheetLoading ||
      !normalMap?.image.url ||
      normalMapLoading,
    [
      normalMap?.image.url,
      normalMapLoading,
      spriteSheet?.image.url,
      spriteSheetLoading,
    ],
  );

  const createNormalMapLoading = useMemo<boolean>(
    () => normalMapLoading,
    [normalMapLoading],
  );

  const createNormalMapOnClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => push("/normal-map"), [push]);

  return {
    createNormalMapDisabled,
    createNormalMapLoading,
    createNormalMapOnClick,
  };
}
