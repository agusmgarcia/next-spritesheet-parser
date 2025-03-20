import { SideBar } from "#src/fragments";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function HomePage(props: HomePageProps) {
  const {
    exportFileDisabled,
    exportFileLoading,
    exportFileOnClick,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
  } = useHomePage(props);

  return (
    <>
      {/* MAIN */}
      <MainContent
        exportFileDisabled={exportFileDisabled}
        exportFileOnClick={exportFileOnClick}
        importFileDisabled={importFileDisabled}
        importFileOnClick={importFileOnClick}
        spriteIds={spriteIds}
        spriteIdsOnSelect={spriteIdsOnSelect}
        spriteIdsOnToggle={spriteIdsOnToggle}
      />

      {/* SIDEBAR */}
      <SideBar>
        <SideBarContent
          exportFileDisabled={exportFileDisabled}
          exportFileLoading={exportFileLoading}
          exportFileOnClick={exportFileOnClick}
          importFileDisabled={importFileDisabled}
          importFileLoading={importFileLoading}
          importFileOnClick={importFileOnClick}
          spriteIds={spriteIds}
          spriteIdsOnUnselectAll={spriteIdsOnUnselectAll}
        />
      </SideBar>
    </>
  );
}
