import { Layout } from "#src/fragments";

import MainContent from "./MainContent";
import useNormalMapPage from "./NormalMapPage.hooks";
import type NormalMapPageProps from "./NormalMapPage.types";
import SideBarContent from "./SideBarContent";

export default function NormalMapPage(props: NormalMapPageProps) {
  const { ...rest } = useNormalMapPage(props);

  return (
    <Layout {...rest} sideBar={<SideBarContent />} sideBarCollapse={true}>
      <MainContent />
    </Layout>
  );
}
