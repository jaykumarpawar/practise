"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ResumeDocument from "@/components/ResumeDocument";
import { useDebounce } from "../hooks/useDebounce";
import EducationForm from "@/components/EducationForm";
import ExperienceForm from "@/components/ExperienceForm";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function ResumeBuilder() {
  const count = useRef(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    education: [{ school: "", degree: "", date: "", details: "" }],
    experiences: [
      {
        org: "",
        role: "",
        startDate: "",
        endDate: "",
        current: false,
        bullets: [] as string[],
      },
    ],
    skills: "",
  });

  const debouncedFormData = useDebounce(formData, 1000);
  useEffect(() => {
    count.current++;
  }, [formData, debouncedFormData]);

  return (
    <div className="flex h-screen">
      {/* Left - Form */}
      <div className="w-1/2 p-6 overflow-y-auto bg-gray-50 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Resume Form</h2>

        {/* Header */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Header</h3>
          {["name", "address", "email", "phone"].map((field) => (
            <input
              key={field}
              name={field}
              value={(formData as any)[field]}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field]: e.target.value }))
              }
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="w-full border rounded-lg p-2 mb-2"
            />
          ))}
        </div>

        {/* Education */}
        <EducationForm
          education={formData.education}
          setEducation={(education) =>
            setFormData((prev) => ({ ...prev, education }))
          }
        />

        {/* Experience */}
        <ExperienceForm
          experiences={formData.experiences}
          setExperiences={(experiences) =>
            setFormData((prev) => ({ ...prev, experiences }))
          }
        />

        {/* Skills */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Skills & Interests</h3>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, skills: e.target.value }))
            }
            placeholder="E.g. React, NestJS • Languages: English • Interests: Hiking"
            className="w-full border rounded-lg p-2"
            rows={2}
          />
        </div>
      </div>

      {/* Right - PDF Preview */}
      <div className="w-1/2 p-6 bg-white overflow-y-auto border-l">
        <h2 className="text-2xl font-bold mb-4">Live PDF Preview</h2>
        <PDFViewer
          className="w-full h-[90%] border rounded-lg"
          key={count.current}
        >
          <ResumeDocument data={debouncedFormData} />
        </PDFViewer>
      </div>
    </div>
  );
}
