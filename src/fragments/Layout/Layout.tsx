import { Typography } from "#src/components";

import InstructionsButton from "./InstructionsButton";
import useLayout from "./Layout.hooks";
import type LayoutProps from "./Layout.types";
import NotificationHandler from "./NotificationHandler";
import SideBar from "./SideBar";

export default function Layout(props: LayoutProps) {
  const {
    children,
    instructions,
    sideBar,
    sideBarCollapse,
    version,
    viewport,
    ...rest
  } = useLayout(props);

  return (
    <main
      {...rest}
      className="relative flex h-dvh w-screen overflow-hidden border-[16px] border-dark"
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
          <div className="size-full overflow-auto">{children}</div>

          {/* SIDEBAR */}
          <SideBar
            className="absolute right-0 h-full w-[360px]"
            collapseHidden={!sideBarCollapse}
            version={version}
          >
            {sideBar}
          </SideBar>

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
