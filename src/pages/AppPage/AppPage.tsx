import useAppPage from "./AppPage.hooks";
import type AppPageProps from "./AppPage.types";

export default function AppPage(props: AppPageProps) {
  const { backgroundStyle, children, version } = useAppPage(props);

  return (
    <main className="mx-auto h-dvh max-w-screen-xl overflow-auto">
      {/* BACKGROUND */}
      <div className="fixed inset-0" style={backgroundStyle} />

      {/* CHILDREN */}
      {children}

      {/* VERSION */}
      <p className="fixed bottom-2 right-2">{version}</p>
    </main>
  );
}
