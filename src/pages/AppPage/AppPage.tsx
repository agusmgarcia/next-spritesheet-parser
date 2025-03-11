import { Typography } from "#src/components";
import { SideBar } from "#src/fragments";

import useAppPage from "./AppPage.hooks";
import type AppPageProps from "./AppPage.types";

export default function AppPage(props: AppPageProps) {
  const { children, version, viewport } = useAppPage(props);

  if (viewport === "Mobile")
    return <Typography>This app is not intended to be for Mobile</Typography>;

  return (
    <main className="relative flex h-dvh w-screen border-[16px] border-dark">
      {/* CHILDREN */}
      <div className="h-full max-w-[calc(100%-360px)] flex-[1_0_67%] overflow-auto">
        {children}
      </div>

      {/* SIDEBAR */}
      <SideBar.Container className="h-full max-w-[360px] flex-[1_0_33%] overflow-y-auto overflow-x-hidden bg-gray-800 p-4 pb-8" />

      {/* VERSION */}
      <div className="absolute bottom-2 right-2">
        <Typography className="text-white">{version}</Typography>
      </div>
    </main>
  );
}
