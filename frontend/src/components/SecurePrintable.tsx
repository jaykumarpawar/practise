"use client";

import React from "react";

interface SecurePrintableProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export default function SecurePrintable({
  isAuthenticated,
  children,
}: SecurePrintableProps) {
  return (
    <div
      id={isAuthenticated ? "resume-print-container" : "resume-container"}
      className="relative"
    >
      <div id="resume-print-area">{children}</div>
    </div>
  );
}
