import { SWRConfig } from "swr";
import React from "react";

import "../styles/global.css";

function App({ Component, pageProps }) {
  // console.log("[App] pageProps.fallback: ", pageProps.fallback);

  return (
    <SWRConfig value={{ fallback: pageProps.fallback }}>
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
