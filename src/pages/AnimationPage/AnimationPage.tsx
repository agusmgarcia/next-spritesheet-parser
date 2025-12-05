import { Layout } from "#src/fragments";

import useAnimationPage from "./AnimationPage.hooks";
import type AnimationPageProps from "./AnimationPage.types";
import { MainContent } from "./MainContent";
import { SideBarContent } from "./SideBarContent";

export default function AnimationPage(props: AnimationPageProps) {
  const { ...rest } = useAnimationPage(props);

  return (
    <Layout {...rest} sideBar={<SideBarContent />}>
      <MainContent />
    </Layout>
  );
}
