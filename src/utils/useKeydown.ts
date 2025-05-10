import { type Func } from "@agusmgarcia/react-core";
import { useEffect } from "react";

export default function useKeyDown(
  key: string,
  callback: Func,
  options?: Partial<{ altKey: boolean }>,
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key !== key) return;
      if (!!options?.altKey !== event.altKey) return;
      if (event.ctrlKey) return;
      if (event.metaKey) return;
      if (event.shiftKey) return;
      callback();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback, key, options?.altKey]);
}
