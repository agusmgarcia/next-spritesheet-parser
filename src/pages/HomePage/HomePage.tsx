import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import SpriteSelector from "./SpriteSelector";
import ToolBar from "./ToolBar";

export default function HomePage(props: HomePageProps) {
  const {} = useHomePage(props);

  return (
    <div className="size-full">
      {/* SPRITE SELECTOR */}
      <SpriteSelector />

      {/* TOOLBAR */}
      <ToolBar className="fixed inset-x-4 bottom-8" />
    </div>
  );
}
