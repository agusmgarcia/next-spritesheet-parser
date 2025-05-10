import { InstructionsButton, SideBar } from "#src/fragments";

import useAnimationPage from "./AnimationPage.hooks";
import type AnimationPageProps from "./AnimationPage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function AnimationPage(props: AnimationPageProps) {
  const { animation, index, instructions, onIndexChange } =
    useAnimationPage(props);

  if (!animation) return <></>;

  return (
    <>
      {/* MAIN */}
      <MainContent animation={animation} index={index} />

      {/* SIDEBAR */}
      <SideBar>
        <SideBarContent
          animation={animation}
          index={index}
          onIndexChange={onIndexChange}
        />
      </SideBar>

      {/* INSTRUCTIONS BUTTON */}
      <InstructionsButton
        className="fixed bottom-8 left-8"
        instructions={instructions}
      />
    </>
  );
}
