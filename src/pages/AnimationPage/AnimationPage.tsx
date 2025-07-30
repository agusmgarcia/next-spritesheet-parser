import { Layout } from "#src/fragments";

import useAnimationPage from "./AnimationPage.hooks";
import type AnimationPageProps from "./AnimationPage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function AnimationPage(props: AnimationPageProps) {
  const {
    animation,
    index,
    onFirstIndex,
    onLastIndex,
    onNextIndex,
    onPreviousIndex,
    ...rest
  } = useAnimationPage(props);
  if (!animation) return <></>;

  return (
    <Layout
      {...rest}
      sideBar={
        <SideBarContent
          animation={animation}
          index={index}
          onFirstIndex={onFirstIndex}
          onLastIndex={onLastIndex}
          onNextIndex={onNextIndex}
          onPreviousIndex={onPreviousIndex}
        />
      }
    >
      <MainContent animation={animation} index={index} />
    </Layout>
  );
}
