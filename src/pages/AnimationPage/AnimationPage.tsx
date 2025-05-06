import { SideBar } from "#src/fragments";

import useAnimationPage from "./AnimationPage.hooks";
import type AnimationPageProps from "./AnimationPage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function AnimationPage(props: AnimationPageProps) {
  const { animation, index, onIndexChange } = useAnimationPage(props);

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
    </>
  );
}
