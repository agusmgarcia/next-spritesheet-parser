import { type Func } from "@agusmgarcia/react-core";
import { useEffect } from "react";

export default function useKeyDown(
  key: string,
  callback: Func,
  options?: Partial<{
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
  }>,
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key !== key) return;
      if (!!options?.altKey !== event.altKey) return;
      if (!!options?.ctrlKey !== event.ctrlKey) return;
      if (!!options?.metaKey !== event.metaKey) return;
      if (!!options?.shiftKey !== event.shiftKey) return;
      callback();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    callback,
    key,
    options?.altKey,
    options?.ctrlKey,
    options?.metaKey,
    options?.shiftKey,
  ]);
}
