import React from "react";
import { twMerge } from "tailwind-merge";

import { Divisor, Modal, Typography } from "#src/components";

import useInstructionsModal from "./InstructionsModal.hooks";
import type InstructionsModalProps from "./InstructionsModal.types";

export default function InstructionsModal(props: InstructionsModalProps) {
  const { instructions, ...rest } = useInstructionsModal(props);

  return (
    <Modal
      {...rest}
      heading={<Typography variant="h1">Instructions</Typography>}
    >
      <div className="flex flex-col gap-4">
        {instructions.map((i) => (
          <div key={i.title} className="flex flex-col gap-2">
            {/* TITLE */}
            <Typography variant="h2">{i.title}</Typography>

            {/* DIVISOR */}
            <Divisor />

            {/* KEYS */}
            <div className="flex flex-col gap-1">
              {i.keys.map((k) => (
                <div key={k.id} className="flex items-center gap-2">
                  {k.extraKeys.map((e) => (
                    <React.Fragment key={e}>
                      <Key className="text-sm">{e}</Key>
                      <Typography>{"\\+"}</Typography>
                    </React.Fragment>
                  ))}

                  {/* KEY */}
                  <Key className="text-lg">{k.key}</Key>

                  {/* DESCRIPTION */}
                  <Typography>{k.description}</Typography>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

function Key({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex size-8 items-center justify-center rounded-lg border border-black bg-gray-500 text-white shadow-md shadow-gray-500">
      {typeof children === "string" ? (
        <Typography
          className={twMerge("cursor-default select-none", className)}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </div>
  );
}
