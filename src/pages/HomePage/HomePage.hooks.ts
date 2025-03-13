import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useState } from "react";

import { useSpriteSheet } from "#src/store";

import type HomePageProps from "./HomePage.types";

const initialValue: number[] = [];

export default function useHomePage(props: HomePageProps) {
  const { spriteSheet } = useSpriteSheet();

  const [indices, setIndices] = useState(initialValue);

  const toggleSelection = useCallback<Func<void, [index: number]>>(
    (index) =>
      setIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      ),
    [],
  );

  const select = useCallback<Func<void, [index: number]>>(
    (index) =>
      setIndices((prev) => (prev.includes(index) ? prev : [...prev, index])),
    [],
  );

  const unselectAll = useCallback<Func>(() => setIndices(initialValue), []);

  useEffect(() => {
    setIndices(initialValue);
  }, [spriteSheet]);

  return { ...props, indices, select, toggleSelection, unselectAll };
}
