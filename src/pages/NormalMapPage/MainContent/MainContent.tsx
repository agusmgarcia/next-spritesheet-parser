import useMainContent from "./MainContent.hooks";
import type MainContentProps from "./MainContent.types";

export default function MainContent(props: MainContentProps) {
  const { normalMapCanvasRef, rootRef } = useMainContent(props);

  return (
    <div ref={rootRef} className="relative size-full">
      {/* NORMAL MAP */}
      <canvas ref={normalMapCanvasRef} className="absolute" />
    </div>
  );
}
