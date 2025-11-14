import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { v4 as createUUID } from "uuid";

import { type State } from "./NotificationSlice.types";

export default class NotificationSlice extends GlobalSlice<State | undefined> {
  constructor() {
    super(undefined);
  }

  set(
    type: State["type"],
    message: State["message"],
    signal: AbortSignal,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const id = createUUID();

      const handleResolve = (value: boolean): void => {
        signal.removeEventListener("abort", handleAbort);

        if (this.state?.id === id) {
          this.state = undefined;
          resolve(value);
          return;
        }

        resolve(false);
      };

      const handleAbort = () => handleResolve(false);
      signal.addEventListener("abort", handleAbort);

      this.state = {
        accept: () => handleResolve(true),
        cancel: () => handleResolve(false),
        close: () => handleResolve(false),
        id,
        message,
        type,
      } as State;
    });
  }
}
