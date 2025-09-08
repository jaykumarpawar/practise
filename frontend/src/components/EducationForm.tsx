"use client";
import React from "react";

interface Education {
  school: string;
  degree: string;
  date: string;
  details: string;
}

interface Props {
  education: Education[];
  setEducation: (education: Education[]) => void;
}

export default function EducationForm({ education, setEducation }: Props) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Education</h3>
      {education.map((edu, idx) => (
        <div key={idx} className="mb-4 border p-3 rounded-lg bg-white">
          {["school", "degree", "date", "details"].map((field) => (
            <input
              key={field}
              value={(edu as any)[field]}
              onChange={(e) => {
                const newEducation = [...education];
                (newEducation[idx] as any)[field] = e.target.value;
                setEducation(newEducation);
              }}
              placeholder={
                field === "school"
                  ? "School / University"
                  : field === "degree"
                  ? "Degree, Major"
                  : field === "date"
                  ? "Graduation Date"
                  : "Additional details"
              }
              className="w-full border rounded-lg p-2 mb-2"
            />
          ))}
          <button
            type="button"
            className="mt-2 text-red-600 text-sm rounded border px-2 py-1"
            onClick={() => setEducation(education.filter((_, i) => i !== idx))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-600 text-white px-3 py-1 rounded-lg"
        onClick={() =>
          setEducation([
            ...education,
            { school: "", degree: "", date: "", details: "" },
          ])
        }
      >
        + Add Education
      </button>
    </div>
  );
}
