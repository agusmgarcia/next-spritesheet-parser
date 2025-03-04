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
      <canvas ref={imageCanvasRef} className="absolute" />
      <canvas
        ref={selectionCanvasRef}
        className="absolute"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      />
    </div>
  );
}
