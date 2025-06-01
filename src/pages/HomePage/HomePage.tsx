import { Layout } from "#src/fragments";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import MainContent from "./MainContent";
import SideBarContent from "./SideBarContent";

export default function HomePage(props: HomePageProps) {
  const { ...rest } = useHomePage(props);

  return (
    <Layout {...rest} sideBar={<SideBarContent />} sideBarCollapsable={true}>
      <MainContent />
    </Layout>
  );
}
