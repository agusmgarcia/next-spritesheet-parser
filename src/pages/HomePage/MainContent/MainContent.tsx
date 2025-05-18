import useMainContent from "./MainContent.hooks";
import type MainContentProps from "./MainContent.types";

export default function MainContent(props: MainContentProps) {
  const {
    onClick,
    onMouseDown,
    onMouseLeave,
    onMouseMove,
    selectionCanvasRef,
    spriteSheetCanvasRef,
    ...rest
  } = useMainContent(props);

  return (
    <div {...rest} className="relative size-full" tabIndex={-1}>
      {/* SPRITE SHEET */}
      <canvas ref={spriteSheetCanvasRef} />

      {/* SELECTION */}
      <canvas
        ref={selectionCanvasRef}
        className="absolute inset-0"
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      />
    </div>
  );
}
