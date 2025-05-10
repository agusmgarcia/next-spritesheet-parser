import { twMerge } from "tailwind-merge";

import { Button, Icon } from "#src/components";

import useModal from "./Modal.hooks";
import type ModalProps from "./Modal.types";

export default function Modal(props: ModalProps) {
  const { children, dialogProps, headerProps, state } = useModal(props);

  return (
    <dialog
      {...dialogProps}
      className={twMerge(
        "m-auto flex max-h-[90vh] w-[512px] translate-y-[calc(100vh+100%)] flex-col overflow-auto rounded-2xl",
        "transition-transform will-change-transform",

        state === "open" && "translate-y-0 scale-y-100",
        state === "hidden" && "hidden",

        "backdrop:transition-[background-color] backdrop:will-change-[background-color]",
        "backdrop:fixed backdrop:bottom-0 backdrop:left-0 backdrop:right-0 backdrop:top-0 backdrop:bg-black backdrop:bg-opacity-0",
        state === "open" && "backdrop:bg-opacity-40",
        state === "hidden" && "backdrop:hidden",
      )}
    >
      {/* HEADER */}
      {(!!headerProps.children || !!headerProps.onClose) && (
        <div
          className={twMerge(
            "sticky top-0 z-50 flex flex-initial items-center gap-4 bg-white p-4 md:px-6 md:pt-6",
            "transition-shadow will-change-[box-shadow]",

            !!headerProps.children &&
              !!headerProps.onClose &&
              "justify-between",
            !headerProps.children && !!headerProps.onClose && "justify-end",
            !!headerProps.children && !headerProps.onClose && "justify-start",

            !headerProps.atTop && "shadow-lg shadow-black/10",
          )}
        >
          {headerProps.children}

          {!!headerProps.onClose && (
            <Button
              className="size-6"
              onClick={headerProps.onClose}
              type="button"
              variant="raw"
            >
              <Icon variant="close" />
            </Button>
          )}
        </div>
      )}

      {/* CHILDREN */}
      <div className="flex-auto px-4 pb-6 md:px-6">{children}</div>
    </dialog>
  );
}
