import { twMerge } from "tailwind-merge";

import { Button, Icon, Modal, Typography } from "#src/components";

import useNotificationHandler from "./NotificationHandler.hooks";
import type NotificationHandlerProps from "./NotificationHandler.types";

export default function NotificationHandler(props: NotificationHandlerProps) {
  const { notification, onAccept, onCancel, ...rest } =
    useNotificationHandler(props);

  return (
    <Modal
      {...rest}
      footer={
        <div className="flex items-center justify-between gap-2">
          {!!onAccept && (
            <Button onClick={onAccept} variant="primary">
              Accept
            </Button>
          )}
          {!!onCancel && (
            <Button onClick={onCancel} variant="secondary">
              Cancel
            </Button>
          )}
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Icon
          className={twMerge(
            "size-10",
            notification?.type === "success" && "text-green-500",
            notification?.type === "warning" && "text-amber-500",
            notification?.type === "error" && "text-red-600",
          )}
          variant={notification?.type || "error"}
        />
        <Typography className="text-center">{notification?.message}</Typography>
      </div>
    </Modal>
  );
}
