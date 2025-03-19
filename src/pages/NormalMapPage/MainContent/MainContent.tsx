import useMainContent from "./MainContent.hooks";
import type MainContentProps from "./MainContent.types";

export default function MainContent(props: MainContentProps) {
  const { normalMapCanvasRef, ...rest } = useMainContent(props);

  return (
    <div {...rest} className="size-full">
      {/* NORMAL MAP */}
      <canvas ref={normalMapCanvasRef} />
    </div>
  );
}
