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
          padding: "20px",
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
              backgroundPosition: "center",
            },
          },
        }}
      >
        <div
          css={{
            display: "grid",
            placeItems: "center"
          }}
        >
          <div
            css={{
              borderRadius: "50px",
              maxWidth: 75,
              maxHeight: 75,
              overflow: "hidden",
            }}
          >
            <img
              src="/cynatics.png"
              alt="Company image"
              css={{ width: "100%" }}
            />
          </div>
        </div>
        <Login />
      </div>
    </div>
  );
}

export default UnauthenticatedApp;
