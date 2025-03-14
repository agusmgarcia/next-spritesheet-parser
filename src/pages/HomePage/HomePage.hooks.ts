import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useState } from "react";

import { useSpriteSheet } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const {
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
  } = useSpriteIds();

  return {
    ...props,
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
  };
}

const initialSpriteIds: string[] = [];

function useSpriteIds() {
  const { spriteSheet } = useSpriteSheet();

  const [spriteIds, setSpriteIds] = useState(initialSpriteIds);

  const spriteIdsOnToggle = useCallback<Func<void, [spriteId: string]>>(
    (spriteId) =>
      setSpriteIds((prev) =>
        prev.includes(spriteId)
          ? prev.filter((sId) => sId !== spriteId)
          : [...prev, spriteId],
      ),
    [],
  );

  const spriteIdsOnSelect = useCallback<Func<void, [spriteId: string]>>(
    (spriteId) =>
      setSpriteIds((prev) =>
        prev.includes(spriteId) ? prev : [...prev, spriteId],
      ),
    [],
  );

  const spriteIdsOnUnselectAll = useCallback<Func>(
    () => setSpriteIds(initialSpriteIds),
    [],
  );

  useEffect(() => {
    setSpriteIds(initialSpriteIds);
  }, [spriteSheet]);

  return {
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
  };
}
