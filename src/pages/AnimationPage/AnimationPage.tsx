import useAnimationPage from "./AnimationPage.hooks";
import type AnimationPageProps from "./AnimationPage.types";
import SpriteAnimator from "./SpriteAnimator";
import ToolBar from "./ToolBar";

export default function AnimationPage(props: AnimationPageProps) {
  const { animation, index, onIndexChange, onScaleChange, scale } =
    useAnimationPage(props);

  if (!animation) return <></>;

  return (
    <div className="size-full">
      {/* SPRITE ANIMATOR */}
      <SpriteAnimator animation={animation} index={index} scale={scale} />

      {/* TOOLBAR */}
      <ToolBar
        animation={animation}
        className="fixed inset-x-4 bottom-8"
        onIndexChange={onIndexChange}
        onScaleChange={onScaleChange}
        scale={scale}
      />
    </div>
  );
}
