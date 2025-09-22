"use client";

import React, { useEffect, useRef, useState } from "react";

function mmToPx(mm: number) {
  const div = document.createElement("div");
  div.style.width = mm + "mm";
  document.body.appendChild(div);
  const px = div.getBoundingClientRect().width;
  div.remove();
  return px;
}

function formatDateRange(start?: string, end?: string, current?: boolean) {
  if (!start) return "";
  const startStr = new Date(start).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const endStr = current
    ? "Present"
    : end
    ? new Date(end).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";
  return `${startStr} – ${endStr}`;
}

function Page({
  children,
  pageNum,
  totalPages,
  settings,
}: {
  children: React.ReactNode[];
  pageNum: number;
  totalPages: number;
  settings: Settings;
}) {
  return (
    <main
      className="relative m-4 h-[297mm] w-[210mm] overflow-hidden rounded bg-white p-10 shadow-lg print:m-0 print:rounded-none print:shadow-none"
      style={{
        fontFamily: settings.fontFamily,
        fontSize: `${settings.fontSize}pt`,
      }}
    >
      {children}
      {/* Page number (conditionally rendered) */}
      {settings.showPageNumbers && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 print:block hidden">
          Page {pageNum} of {totalPages}
        </div>
      )}
    </main>
  );
}

interface Settings {
  fontFamily: string;
  fontSize: number;
  headerFontSize: number;
  showPageNumbers: boolean;
}

const CalenderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="size-4"
  >
    <path
      fillRule="evenodd"
      d="M4 1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 1.5 0V3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V1.75ZM4.5 6a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-7Z"
      clipRule="evenodd"
    />
  </svg>
);
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="size-4"
  >
    <path
      fillRule="evenodd"
      d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ResumeWegpage({
  data,
  settings,
}: {
  data: any;
  settings: Settings;
}) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const [blocks, setBlocks] = useState<React.ReactNode[]>([]);

  // Build fine-grained blocks
  useEffect(() => {
    const newBlocks: React.ReactNode[] = [];

    // Header
    newBlocks.push(
      <div key="header" className="text-center mb-6">
        <div
          className="text-2xl font-bold mb-2 border-b border-black pb-2"
          style={{ fontSize: `${settings.headerFontSize}pt` }}
        >
          {data.name || "FirstName LastName"}
        </div>
        <div className="text-gray-500">
          {(data.address || "Street Address • City, State Zip") +
            " • " +
            (data.email || "youremail@example.com") +
            " • " +
            (data.phone || "123-456-7890")}
        </div>
      </div>
    );

    // Education
    newBlocks.push(
      <h2
        key="edu-title"
        className="uppercase text-center text-base font-bold mb-2 border-b border-gray-500 pb-1 tracking-wider"
        style={{ fontSize: `${settings.headerFontSize - 2}pt` }}
      >
        Education
      </h2>
    );
    data.education?.forEach((edu: any, idx: number) => {
      newBlocks.push(
        <div key={`edu-${idx}`} className="mb-3">
          <div className="leading-non">
            <div className="flex justify-between items-start">
              <span className="font-semibold">
                {edu.school || "University Name"}
              </span>
              <span className="flex items-center">
                <LocationIcon />
                {edu.city || "City"}, {edu.state || "State"}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span>{edu.degree || "Degree, Major"}</span>
              <span className="flex items-center">
                <CalenderIcon />
                {edu.date || "Graduation Date"}
              </span>
            </div>
          </div>
          {edu.details && <span>{edu.details}</span>}
        </div>
      );
    });

    // Experience
    newBlocks.push(
      <h2
        key="exp-title"
        className="uppercase text-center text-base font-bold mb-2 border-b border-gray-500 pb-1 tracking-wider mt-4"
        style={{ fontSize: `${settings.headerFontSize - 2}pt` }}
      >
        Experience
      </h2>
    );
    data.experiences?.forEach((exp: any, idx: number) => {
      newBlocks.push(
        <div key={`exp-${idx}`} className="mb-3">
          <div className="leading-non">
            <div className="flex justify-between items-start">
              <span className="font-semibold">{exp.org || "Organization"}</span>
              <span className="flex items-center">
                <CalenderIcon />
                {formatDateRange(exp.startDate, exp.endDate, exp.current) ||
                  "Month Year – Month Year"}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="font-semibold">
                {exp.role || "Position Title"}
              </span>
              <span className="flex items-center">
                <LocationIcon />
                {exp.city || "City"}, {exp.state || "State"}
              </span>
            </div>
          </div>

          <ul className="list-disc ml-6 space-y-1">
            {(exp.bullets?.length
              ? exp.bullets
              : [
                  "Describe experience in bullet points.",
                  "Start with action verbs.",
                  "Quantify where possible.",
                ]
            ).map((b: string, i: number) => (
              <li key={`exp-${idx}-b-${i}`}>{b}</li>
            ))}
          </ul>
        </div>
      );
    });

    // Skills
    newBlocks.push(
      <h2
        key="skills-title"
        className="uppercase text-center text-base font-bold mb-2 border-b border-gray-500 pb-1 tracking-wider mt-4"
        style={{ fontSize: `${settings.headerFontSize - 2}pt` }}
      >
        Skills
      </h2>
    );
    data.skills?.forEach((cat: any, idx: number) => {
      newBlocks.push(
        <div key={`skill-${idx}`} className="mb-2">
          <div className="font-bold">{cat.title}</div>
          <div>{cat.items.filter(Boolean).join(" • ")}</div>
        </div>
      );
    });

    setBlocks(newBlocks);
  }, [data, settings]);

  // Measure & paginate
  useEffect(() => {
    if (!measureRef.current) return;
    const pageHeightPx = mmToPx(297);
    const children = Array.from(measureRef.current.children);

    let currentPage: React.ReactNode[] = [];
    let currentHeight = 0;
    const padding = 100;
    const availableHeight = pageHeightPx - padding * 2;

    const newPages: React.ReactNode[][] = [];

    children.forEach((child, idx) => {
      const childHeight = (child as HTMLElement).offsetHeight;
      if (
        currentHeight + childHeight > availableHeight &&
        currentPage.length > 0
      ) {
        newPages.push(currentPage);
        currentPage = [blocks[idx]];
        currentHeight = childHeight;
      } else {
        currentPage.push(blocks[idx]);
        currentHeight += childHeight;
      }
    });

    if (currentPage.length > 0) newPages.push(currentPage);
    setPages(newPages);
  }, [blocks, settings]);

  return (
    <div className="grid min-h-screen place-items-center bg-gray-200 print:block print:min-h-0">
      {/* Hidden measurement container (completely removed from flow) */}
      <div
        ref={measureRef}
        className="fixed -top-[9999px] left-0 w-[210mm] p-10"
        aria-hidden="true"
      >
        {blocks}
      </div>

      {/* Render paginated blocks */}
      {pages.map((pageBlocks, i) => (
        <Page
          key={i}
          pageNum={i + 1}
          totalPages={pages.length}
          settings={settings}
        >
          {pageBlocks}
        </Page>
      ))}
    </div>
  );
}
