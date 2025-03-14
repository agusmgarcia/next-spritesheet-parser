import { SideBar } from "#src/fragments";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function HomePage(props: HomePageProps) {
  const { indices, indicesOnSelect, indicesOnToggle, indicesOnUnselectAll } =
    useHomePage(props);

  return (
    <>
      {/* MAIN */}
      <MainContent
        indices={indices}
        indicesOnSelect={indicesOnSelect}
        indicesOnToggle={indicesOnToggle}
      />

      {/* SIDEBAR */}
      <SideBar>
        <SideBarContent
          indices={indices}
          indicesOnUnselectAll={indicesOnUnselectAll}
        />
      </SideBar>
    </>
  );
}
