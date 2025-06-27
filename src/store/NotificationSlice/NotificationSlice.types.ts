import { type CreateGlobalSliceTypes } from "@agusmgarcia/react-essentials-store";
import { type AsyncFunc, type Func } from "@agusmgarcia/react-essentials-utils";

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
