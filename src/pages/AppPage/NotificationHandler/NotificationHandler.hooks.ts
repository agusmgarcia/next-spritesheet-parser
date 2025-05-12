import { type Func } from "@agusmgarcia/react-core";
import { useMemo } from "react";

import { useNotification } from "#src/store";

import type NotificationHandlerProps from "./NotificationHandler.types";

export default function useNotificationHandler(_: NotificationHandlerProps) {
  const { acceptNotification, clearNotification, notification } =
    useNotification();

  const open = useMemo<boolean>(() => !!notification?.id, [notification?.id]);

  const onAccept = useMemo<Func | undefined>(
    () =>
      !!notification?.id
        ? () => acceptNotification(notification.id)
        : undefined,
    [acceptNotification, notification?.id],
  );

  const onCancel = useMemo<Func | undefined>(
    () =>
      notification?.type === "warning"
        ? () => clearNotification(notification.id)
        : undefined,
    [clearNotification, notification?.id, notification?.type],
  );

  return { notification, onAccept, onCancel, open };
}
