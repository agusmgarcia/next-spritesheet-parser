import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useEffect } from "react";

export default function useKeyDown(
  key: string,
  callback: Func,
  options?: Partial<{ altKey: true }>,
): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key !== key) return;
      if (!!options?.altKey !== event.altKey) return;
      if (event.ctrlKey) return;
      if (event.metaKey) return;
      if (event.shiftKey) return;
      if (!!document.querySelector(`[${useKeyDown.dataIgnore}]`)) return;
      callback();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback, key, options?.altKey]);
}

useKeyDown.dataIgnore = "data-use-key-down-ignore" as const;
