import { Typography } from "#src/components";

import InstructionsButton from "./InstructionsButton";
import useLayout from "./Layout.hooks";
import type LayoutProps from "./Layout.types";
import NotificationHandler from "./NotificationHandler";

export default function Layout(props: LayoutProps) {
  const { children, instructions, sideBar, version, viewport, ...rest } =
    useLayout(props);

  return (
    <main
      {...rest}
      className="relative flex h-dvh w-screen border-[16px] border-dark"
    >
      {viewport === "Mobile" && (
        <div className="flex size-full flex-col justify-between bg-gray-800 p-2">
          {/* MESSAGE */}
          <Typography className="italic text-white">
            This app is not intended to be for Mobile.
          </Typography>

          {/* VERSION */}
          <Typography className="text-right text-white">{version}</Typography>
        </div>
      )}

      {viewport !== "Mobile" && (
        <>
          {/* CHILDREN */}
          <div className="h-full max-w-[calc(100%-360px)] flex-[1_0_67%] overflow-auto">
            {children}
          </div>

          {/* SIDEBAR */}
          <div className="flex h-full max-w-[360px] flex-[1_0_33%] flex-col bg-gray-800 p-4 pb-0">
            <div className="size-full overflow-y-auto overflow-x-hidden">
              {sideBar}
            </div>

            {/* VERSION */}
            <div className="py-2">
              <Typography className="text-right text-white">
                {version}
              </Typography>
            </div>
          </div>

          {/* NOTIFICATION HANDLER */}
          <NotificationHandler />

          {/* INSTRUCTIONS BUTTON */}
          <InstructionsButton
            className="absolute bottom-2 left-2"
            instructions={instructions}
          />
        </>
      )}
    </main>
  );
}
