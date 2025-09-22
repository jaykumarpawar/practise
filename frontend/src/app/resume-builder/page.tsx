"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useDebounce } from "../hooks/useDebounce";
import EducationForm from "@/components/EducationForm";
import ExperienceForm from "@/components/ExperienceForm";
import SkillsForm, { SkillCategory } from "@/components/SkillsForm";
import { getAssetUrl } from "@/utils/urlUtility";
import ResumeWegpage from "@/components/ResumeWegpage";
import { getUser, logout } from "@/utils/auth";
import PrintAuthModal from "@/components/PrintAuthModal";
import SecurePrintable from "@/components/SecurePrintable";

const formStructure = {
  name: "",
  address: "",
  email: "",
  phone: "",
  education: [
    { school: "", degree: "", date: "", city: "", state: "", details: "" },
  ],
  experiences: [
    {
      org: "",
      role: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      current: false,
      bullets: [] as string[],
    },
  ],
  skills: [{ title: "Technical skills", items: [""] }],
};

const defaultSettings = {
  fontFamily: "Calibri",
  fontSize: 11,
  headerFontSize: 14,
  showPageNumbers: true,
};

export default function ResumeBuilder() {
  // useDisableContextMenu();
  const [formData, setFormData] = useState(formStructure);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [settings, setSettings] = useState(defaultSettings);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const debouncedFormData = useDebounce(formData, 500);
  const [deferredData, setDeferredData] = useState(debouncedFormData);

  useEffect(() => {
    getUser().then((u) => {
      if (u) setUser(u);
    });
  }, []);

  const handlePrint = async () => {
    if (!user) {
      setIsPrintModalOpen(true);
    } else {
      window.print();
    }
  };

  useEffect(() => {
    const blockPrint = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        if (!user) {
          setIsPrintModalOpen(true);
        } else {
          window.print();
        }
      }
    };
    window.addEventListener("keydown", blockPrint);
    return () => window.removeEventListener("keydown", blockPrint);
  }, [user]);

  async function handleLoadDemoData() {
    if (!window.confirm("Load demo data? Current form data will be lost."))
      return;

    try {
      setLoading(true);
      const res = await fetch(getAssetUrl("/demo-data.json"));
      const demoData = await res.json();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormData(demoData);
    } catch (error) {
      console.error("Failed to load demo data:", error);
      alert("Something went wrong while loading demo data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    startTransition(() => {
      setDeferredData(debouncedFormData);
    });
  }, [debouncedFormData]);

  return (
    <div className="flex h-screen">
      <div className="grid grid-cols-[40%_14%_46%] w-full">
        <div className="p-6 pb-25 overflow-y-auto bg-gray-50 border-r">
          <h2 className="text-2xl font-bold mb-6">Resume Form</h2>
          {user && (
            <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded">
              <p className="font-semibold">
                Welcome, {user.name || user.email}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <button
                className="text-sm text-red-600 underline mt-1"
                onClick={() => logout()}
              >
                Log out
              </button>
            </div>
          )}
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <div>
              <h3 className="font-semibold text-lg mb-2">Header</h3>
              {["name", "address", "email", "phone"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={(formData as any)[field]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
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
          <div className="fixed bottom-0 left-0 w-[40%] bg-white border p-4 flex justify-around">
            <button
              type="button"
              className={`bg-purple-600 text-white px-4 py-2 rounded transition flex items-center justify-center gap-2 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-purple-700"
              }`}
              onClick={handleLoadDemoData}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Loading...
                </>
              ) : (
                "Load Demo Data"
              )}
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
        <div className="p-6 pb-25 overflow-y-auto">
          <h2 className="text-2xl font-bold pb-6">Settings</h2>
          {/* Font Family */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg mb-2">Font Family</h3>
            <select
              className="border rounded p-2 w-full mb-2"
              value={settings.fontFamily}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, fontFamily: e.target.value }))
              }
            >
              <option value="Calibri">Calibri</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>

          {/* Font Size */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg mb-2">Body Font Size</h3>
            <input
              type="number"
              min={9}
              max={16}
              value={settings.fontSize}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  fontSize: Number(e.target.value),
                }))
              }
              className="border rounded p-2 w-full mb-2"
            />
          </div>

          {/* Header Font Size */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg mb-2">Header Font Size</h3>
            <input
              type="number"
              min={12}
              max={24}
              value={settings.headerFontSize}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  headerFontSize: Number(e.target.value),
                }))
              }
              className="border rounded p-2 w-full mb-2"
            />
          </div>

          {/* Show/Hide Page Numbers */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.showPageNumbers}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  showPageNumbers: e.target.checked,
                }))
              }
            />
            Show Page Numbers
          </label>
        </div>
        <div className="p-0 pb-16 bg-white overflow-y-auto border-l">
          <h2 className="text-2xl font-bold p-6">Preview</h2>
          {isPending ? (
            <p className="text-sm text-gray-500 mb-2">Updating preview...</p>
          ) : (
            <SecurePrintable isAuthenticated={!!user}>
              <ResumeWegpage data={deferredData} settings={settings} />
            </SecurePrintable>
          )}
          <div className="fixed bottom-0 right-0 w-[46%] bg-white border p-4 flex justify-around">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Print
            </button>
          </div>
        </div>
      </div>
      <PrintAuthModal
        open={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
