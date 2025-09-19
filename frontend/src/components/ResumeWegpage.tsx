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
}: {
  children: React.ReactNode[];
  pageNum: number;
  totalPages: number;
}) {
  return (
    <main className="relative m-4 h-[297mm] w-[210mm] overflow-hidden rounded bg-white p-10 shadow-lg print:m-0 print:rounded-none print:shadow-none">
      {children}
      <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm print:block hidden">
        Page {pageNum} of {totalPages}
      </div>
    </main>
  );
}

export default function ResumeWegpage({ data }: { data: any }) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const [blocks, setBlocks] = useState<React.ReactNode[]>([]);

  // Build fine-grained blocks
  useEffect(() => {
    const newBlocks: React.ReactNode[] = [];

    // Header
    newBlocks.push(
      <div key="header" className="text-center mb-6">
        <div className="text-2xl font-bold mb-2 border-b border-black pb-2">
          {data.name || "FirstName LastName"}
        </div>
        <div className="text-gray-500 text-sm">
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
      >
        Education
      </h2>
    );
    data.education?.forEach((edu: any, idx: number) => {
      newBlocks.push(
        <div key={`edu-${idx}`} className="mb-3">
          <div className="flex justify-between items-start">
            <span className="font-semibold">
              {edu.school || "University Name"}
            </span>
            <span className="text-sm">{edu.date || "Graduation Date"}</span>
          </div>
          <div className="text-sm">{edu.degree || "Degree, Major"}</div>
          {edu.details && (
            <div className="text-sm text-gray-600">{edu.details}</div>
          )}
        </div>
      );
    });

    // Experience
    newBlocks.push(
      <h2
        key="exp-title"
        className="uppercase text-center text-base font-bold mb-2 border-b border-gray-500 pb-1 tracking-wider mt-4"
      >
        Experience
      </h2>
    );
    data.experiences?.forEach((exp: any, idx: number) => {
      newBlocks.push(
        <div key={`exp-${idx}`} className="mb-3">
          <div className="flex justify-between items-start">
            <span className="font-semibold">{exp.org || "Organization"}</span>
            <span className="text-sm">
              {formatDateRange(exp.startDate, exp.endDate, exp.current) ||
                "Month Year – Month Year"}
            </span>
          </div>
          <div className="italic text-sm mb-1">
            {exp.role || "Position Title"}
          </div>
          <ul className="list-disc ml-6 text-sm space-y-1">
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
      >
        Skills
      </h2>
    );
    data.skills?.forEach((cat: any, idx: number) => {
      newBlocks.push(
        <div key={`skill-${idx}`} className="mb-2">
          <div className="font-bold">{cat.title}</div>
          <div className="text-sm">{cat.items.filter(Boolean).join(" • ")}</div>
        </div>
      );
    });

    setBlocks(newBlocks);
  }, [data]);

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
  }, [blocks]);

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
        <Page key={i} pageNum={i + 1} totalPages={pages.length}>
          {pageBlocks}
        </Page>
      ))}
    </div>
  );
}
