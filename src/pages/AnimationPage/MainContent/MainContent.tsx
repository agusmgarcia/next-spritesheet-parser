import useMainContent from "./MainContent.hooks";
import type MainContentProps from "./MainContent.types";

export default function MainContent(props: MainContentProps) {
  const { spriteCanvasRef, ...rest } = useMainContent(props);

  return (
    <div {...rest} className="size-full" tabIndex={-1}>
      {/* SPRITE */}
      <canvas ref={spriteCanvasRef} />
    </div>
  );
}
