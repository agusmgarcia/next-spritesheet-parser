import { Divisor, Modal, Typography } from "#src/components";

import useInstructionsModal from "./InstructionsModal.hooks";
import type InstructionsModalProps from "./InstructionsModal.types";

export default function InstructionsModal(props: InstructionsModalProps) {
  const { instructions, onClose, open } = useInstructionsModal(props);

  return (
    <Modal
      heading={<Typography variant="h1">Instructions</Typography>}
      onClose={onClose}
      open={open}
    >
      <div className="flex flex-col gap-4">
        {instructions?.map((i) => (
          <div key={i.title} className="flex flex-col gap-2">
            {/* TITLE */}
            <Typography variant="h2">{i.title}</Typography>

            {/* DIVISOR */}
            <Divisor />

            {/* KEYS */}
            <div className="flex flex-col gap-1">
              {i.keys.map((k) => (
                <div key={k.key} className="flex items-baseline gap-2">
                  {/* KEY */}
                  <div className="size-8 rounded-lg border border-black bg-gray-500 shadow-md shadow-gray-500">
                    <Typography
                      className="cursor-default text-center text-white"
                      variant="h3"
                    >
                      {k.key}
                    </Typography>
                  </div>

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
