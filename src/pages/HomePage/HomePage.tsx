import { SideBar } from "#src/fragments";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function HomePage(props: HomePageProps) {
  const {
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
  } = useHomePage(props);

  return (
    <>
      {/* MAIN */}
      <MainContent
        spriteIds={spriteIds}
        spriteIdsOnSelect={spriteIdsOnSelect}
        spriteIdsOnToggle={spriteIdsOnToggle}
      />

      {/* SIDEBAR */}
      <SideBar>
        <SideBarContent
          spriteIds={spriteIds}
          spriteIdsOnUnselectAll={spriteIdsOnUnselectAll}
        />
      </SideBar>
    </>
  );
}
