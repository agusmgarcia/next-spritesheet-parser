import useMainContent from "./MainContent.hooks";
import type MainContentProps from "./MainContent.types";

export default function MainContent(props: MainContentProps) {
  const {
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    rootRef,
    selectionCanvasRef,
    spriteSheetCanvasRef,
  } = useMainContent(props);

  return (
    <div ref={rootRef} className="relative size-full">
      {/* SPRITE SHEET */}
      <canvas ref={spriteSheetCanvasRef} className="absolute" />

      {/* SELECTION */}
      <canvas
        ref={selectionCanvasRef}
        className="absolute"
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      />
    </div>
  );
}
