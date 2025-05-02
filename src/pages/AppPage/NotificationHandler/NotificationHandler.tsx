import { Bounce, ToastContainer } from "react-toastify";

import useNotificationHandler from "./NotificationHandler.hooks";
import type NotificationHandlerProps from "./NotificationHandler.types";

export default function NotificationHandler(props: NotificationHandlerProps) {
  const {} = useNotificationHandler(props);

  return (
    <ToastContainer
      autoClose={2000}
      className="left-8"
      limit={1}
      position="bottom-left"
      theme="colored"
      transition={Bounce}
    />
  );
}
