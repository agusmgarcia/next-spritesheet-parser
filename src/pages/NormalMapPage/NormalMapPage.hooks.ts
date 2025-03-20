import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSpriteSheet } from "#src/store";

import type NormalMapPageProps from "./NormalMapPage.types";

export default function useNormalMapPage(props: NormalMapPageProps) {
  const { replace } = useRouter();

  const { spriteSheet } = useSpriteSheet();

  useEffect(() => {
    if (!!spriteSheet) return;
    replace("/");
  }, [replace, spriteSheet]);

  return { ...props };
}
