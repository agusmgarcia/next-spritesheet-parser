import useAnimationPage from "./AnimationPage.hooks";
import type AnimationPageProps from "./AnimationPage.types";
import SpriteAnimator from "./SpriteAnimator";
import ToolBar from "./ToolBar";

export default function AnimationPage(props: AnimationPageProps) {
  const { animation, index, onIndexChange } = useAnimationPage(props);

  if (!animation) return <></>;

  return (
    <div className="size-full">
      {/* SPRITE ANIMATOR */}
      <SpriteAnimator animation={animation} index={index} />

      {/* TOOLBAR */}
      <ToolBar
        animation={animation}
        className="fixed inset-x-4 bottom-8"
        index={index}
        onIndexChange={onIndexChange}
      />
    </div>
  );
}
