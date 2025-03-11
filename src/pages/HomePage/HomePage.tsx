import { SideBar } from "#src/fragments";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function HomePage(props: HomePageProps) {
  const { indices, select, toggleSelection, unselectAll } = useHomePage(props);

  return (
    <>
      {/* MAIN */}
      <MainContent
        indices={indices}
        select={select}
        toggleSelection={toggleSelection}
      />

      {/* SIDEBAR */}
      <SideBar>
        <SideBarContent indices={indices} unselectAll={unselectAll} />
      </SideBar>
    </>
  );
}
