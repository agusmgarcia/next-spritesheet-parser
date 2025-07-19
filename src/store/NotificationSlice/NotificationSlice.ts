import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { type Func } from "@agusmgarcia/react-essentials-utils";
import { v4 as createUUID } from "uuid";

import { type Notification } from "./NotificationSlice.types";

export default class NotificationSlice extends GlobalSlice<
  Notification | undefined
> {
  private readonly resolves: Record<string, Func<void, [value: boolean]>>;

  constructor() {
    super(undefined);
    this.resolves = {};
  }

  get dirty(): boolean {
    return !!this.state;
  }

  set(
    type: Notification["type"],
    message: Notification["message"],
  ): Promise<boolean> {
    if (!!this.state?.id) this.close(this.state.id);

    return new Promise<boolean>((resolve) => {
      const id = createUUID();
      this.resolves[id] = resolve;
      this.state = { id, message, type };
    });
  }

  accept(id: string): void {
    this.resolve(id, true);
  }

  cancel(id: string): void {
    this.resolve(id, false);
  }

  close(id: string): void {
    this.resolve(id, false);
  }

  private resolve(id: string, value: boolean): void {
    if (this.state?.id !== id) return;
    this.state = undefined;
    this.resolves[id](value);
    delete this.resolves[id];
  }
}
