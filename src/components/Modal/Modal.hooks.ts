import { useElementAtBottom, useElementAtTop } from "@agusmgarcia/react-core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import type ModalProps from "./Modal.types";
import { ModalsHandler } from "./Modal.utils";

const ModalsHandlerContext = createContext(new ModalsHandler());

export default function useModal({
  children: childrenFromProps,
  footer: footerFromProps,
  heading: headingFromProps,
  onClose: onCloseFromProps,
  open: openFromProps,
  ...rest
}: ModalProps) {
  const modalsHandler = useContext(ModalsHandlerContext);

  const id = useId();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const atTop = useElementAtTop(dialogRef);
  const atBottom = useElementAtBottom(dialogRef);

  const [state, setState] = useState<ModalState>("hidden");

  const dialogOnCancel: React.ReactEventHandler<HTMLDialogElement> =
    useCallback(
      (event) => {
        event.preventDefault();
        if (!modalsHandler.isLatest(id)) return;
        onCloseFromProps?.();
      },
      [onCloseFromProps, id, modalsHandler],
    );

  const dialogOnKeyDown: React.KeyboardEventHandler<HTMLDialogElement> =
    useCallback(
      (event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        if (!modalsHandler.isLatest(id)) return;
        onCloseFromProps?.();
      },
      [onCloseFromProps, id, modalsHandler],
    );

  useEffect(() => {
    setState((prevState) => {
      switch (prevState) {
        case "closing":
          return openFromProps ? "open" : "closing";

        case "hidden":
          return openFromProps ? "just-appeared" : "hidden";

        case "just-appeared":
          return openFromProps ? "just-appeared" : "hidden";

        case "open":
          return openFromProps ? "open" : "closing";
      }
    });
  }, [openFromProps]);

  useEffect(() => {
    switch (state) {
      case "just-appeared":
        modalsHandler.take(id);
        break;

      case "hidden":
        modalsHandler.release(id);
        break;
    }
  }, [id, modalsHandler, state]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (state !== "open") return;

    const handle = (event: MouseEvent) => {
      if (!modalsHandler.isLatest(id)) return;

      const dimensions = dialog.getBoundingClientRect();
      if (
        event.clientX >= dimensions.left &&
        event.clientX <= dimensions.right &&
        event.clientY >= dimensions.top &&
        event.clientY <= dimensions.bottom
      )
        return;

      onCloseFromProps?.();
    };

    window.addEventListener("click", handle);
    return () => window.removeEventListener("click", handle);
  }, [onCloseFromProps, id, modalsHandler, state]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (state === "just-appeared") {
      const handler = setTimeout(() => {
        setState((prev) => (prev === "just-appeared" ? "open" : prev));
      }, 10);

      return () => clearTimeout(handler);
    }

    if (state === "closing") {
      const handle = () =>
        setState((prev) => (prev === "closing" ? "hidden" : prev));

      dialog.addEventListener("transitionend", handle);
      return () => dialog.removeEventListener("transitionend", handle);
    }
  }, [state]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    switch (state) {
      case "hidden":
        dialog.close();
        break;

      case "just-appeared":
        dialog.showModal();
        break;
    }
  }, [state]);

  useEffect(() => {
    switch (state) {
      case "just-appeared": {
        const modalsCount = modalsHandler.count();
        if (modalsCount > 1) break;

        const body = document.body;

        body.dataset.overflow = body.style.overflow;
        body.style.overflow = "hidden";
        break;
      }

      case "hidden": {
        const modalsCount = modalsHandler.count();
        if (modalsCount > 0) break;

        const body = document.body;
        const overflow = body.dataset.overflow;

        if (body.style.overflow === "hidden" && !!overflow)
          body.style.overflow = overflow;

        delete body.dataset.overflow;
        break;
      }
    }
  }, [id, modalsHandler, state]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (state !== "just-appeared") return;

    dialog.scrollTo({ behavior: "instant", left: 0, top: 0 });
  }, [state]);

  return {
    children: state !== "hidden" ? childrenFromProps : undefined,
    dialogProps: {
      ...rest,
      onCancel: dialogOnCancel,
      onKeyDown: dialogOnKeyDown,
      ref: dialogRef,
    },
    footerProps: {
      atBottom,
      children: footerFromProps,
    },
    headerProps: {
      atTop,
      children: headingFromProps,
      onClose: onCloseFromProps,
    },
    state,
  };
}

type ModalState = "closing" | "hidden" | "just-appeared" | "open";
