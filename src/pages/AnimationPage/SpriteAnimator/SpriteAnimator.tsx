import useSpriteAnimator from "./SpriteAnimator.hooks";
import type SpriteAnimatorProps from "./SpriteAnimator.types";

export default function SpriteAnimator(props: SpriteAnimatorProps) {
  const { spriteCanvasRef, spriteCanvasStyle } = useSpriteAnimator(props);

  return (
    <div className="relative size-full">
      {/* SPRITE */}
      <canvas ref={spriteCanvasRef} style={spriteCanvasStyle} />
    </div>
  );
}
