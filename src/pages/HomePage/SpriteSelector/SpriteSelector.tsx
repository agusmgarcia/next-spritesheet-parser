import useSpriteSelector from "./SpriteSelector.hooks";
import type SpriteSelectorProps from "./SpriteSelector.types";

export default function SpriteSelector(props: SpriteSelectorProps) {
  const {
    imageCanvasRef,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    selectionCanvasRef,
  } = useSpriteSelector(props);

  return (
    <div className="relative size-full">
      <canvas ref={imageCanvasRef} className="absolute z-10" />
      <canvas
        ref={selectionCanvasRef}
        className="absolute z-20"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      />
    </div>
  );
}
