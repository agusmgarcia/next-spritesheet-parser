import { GlobalSlice } from "@agusmgarcia/react-essentials-store";
import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";

import { type Index } from "./IndexSlice.types";

export default class IndexSlice extends GlobalSlice<Index> {
  private _cancelInterval: Func;

  constructor() {
    super(0);
    this._cancelInterval = emptyFunction;
  }

  play(length: number, fps: number): void {
    this._cancelInterval();
    this.state = Math.min(Math.max(this.state, 0), length - 1);
    this._cancelInterval = this.setInterval(
      () => (this.state = this.state < length - 1 ? this.state + 1 : 0),
      1000 / fps,
    );
  }

  stop(): void {
    this._cancelInterval();
    this._cancelInterval = emptyFunction;
  }

  set(index: React.SetStateAction<number>): void {
    this._cancelInterval();
    this._cancelInterval = emptyFunction;
    this.state = index instanceof Function ? index(this.state) : index;
  }
}
