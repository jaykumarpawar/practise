"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ResumeDocument from "@/components/ResumeDocument";
import { useDebounce } from "../hooks/useDebounce";
import EducationForm from "@/components/EducationForm";
import ExperienceForm from "@/components/ExperienceForm";
import SkillsForm, { SkillCategory } from "@/components/SkillsForm";
import { getAssetUrl } from "@/utils/urlUtility";

const formStructure = {
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
  skills: [{ title: "Technical skills", items: [""] }],
};

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function ResumeBuilder() {
  const count = useRef(0);
  const [formData, setFormData] = useState(formStructure);

  const debouncedFormData = useDebounce(formData, 1000);
  useEffect(() => {
    count.current++;
  }, [formData, debouncedFormData]);

  return (
    <div className="flex h-screen">
      {/* Left - Form */}
      <div className="w-1/2 p-6 pb-32 overflow-y-auto bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Resume Form</h2>
        <form className="space-y-6">
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
          <SkillsForm
            skills={formData.skills}
            setSkills={(skills: SkillCategory[]) =>
              setFormData((prev) => ({ ...prev, skills }))
            }
          />
        </form>
        {/* Fixed Bottom Buttons */}
        <div className="fixed bottom-0 left-0 w-1/2 bg-white border-t p-4 flex justify-around">
          <button
            type="button"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            onClick={async () => {
              const confirmed = window.confirm(
                "Are you sure you want to load demo data? Your current form data will be lost."
              );
              if (!confirmed) return;

              const res = await fetch(getAssetUrl("/demo-data.json"));
              const demoData = await res.json();
              setFormData(demoData);
            }}
          >
            Load Demo Data
          </button>

          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to reset? Your current form data will be lost."
              );
              if (!confirmed) return;
              setFormData(formStructure);
            }}
          >
            Reset Form
          </button>
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
