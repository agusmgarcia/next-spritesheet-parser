import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-essentials-store";
import { v4 as createUUID } from "uuid";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type NotificationSlice from "./NotificationSlice.types";

export default createGlobalSlice<
  NotificationSlice,
  SpriteSheetSliceTypes.default
>("notification", () => ({
  notification: undefined,
  setNotification,
}));

function setNotification(
  type: Parameters<NotificationSlice["notification"]["setNotification"]>[0],
  message: Parameters<NotificationSlice["notification"]["setNotification"]>[1],
  context: CreateGlobalSliceTypes.Context<NotificationSlice>,
): Promise<boolean> {
  const notification = context.get().notification.notification;
  if (!!notification) notification.close();

  const id = createUUID();

  return new Promise<boolean>((resolve) => {
    context.set({
      notification: {
        accept: () => {
          if (!context.signal.aborted)
            context.set((prev) =>
              prev.notification?.id === id ? { notification: undefined } : prev,
            );

          resolve(true);
        },
        close: () => {
          if (!context.signal.aborted)
            context.set((prev) =>
              prev.notification?.id === id ? { notification: undefined } : prev,
            );

          resolve(false);
        },
        id,
        message,
        type,
        ...(type === "warning"
          ? {
              cancel: () => {
                if (!context.signal.aborted)
                  context.set((prev) =>
                    prev.notification?.id === id
                      ? { notification: undefined }
                      : prev,
                  );

                resolve(false);
              },
            }
          : {}),
      } as NotificationSlice["notification"]["notification"],
    });
  });
}
