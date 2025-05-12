import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";
import { v4 as createUUID } from "uuid";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type NotificationSlice from "./NotificationSlice.types";

export default createGlobalSlice<
  NotificationSlice,
  SpriteSheetSliceTypes.default
>("notification", () => ({
  acceptNotification,
  clearNotification,
  notification: undefined,
  setNotification,
}));

function acceptNotification(
  id: Parameters<NotificationSlice["notification"]["acceptNotification"]>[0],
  context: CreateGlobalSliceTypes.Context<NotificationSlice>,
): void {
  const notification = context.get().notification.notification;
  if (!notification || notification.id !== id) return;

  (notification as InternalNotification).resolve(true);
  context.set({ notification: undefined });
}

function clearNotification(
  id: Parameters<NotificationSlice["notification"]["clearNotification"]>[0],
  context: CreateGlobalSliceTypes.Context<NotificationSlice>,
): void {
  const notification = context.get().notification.notification;
  if (!notification || notification.id !== id) return;

  (notification as InternalNotification).resolve(false);
  context.set({ notification: undefined });
}

function setNotification(
  type: Parameters<NotificationSlice["notification"]["setNotification"]>[0],
  message: Parameters<NotificationSlice["notification"]["setNotification"]>[1],
  context: CreateGlobalSliceTypes.Context<NotificationSlice>,
): Promise<boolean> {
  const notification = context.get().notification.notification;
  if (notification) (notification as InternalNotification).resolve(false);

  const id = createUUID();
  return new Promise<boolean>((resolve) => {
    context.set({
      notification: { id, message, resolve, type } as InternalNotification,
    });
  });
}

type InternalNotification = NonNullable<
  NotificationSlice["notification"]["notification"]
> & { resolve: Func<void, [value: boolean]> };
