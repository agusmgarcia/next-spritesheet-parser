import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import {
  useNormalMapImage,
  useSpriteSheet,
  useSpriteSheetImage,
} from "#src/store";

import type NormalMapItemProps from "./NormalMapItem.types";

export default function useNormalMapItem(props: NormalMapItemProps) {
  const { defaultCollapsed, disabled } = useSideBarItem();

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
    defaultCollapsed,
    disabled,
  };
}

function useSideBarItem() {
  const { spriteSheetImage } = useSpriteSheetImage();

  const disabled = useMemo<boolean>(
    () => !spriteSheetImage?.url,
    [spriteSheetImage?.url],
  );

  const defaultCollapsed = useMemo<boolean>(() => true, []);

  return { defaultCollapsed, disabled };
}

function useCreateNormalMap() {
  const { push } = useRouter();

  const { spriteSheetLoading } = useSpriteSheet();
  const { spriteSheetImage, spriteSheetImageLoading } = useSpriteSheetImage();
  const { normalMapImage, normalMapImageLoading } = useNormalMapImage();

  const createNormalMapDisabled = useMemo<boolean>(
    () =>
      !spriteSheetImage?.url ||
      spriteSheetImageLoading ||
      spriteSheetLoading ||
      !normalMapImage?.url ||
      normalMapImageLoading,
    [
      normalMapImage?.url,
      normalMapImageLoading,
      spriteSheetImage?.url,
      spriteSheetImageLoading,
      spriteSheetLoading,
    ],
  );

  const createNormalMapLoading = useMemo<boolean>(
    () => normalMapImageLoading,
    [normalMapImageLoading],
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
