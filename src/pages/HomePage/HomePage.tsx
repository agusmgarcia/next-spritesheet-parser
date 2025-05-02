import { SideBar } from "#src/fragments";

import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function HomePage() {
  return (
    <>
      {/* MAIN */}
      <MainContent />

      {/* SIDEBAR */}
      <SideBar>
        <SideBarContent />
      </SideBar>
    </>
  );
}
