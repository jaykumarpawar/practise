"use client";

import React, { useEffect } from "react";

export default function FontLoader() {
  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH
      ? `/${process.env.NEXT_PUBLIC_BASE_PATH}`
      : "";

    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: "Calibri";
        font-style: normal;
        font-weight: 400;
        src: url("${basePath}/fonts/calibri-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Calibri";
        font-style: italic;
        font-weight: 400;
        src: url("${basePath}/fonts/calibri-italic.ttf") format("truetype");
      }
      @font-face {
        font-family: "Calibri";
        font-style: normal;
        font-weight: 700;
        src: url("${basePath}/fonts/calibri-bold.ttf") format("truetype");
      }
    `;
    document.head.appendChild(style);
    console.log({ style });
  }, []);
  return <React.Fragment />;
}
