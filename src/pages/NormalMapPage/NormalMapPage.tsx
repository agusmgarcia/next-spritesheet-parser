import MainContent from "./MainContent";
import useNormalMapPage from "./NormalMapPage.hooks";
import type NormalMapPageProps from "./NormalMapPage.types";

export default function NormalMapPage(props: NormalMapPageProps) {
  const {} = useNormalMapPage(props);

  return <MainContent />;
}
