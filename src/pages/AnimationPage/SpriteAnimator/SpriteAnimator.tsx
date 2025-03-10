import useSpriteAnimator from "./SpriteAnimator.hooks";
import type SpriteAnimatorProps from "./SpriteAnimator.types";

export default function SpriteAnimator(props: SpriteAnimatorProps) {
  const { rootRef, spriteCanvasRef } = useSpriteAnimator(props);

  return (
    <div ref={rootRef} className="relative size-full">
      {/* SPRITE */}
      <canvas ref={spriteCanvasRef} className="absolute" />
    </div>
  );
}
