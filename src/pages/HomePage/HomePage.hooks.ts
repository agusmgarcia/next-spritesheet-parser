import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useState } from "react";

import { useSpriteSheet } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { indices, indicesOnSelect, indicesOnToggle, indicesOnUnselectAll } =
    useIndices();

  return {
    ...props,
    indices,
    indicesOnSelect,
    indicesOnToggle,
    indicesOnUnselectAll,
  };
}

const initialIndices: number[] = [];

function useIndices() {
  const { spriteSheet } = useSpriteSheet();

  const [indices, setIndices] = useState(initialIndices);

  const indicesOnToggle = useCallback<Func<void, [index: number]>>(
    (index) =>
      setIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      ),
    [],
  );

  const indicesOnSelect = useCallback<Func<void, [index: number]>>(
    (index) =>
      setIndices((prev) => (prev.includes(index) ? prev : [...prev, index])),
    [],
  );

  const indicesOnUnselectAll = useCallback<Func>(
    () => setIndices(initialIndices),
    [],
  );

  useEffect(() => {
    setIndices(initialIndices);
  }, [spriteSheet]);

  return { indices, indicesOnSelect, indicesOnToggle, indicesOnUnselectAll };
}
