import { type Func } from "@agusmgarcia/react-essentials-utils";

export type State = {
  accept: Func;
  close: Func;
  id: string;
  message: string;
} & (
  | {
      cancel: undefined;
      type: "error" | "success";
    }
  | {
      cancel: Func;
      type: "warning";
    }
);
