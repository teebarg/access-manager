/** @jsx jsx */
import { jsx } from "@emotion/react";

import React from "react";
import Login from "./pages/login";
import * as mq from "./styles/media-queries";

function UnauthenticatedApp() {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        [mq.small]: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto",
        },
      }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <div
        css={{
          [mq.small]: {
            display: "none",
          },
        }}
      >
        <img
          src="/auth.png"
          alt="login image"
          css={{ width: "100%", height: "100%", opacity: 0.5 }}
        />
      </div>
      <div
        css={{
          display: "grid",
          alignItems: "center",
          padding: "10px",
          [mq.small]: {
            "::after": {
              content: "''",
              background: "url('/auth.png')",
              opacity: 0.4,
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              zIndex: -1,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }
          },
        }}
      >
        <Login />
      </div>
    </div>
  );
}

export default UnauthenticatedApp;
