"use client";
import React from "react";

interface Education {
  school: string;
  degree: string;
  date: string;
  city: string;
  state: string;
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
        <div key={idx} className="mb-4 border p-4 rounded bg-white space-y-3">
          {/* School / Degree */}
          <input
            value={edu.school}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[idx].school = e.target.value;
              setEducation(newEducation);
            }}
            placeholder="School / University"
            className="w-full border rounded p-2"
          />
          <input
            value={edu.degree}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[idx].degree = e.target.value;
              setEducation(newEducation);
            }}
            placeholder="Degree, Major"
            className="w-full border rounded p-2"
          />

          {/* City + State (side by side) */}
          <div className="grid grid-cols-2 gap-3">
            <input
              value={edu.city}
              onChange={(e) => {
                const newEducation = [...education];
                newEducation[idx].city = e.target.value;
                setEducation(newEducation);
              }}
              placeholder="City"
              className="w-full border rounded p-2"
            />
            <input
              value={edu.state}
              onChange={(e) => {
                const newEducation = [...education];
                newEducation[idx].state = e.target.value;
                setEducation(newEducation);
              }}
              placeholder="State"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Graduation Date */}
          <input
            value={edu.date}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[idx].date = e.target.value;
              setEducation(newEducation);
            }}
            placeholder="Graduation Date"
            className="w-full border rounded p-2"
          />

          {/* Additional Details */}
          <textarea
            value={edu.details}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[idx].details = e.target.value;
              setEducation(newEducation);
            }}
            placeholder="Additional details"
            className="w-full border rounded p-2"
            rows={2}
          />

          {/* Remove Button */}
          {idx !== 0 && (
            <button
              type="button"
              className="mt-2 text-red-600 text-sm rounded border py-1 px-2 bg-white hover:bg-red-600 hover:text-white transition-colors duration-300"
              onClick={() =>
                setEducation(education.filter((_, i) => i !== idx))
              }
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add Education Button */}
      <button
        type="button"
        className="bg-blue-600 text-white px-3 py-1 rounded mt-3"
        onClick={() =>
          setEducation([
            ...education,
            {
              school: "",
              degree: "",
              date: "",
              city: "",
              state: "",
              details: "",
            },
          ])
        }
      >
        + Add Education
      </button>
    </div>
  );
}
