// frontend/app/resume-builder/page.tsx
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { debounce } from "lodash";
import ResumeDocument from "@/components/ResumeDocument";
import { useDebounce } from "../hooks/useDebounce";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    // Header
    name: "",
    address: "",
    email: "",
    phone: "",

    // Education
    education: [{ school: "", degree: "", date: "", details: "" }],

    // Experience
    expOrg: "",
    expRole: "",
    expDate: "",
    expBullets: [] as string[],

    // Skills
    skills: "",
  });

  // Create the debounced function only once (empty dependency array)
  const debouncedHandleChange = debounce((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, 300);

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedHandleChange.cancel();
    };
  }, [debouncedHandleChange]);

  // Use a simple non-debounced event handler to extract the input values
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // instant typing
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // only the preview is delayed
  const debouncedFormData = useDebounce(formData, 1500);

  const handleBulletChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: "expBullets" | "leadBullets"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value.split("\n"),
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Left - Form */}
      <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Resume Form</h2>

        <form className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Header</h3>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-lg p-2 mb-2"
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border rounded-lg p-2 mb-2"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-lg p-2 mb-2"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Education */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Education</h3>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="mb-4 border p-3 rounded-lg bg-white">
                <input
                  name="school"
                  value={edu.school}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[idx].school = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      education: newEducation,
                    }));
                  }}
                  placeholder="School / University"
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[idx].degree = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      education: newEducation,
                    }));
                  }}
                  placeholder="Degree, Major"
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  name="date"
                  value={edu.date}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[idx].date = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      education: newEducation,
                    }));
                  }}
                  placeholder="Graduation Date"
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  name="details"
                  value={edu.details}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[idx].details = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      education: newEducation,
                    }));
                  }}
                  placeholder="Additional details"
                  className="w-full border rounded-lg p-2"
                />
                <button
                  type="button"
                  className="mt-2 text-red-600 text-sm"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      education: prev.education.filter((_, i) => i !== idx),
                    }));
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-600 text-white px-3 py-1 rounded-lg"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  education: [
                    ...prev.education,
                    { school: "", degree: "", date: "", details: "" },
                  ],
                }))
              }
            >
              + Add Education
            </button>
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Experience</h3>
            <input
              name="expOrg"
              value={formData.expOrg}
              onChange={handleChange}
              placeholder="Organization"
              className="w-full border rounded-lg p-2 mb-2"
            />
            <input
              name="expRole"
              value={formData.expRole}
              onChange={handleChange}
              placeholder="Role / Position"
              className="w-full border rounded-lg p-2 mb-2"
            />
            <input
              name="expDate"
              value={formData.expDate}
              onChange={handleChange}
              placeholder="Date (e.g. Jan 2020 – Dec 2021)"
              className="w-full border rounded-lg p-2 mb-2"
            />
            <textarea
              value={formData.expBullets.join("\n")}
              onChange={(e) => handleBulletChange(e, "expBullets")}
              placeholder="Bullet points (one per line)"
              className="w-full border rounded-lg p-2"
              rows={4}
            />
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Skills & Interests</h3>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="E.g. Technical: React, NestJS • Languages: English, Spanish • Interests: Hiking"
              className="w-full border rounded-lg p-2"
              rows={2}
            />
          </div>
        </form>
      </div>

      {/* Right - PDF Preview */}
      <div className="w-1/2 p-6 bg-white overflow-y-auto border-l">
        <h2 className="text-2xl font-bold mb-4">Live PDF Preview</h2>
        <PDFViewer className="w-full h-[90%] border rounded-lg">
          <ResumeDocument data={debouncedFormData} />
        </PDFViewer>
      </div>
    </div>
  );
}
