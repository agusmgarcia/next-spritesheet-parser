import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type Notification = {
  accept: Func;
  close: Func;
  id: string;
  message: string;
} & ({ type: "error" | "success" } | { cancel: Func; type: "warning" });

type NotificationSlice = CreateGlobalSliceTypes.SliceOf<
  "notification",
  {
    notification: Notification | undefined;
    setNotification: AsyncFunc<
      boolean,
      [type: Notification["type"], message: string]
    >;
  }
>;

export default NotificationSlice;
