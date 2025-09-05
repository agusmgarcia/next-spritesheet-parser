import "./_app.css";

import { type AppProps } from "next/app";
import Head from "next/head";

import { StoreProvider } from "#src/store";

export default function App({ Component }: AppProps<any>) {
  return (
    <>
      <Head>
        <title>Spritesheet Parser</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          href={`${process.env.APP_BASE_PATH || ""}/favicon.ico`}
          rel="icon"
          type="image/x-icon"
        />
      </Head>

      <StoreProvider>
        <Component />
      </StoreProvider>
    </>
  );
}
