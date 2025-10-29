import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { v4 as createUUID } from "uuid";

import { type Notification } from "./NotificationSlice.types";

export default class NotificationSlice extends GlobalSlice<
  Notification | undefined
> {
  constructor() {
    super(undefined);
  }

  set(
    type: Notification["type"],
    message: Notification["message"],
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
      } as Notification;
    });
  }
}
