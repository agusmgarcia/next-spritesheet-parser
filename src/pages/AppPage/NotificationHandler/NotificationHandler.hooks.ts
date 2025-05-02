import React, { useEffect } from "react";
import { type IconProps, toast, type ToastContentProps } from "react-toastify";

import { Icon, Typography } from "#src/components";
import { type Notification, useNotification } from "#src/store";

import type NotificationHandlerProps from "./NotificationHandler.types";

export default function useNotificationHandler(
  props: NotificationHandlerProps,
) {
  const { clearNotification, notification } = useNotification();

  useEffect(() => {
    if (!notification?.id) return;

    const toastId = toast[notification.type](
      React.createElement(ToastComponent, undefined, notification.message),
      {
        className:
          notification.type === "error"
            ? "!bg-red-600"
            : notification.type === "info"
              ? "!bg-blue-400"
              : notification.type === "success"
                ? "!bg-green-500"
                : "!bg-amber-500",
        icon: React.createElement(IconComponent, undefined, notification.type),
        progress: undefined,
      },
    );

    const unsubscribe = toast.onChange((t) => {
      if (t.status !== "removed") return;
      clearNotification(notification.id);
    });

    return () => {
      unsubscribe();
      toast.dismiss(toastId);
    };
  }, [
    clearNotification,
    notification?.id,
    notification?.message,
    notification?.type,
  ]);

  return { ...props };
}

function ToastComponent(props: ToastContentProps & { children: string }) {
  return React.createElement(Typography, undefined, props.children);
}

function IconComponent(props: IconProps & { children: Notification["type"] }) {
  return React.createElement(Icon, { variant: props.children });
}
