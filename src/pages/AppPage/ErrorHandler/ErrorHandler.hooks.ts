import React, { useEffect } from "react";
import { toast, type ToastContentProps } from "react-toastify";

import { Typography } from "#src/components";
import { useError } from "#src/store";

import type ErrorHandlerProps from "./ErrorHandler.types";

export default function useErrorHandler(props: ErrorHandlerProps) {
  const { clearError, error } = useError();

  useEffect(() => {
    if (!error?.id) return;

    const toastId = toast.error(
      React.createElement(ToastComponent, undefined, error.message),
      { progress: undefined },
    );

    const unsubscribe = toast.onChange((t) => {
      if (t.status !== "removed") return;
      clearError(error.id);
    });

    return () => {
      unsubscribe();
      toast.dismiss(toastId);
    };
  }, [clearError, error?.id, error?.message]);

  return { ...props };
}

function ToastComponent(
  props: ToastContentProps & { children?: React.ReactNode },
) {
  return React.createElement(Typography, undefined, props.children);
}
