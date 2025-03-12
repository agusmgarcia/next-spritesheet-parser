import useMainContent from "./MainContent.hooks";
import type MainContentProps from "./MainContent.types";

export default function MainContent(props: MainContentProps) {
  const { rootRef, spriteCanvasRef } = useMainContent(props);

  return (
    <div ref={rootRef} className="relative size-full">
      {/* SPRITE */}
      <canvas ref={spriteCanvasRef} className="absolute" />
    </div>
  );
}
