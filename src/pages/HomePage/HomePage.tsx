import { SideBar } from "#src/fragments";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function HomePage(props: HomePageProps) {
  const {
    createAnimationDisabled,
    createAnimationOnClick,
    exportFileDisabled,
    exportFileLoading,
    exportFileOnClick,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
    resetSelectionDisabled,
    resetSelectionOnClick,
    spriteIds,
    spriteIdsOnSelect,
    spriteIdsOnToggle,
    spriteIdsOnUnselectAll,
  } = useHomePage(props);

  return (
    <>
      {/* MAIN */}
      <MainContent
        createAnimationDisabled={createAnimationDisabled}
        createAnimationOnClick={createAnimationOnClick}
        exportFileDisabled={exportFileDisabled}
        exportFileOnClick={exportFileOnClick}
        importFileDisabled={importFileDisabled}
        importFileOnClick={importFileOnClick}
        resetSelectionDisabled={resetSelectionDisabled}
        resetSelectionOnClick={resetSelectionOnClick}
        spriteIds={spriteIds}
        spriteIdsOnSelect={spriteIdsOnSelect}
        spriteIdsOnToggle={spriteIdsOnToggle}
      />

      {/* SIDEBAR */}
      <SideBar>
        <SideBarContent
          createAnimationDisabled={createAnimationDisabled}
          createAnimationOnClick={createAnimationOnClick}
          exportFileDisabled={exportFileDisabled}
          exportFileLoading={exportFileLoading}
          exportFileOnClick={exportFileOnClick}
          importFileDisabled={importFileDisabled}
          importFileLoading={importFileLoading}
          importFileOnClick={importFileOnClick}
          resetSelectionDisabled={resetSelectionDisabled}
          resetSelectionOnClick={resetSelectionOnClick}
          spriteIds={spriteIds}
          spriteIdsOnUnselectAll={spriteIdsOnUnselectAll}
        />
      </SideBar>
    </>
  );
}
