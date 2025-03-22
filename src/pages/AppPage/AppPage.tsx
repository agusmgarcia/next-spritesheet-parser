import { Typography } from "#src/components";
import { SideBar } from "#src/fragments";

import useAppPage from "./AppPage.hooks";
import type AppPageProps from "./AppPage.types";
import ErrorHandler from "./ErrorHandler";

export default function AppPage(props: AppPageProps) {
  const { children, version, viewport } = useAppPage(props);

  return (
    <main className="relative flex h-dvh w-screen border-[16px] border-dark">
      {viewport === "Mobile" && (
        <div className="size-full bg-gray-800">
          <Typography className="p-2 italic text-white">
            This app is not intended to be for Mobile.
          </Typography>
        </div>
      )}

      {viewport !== "Mobile" && (
        <>
          {/* CHILDREN */}
          <div className="h-full max-w-[calc(100%-360px)] flex-[1_0_67%] overflow-auto">
            {children}
          </div>

          {/* SIDEBAR */}
          <SideBar.Container className="h-full max-w-[360px] flex-[1_0_33%] overflow-y-auto overflow-x-hidden bg-gray-800 p-4 pb-8" />

          {/* ERROR HANDLER */}
          <ErrorHandler />
        </>
      )}

      {/* VERSION */}
      <div className="absolute bottom-2 right-2">
        <Typography className="text-white">{version}</Typography>
      </div>
    </main>
  );
}
