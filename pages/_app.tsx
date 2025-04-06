import "./_app.css";

import { type AppProps } from "next/app";
import Head from "next/head";

import { AppPage } from "#src/pages";
import { StoreProvider } from "#src/store";

export default function App({ Component }: AppProps<any>) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <title>Spritesheet Parser</title>
      </Head>

      <StoreProvider>
        <AppPage>
          <Component />
        </AppPage>
      </StoreProvider>
    </>
  );
}
