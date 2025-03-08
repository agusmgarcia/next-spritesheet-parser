import useSpriteSelector from "./SpriteSelector.hooks";
import type SpriteSelectorProps from "./SpriteSelector.types";

export default function SpriteSelector(props: SpriteSelectorProps) {
  const {
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    selectionCanvasRef,
    spriteSheetCanvasRef,
  } = useSpriteSelector(props);

  return (
    <div className="relative size-full">
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
