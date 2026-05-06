import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { type LayoutProps, ZoomItem } from "#src/fragments";
import { useSpriteSheetImage } from "#src/store";

import type NormalMapPageProps from "./NormalMapPage.types";

export default function useNormalMapPage(props: NormalMapPageProps) {
  const { replace } = useRouter();

  const { spriteSheetImage } = useSpriteSheetImage();

  const { instructions } = useInstructions();

  useEffect(() => {
    if (!!spriteSheetImage) return;
    replace("/");
  }, [replace, spriteSheetImage]);

  return { ...props, instructions };
}

function useInstructions() {
  const instructions = useMemo<LayoutProps["instructions"]>(
    () => [ZoomItem.INSTRUCTIONS],
    [],
  );

  return { instructions };
}
