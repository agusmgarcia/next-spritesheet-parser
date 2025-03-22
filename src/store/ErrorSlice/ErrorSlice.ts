import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";
import { v4 as createUUID } from "uuid";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type ErrorSlice from "./ErrorSlice.types";

export default createGlobalSlice<ErrorSlice, SpriteSheetSliceTypes.default>(
  "error",
  () => ({
    clearError,
    error: undefined,
    setError,
  }),
);

function clearError(
  id: Parameters<ErrorSlice["error"]["clearError"]>[0],
  context: CreateGlobalSliceTypes.Context<ErrorSlice>,
): void {
  context.set((prev) => (prev.error?.id === id ? { error: undefined } : prev));
}

function setError(
  message: Parameters<ErrorSlice["error"]["setError"]>[0],
  context: CreateGlobalSliceTypes.Context<ErrorSlice>,
): string {
  const id = createUUID();
  context.set({ error: { id, message } });
  return id;
}
