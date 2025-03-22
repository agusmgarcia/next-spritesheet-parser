import { Bounce, ToastContainer } from "react-toastify";

import useErrorHandler from "./ErrorHandler.hooks";
import type ErrorHandlerProps from "./ErrorHandler.types";

export default function ErrorHandler(props: ErrorHandlerProps) {
  const {} = useErrorHandler(props);

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
