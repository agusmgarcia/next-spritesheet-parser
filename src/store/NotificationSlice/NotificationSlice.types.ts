import {
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type Notification = {
  id: string;
  message: string;
  type: "error" | "info" | "success" | "warning";
};

type NotificationSlice = CreateGlobalSliceTypes.SliceOf<
  "notification",
  {
    clearNotification: Func<void, [id: string]>;
    notification: Notification | undefined;
    setNotification: Func<
      string,
      [type: Notification["type"], message: string]
    >;
  }
>;

export default NotificationSlice;
