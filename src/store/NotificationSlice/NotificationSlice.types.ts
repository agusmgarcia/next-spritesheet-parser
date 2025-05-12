import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type Notification = {
  id: string;
  message: string;
  type: "error" | "success" | "warning";
};

type NotificationSlice = CreateGlobalSliceTypes.SliceOf<
  "notification",
  {
    acceptNotification: Func<void, [id: string]>;
    clearNotification: Func<void, [id: string]>;
    notification: Notification | undefined;
    setNotification: AsyncFunc<
      boolean,
      [type: Notification["type"], message: string]
    >;
  }
>;

export default NotificationSlice;
