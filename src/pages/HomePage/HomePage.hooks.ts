import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useState } from "react";

import type HomePageProps from "./HomePage.types";

const emptyArray: number[] = [];

export default function useHomePage(props: HomePageProps) {
  const [indices, setIndices] = useState(emptyArray);

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

  const unselectAll = useCallback<Func>(() => setIndices(emptyArray), []);

  return { ...props, indices, select, toggleSelection, unselectAll };
}
