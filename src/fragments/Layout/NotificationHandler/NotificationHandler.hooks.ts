import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useMemo } from "react";

import { useNotification } from "#src/store";
import { useKeyDown } from "#src/utils";

import type NotificationHandlerProps from "./NotificationHandler.types";

export default function useNotificationHandler(
  props: NotificationHandlerProps,
) {
  const { acceptNotification, cancelNotification, notification } =
    useNotification();

  const open = useMemo<boolean>(() => !!notification?.id, [notification?.id]);

  const onAccept = useMemo<Func | undefined>(
    () =>
      !!notification ? () => acceptNotification(notification.id) : undefined,
    [acceptNotification, notification],
  );

  const onCancel = useMemo<Func | undefined>(
    () =>
      notification?.type === "warning"
        ? () => cancelNotification(notification.id)
        : undefined,
    [cancelNotification, notification],
  );

  return {
    ...props,
    [`${useKeyDown.dataIgnore}` as const]: open ? "" : undefined,
    notification,
    onAccept,
    onCancel,
    open,
  };
}
