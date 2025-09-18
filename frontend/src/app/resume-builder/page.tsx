"use client";
import React, { useEffect, useRef, useState, useTransition, memo } from "react";
import dynamic from "next/dynamic";
import ResumeDocument from "@/components/ResumeDocument";
import { useDebounce } from "../hooks/useDebounce";
import EducationForm from "@/components/EducationForm";
import ExperienceForm from "@/components/ExperienceForm";
import SkillsForm, { SkillCategory } from "@/components/SkillsForm";
import { getAssetUrl } from "@/utils/urlUtility";
import useDisableContextMenu from "../hooks/useDisableContextMenu";
import ResumeWegpage from "@/components/ResumeWegpage";
import AuthModal from "@/components/AuthModal";
import { useAuth0 } from "@auth0/auth0-react";

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

const MemoizedResumeDocument = memo(ResumeDocument);

export default function ResumeBuilder() {
  // useDisableContextMenu();
  const count = useRef(0);
  const [formData, setFormData] = useState(formStructure);
  const [isPending, startTransition] = useTransition();

  const debouncedFormData = useDebounce(formData, 500);
  const [deferredData, setDeferredData] = useState(debouncedFormData);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // Load persisted auth
  useEffect(() => {
    const saved = localStorage.getItem("resumeAuth");
    if (saved) setAuthenticated(true);
  }, []);

  const handleAuthSuccess = () => {
    setAuthenticated(true);
    setShowAuthModal(false);
    setTimeout(() => window.print(), 200); // ✅ allow print after auth
  };

  const handlePrintClick = () => {
    if (authenticated) {
      window.print();
    } else {
      setShowAuthModal(true);
    }
  };

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const handlePrint = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
    } else {
      window.print();
    }
  };

  // Optional: Block Ctrl+P until authenticated
  useEffect(() => {
    const blockPrint = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        if (!isAuthenticated) loginWithRedirect();
        else window.print();
      }
    };
    window.addEventListener("keydown", blockPrint);
    return () => window.removeEventListener("keydown", blockPrint);
  }, [isAuthenticated]);

  useEffect(() => {
    startTransition(() => {
      setDeferredData(debouncedFormData);
    });
  }, [debouncedFormData]);

  useEffect(() => {
    count.current++;
  }, [deferredData]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-6 pb-25 overflow-y-auto bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Resume Form</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                className="w-full border rounded p-2 mb-2"
              />
            ))}
          </div>
          <EducationForm
            education={formData.education}
            setEducation={(education) =>
              setFormData((prev) => ({ ...prev, education }))
            }
          />
          <ExperienceForm
            experiences={formData.experiences}
            setExperiences={(experiences) =>
              setFormData((prev) => ({ ...prev, experiences }))
            }
          />
          <SkillsForm
            skills={formData.skills}
            setSkills={(skills: SkillCategory[]) =>
              setFormData((prev) => ({ ...prev, skills }))
            }
          />
        </form>
        <div className="fixed bottom-0 left-0 w-1/2 bg-white border-t p-4 flex justify-around">
          <button
            type="button"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            onClick={async () => {
              if (
                !window.confirm(
                  "Load demo data? Current form data will be lost."
                )
              )
                return;
              const res = await fetch(getAssetUrl("/demo-data.json"));
              const demoData = await res.json();
              setFormData(demoData);
            }}
          >
            Load Demo Data
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={() => {
              if (!window.confirm("Reset form? Current data will be lost."))
                return;
              setFormData(formStructure);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="w-1/2 p-6 pb-16 bg-white overflow-y-auto border-l">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        {isPending && (
          <p className="text-sm text-gray-500 mb-2">Updating preview...</p>
        )}
        {/* <PDFViewer
          className="w-full h-[90%] border rounded"
          key={Date.now()}
          showToolbar={false}
        >
          <MemoizedResumeDocument data={deferredData} />
        </PDFViewer> */}
        <div
          id="resume-print-area"
          className="grid bg-gray-200 print:block print:min-h-0"
        >
          <ResumeWegpage data={deferredData} />
        </div>
        <div className="fixed bottom-0 right-0 w-1/2 bg-white border-t p-4 flex justify-around">
          {/* Print button (beside reset button) */}
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Print
          </button>
          {isAuthenticated && (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
