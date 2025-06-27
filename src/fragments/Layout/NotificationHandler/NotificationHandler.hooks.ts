import { type Func } from "@agusmgarcia/react-essentials-utils";
import { useMemo } from "react";

import { useNotification } from "#src/store";
import { useKeyDown } from "#src/utils";

import type NotificationHandlerProps from "./NotificationHandler.types";

export default function useNotificationHandler(
  props: NotificationHandlerProps,
) {
  const { notification } = useNotification();

  const open = useMemo<boolean>(() => !!notification?.id, [notification?.id]);

  const onAccept = useMemo<Func | undefined>(
    () => (!!notification ? () => notification.accept() : undefined),
    [notification],
  );

  const onCancel = useMemo<Func | undefined>(
    () =>
      notification?.type === "warning"
        ? () => notification.cancel()
        : undefined,
    [notification],
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
