import { InstructionsButton, SideBar } from "#src/fragments";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function HomePage(props: HomePageProps) {
  const { instructions } = useHomePage(props);

  return (
    <>
      {/* MAIN */}
      <MainContent />

      {/* SIDEBAR */}
      <SideBar>
        <SideBarContent />
      </SideBar>

      {/* INSTRUCTIONS BUTTON */}
      <InstructionsButton
        className="fixed bottom-8 left-8"
        instructions={instructions}
      />
    </>
  );
}
