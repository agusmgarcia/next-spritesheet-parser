import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-core";
import { v4 as createUUID } from "uuid";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type NotificationSlice from "./NotificationSlice.types";

export default createGlobalSlice<
  NotificationSlice,
  SpriteSheetSliceTypes.default
>("notification", () => ({
  clearNotification,
  notification: undefined,
  setNotification,
}));

function clearNotification(
  id: Parameters<NotificationSlice["notification"]["clearNotification"]>[0],
  context: CreateGlobalSliceTypes.Context<NotificationSlice>,
): void {
  context.set((prev) =>
    prev.notification?.id === id ? { notification: undefined } : prev,
  );
}

function setNotification(
  type: Parameters<NotificationSlice["notification"]["setNotification"]>[0],
  message: Parameters<NotificationSlice["notification"]["setNotification"]>[1],
  context: CreateGlobalSliceTypes.Context<NotificationSlice>,
): string {
  const id = createUUID();
  context.set({ notification: { id, message, type } });
  return id;
}
