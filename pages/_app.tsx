import "./_app.css";

import { type AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component }: AppProps<any>) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Spritesheet Parser</title>
      </Head>

      <Component />
    </>
  );
}
