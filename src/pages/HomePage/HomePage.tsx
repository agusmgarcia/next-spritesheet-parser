import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import SpriteSelector from "./SpriteSelector";
import ToolBar from "./ToolBar";

export default function HomePage(props: HomePageProps) {
  const { indices, select, toggleSelection, unselectAll } = useHomePage(props);

  return (
    <div className="size-full">
      {/* SPRITE SELECTOR */}
      <SpriteSelector
        indices={indices}
        select={select}
        toggleSelection={toggleSelection}
      />

      {/* TOOLBAR */}
      <ToolBar
        className="fixed inset-x-4 bottom-8"
        indices={indices}
        unselectAll={unselectAll}
      />
    </div>
  );
}
