import Head from "next/head";
import { SWRConfig } from "swr";
import React from "react";

import "../styles/global.css";

function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fallback: pageProps.fallback }}>
      <Head>
        <meta name="description" content="Super theme blogs here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx>{`
        body {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default App;
