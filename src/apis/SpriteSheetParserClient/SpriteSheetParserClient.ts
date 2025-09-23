import { type AsyncFunc, type Func } from "@agusmgarcia/react-essentials-utils";
import { Mutex as AsyncMutex } from "async-mutex";

import {
  type DeleteStateRequest,
  type DeleteStateResponse,
  type GetStateRequest,
  type GetStateResponse,
  type GetStateResponseV1,
  type PatchStateRequest,
  type PatchStateResponse,
} from "./SpriteSheetParserClient.types";

export default class SpriteSheetParserClient {
  static readonly INSTANCE = new SpriteSheetParserClient();

  private readonly mutex: AsyncMutex;

  private constructor() {
    this.mutex = new AsyncMutex();
  }

  async getState(
    { id }: GetStateRequest,
    signal: AbortSignal,
  ): Promise<GetStateResponse | undefined> {
    return await this.runExclusive(
      () => SpriteSheetParserClient.getStateRaw(id),
      signal,
    );
  }

  async patchState(
    { id, ...stateFromRequest }: PatchStateRequest,
    signal: AbortSignal,
  ): Promise<PatchStateResponse> {
    await this.runExclusive(async () => {
      const now = Date.now();
      const stateFromStorage = SpriteSheetParserClient.getStateRaw(id);

      const state: GetStateResponse = {
        createdAt: now,
        version: "v1",
        ...stateFromStorage,
        ...stateFromRequest,
        updatedAt: now,
      };

      while (true) {
        try {
          window.localStorage.setItem(id, JSON.stringify(state));
          break;
        } catch (error) {
          if (!(error instanceof DOMException)) throw error;

          const deleted = SpriteSheetParserClient.deleteOldestState();
          if (!deleted) throw error;
        }
      }
    }, signal);
  }

  async deleteState(
    { id }: DeleteStateRequest,
    signal: AbortSignal,
  ): Promise<DeleteStateResponse> {
    await this.runExclusive(() => window.localStorage.removeItem(id), signal);
  }

  private async runExclusive<TResult>(
    callback:
      | Func<TResult, [signal: AbortSignal]>
      | AsyncFunc<TResult, [signal: AbortSignal]>,
    signal: AbortSignal,
  ): Promise<TResult | undefined> {
    return await this.mutex.runExclusive(async () => {
      try {
        signal.throwIfAborted();
        return await callback(signal);
      } catch (error) {
        if (signal.aborted) return undefined;
        throw error;
      }
    });
  }

  private static getStateRaw(id: string) {
    const item = window.localStorage.getItem(id);
    if (!item) return undefined;

    const state = SpriteSheetParserClient.parseState(item);
    if (!state) return undefined;

    return SpriteSheetParserClient.migrateState(state);
  }

  private static parseState(item: string): GetStateResponseV1 | undefined {
    try {
      const maybeState = JSON.parse(item);

      if (typeof maybeState !== "object") return undefined;
      if (!maybeState) return undefined;
      if (
        !("createdAt" in maybeState) ||
        typeof maybeState.createdAt !== "number"
      )
        return undefined;
      if (
        !("updatedAt" in maybeState) ||
        typeof maybeState.updatedAt !== "number"
      )
        return undefined;
      if (!("version" in maybeState) || maybeState.version !== "v1")
        return undefined;

      return maybeState;
    } catch {
      return undefined;
    }
  }

  private static migrateState(
    state: GetStateResponseV1,
  ): GetStateResponse | undefined {
    if (state.version === "v1") return state;
    return undefined;
  }

  private static deleteOldestState(): boolean {
    let oldestKey = "";
    let oldestUpdatedAt = Number.MAX_SAFE_INTEGER;

    for (let index = 0; index < window.localStorage.length; index++) {
      const key = window.localStorage.key(index);
      if (!key) continue;

      const item = window.localStorage.getItem(key);
      if (!item) continue;

      const state = SpriteSheetParserClient.parseState(item);
      if (!state || state.updatedAt >= oldestUpdatedAt) continue;

      oldestUpdatedAt = state.updatedAt;
      oldestKey = key;
    }

    window.localStorage.removeItem(oldestKey);
    return !!oldestKey;
  }
}
