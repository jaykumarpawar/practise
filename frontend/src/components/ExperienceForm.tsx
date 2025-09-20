"use client";
import React from "react";

interface Experience {
  org: string;
  role: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

interface Props {
  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
}

export default function ExperienceForm({ experiences, setExperiences }: Props) {
  const handleChange = <K extends keyof Experience>(
    idx: number,
    field: K,
    value: Experience[K]
  ) => {
    const updated = [...experiences];
    updated[idx][field] = value;
    setExperiences(updated);
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Experience</h3>

      {experiences.map((exp, idx) => (
        <div key={idx} className="mb-4 border p-4 rounded bg-white space-y-3">
          {/* Organization */}
          <input
            value={exp.org}
            onChange={(e) => handleChange(idx, "org", e.target.value)}
            placeholder="Organization"
            className="w-full border rounded p-2"
          />

          {/* Role / Position */}
          <input
            value={exp.role}
            onChange={(e) => handleChange(idx, "role", e.target.value)}
            placeholder="Role / Position"
            className="w-full border rounded p-2"
          />

          {/* City + State */}
          <div className="grid grid-cols-2 gap-3">
            <input
              value={exp.city}
              onChange={(e) => handleChange(idx, "city", e.target.value)}
              placeholder="City"
              className="w-full border rounded p-2"
            />
            <input
              value={exp.state}
              onChange={(e) => handleChange(idx, "state", e.target.value)}
              placeholder="State"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Start + End Dates */}
          <div className="flex gap-2">
            <input
              type="month"
              value={exp.startDate}
              onChange={(e) => handleChange(idx, "startDate", e.target.value)}
              className="border rounded p-2 flex-1"
            />
            <input
              type="month"
              value={exp.endDate}
              onChange={(e) => handleChange(idx, "endDate", e.target.value)}
              className="border rounded p-2 flex-1"
              disabled={exp.current}
            />
          </div>

          {/* Checkbox for "I currently work here" */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => handleChange(idx, "current", e.target.checked)}
            />
            I currently work here
          </label>

          {/* Bullets */}
          <textarea
            value={exp.bullets.join("\n")}
            onChange={(e) =>
              handleChange(idx, "bullets", e.target.value.split("\n"))
            }
            placeholder="Bullet points (one per line)"
            className="w-full border rounded p-2"
            rows={4}
          />

          {/* Remove Button */}
          {idx !== 0 && (
            <button
              type="button"
              className="mt-2 text-red-600 text-sm rounded border py-1 px-2 bg-white hover:bg-red-600 hover:text-white transition-colors duration-300"
              onClick={() =>
                setExperiences(experiences.filter((_, i) => i !== idx))
              }
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add Experience Button */}
      <button
        type="button"
        className="bg-blue-600 text-white px-3 py-1 rounded mt-3"
        onClick={() =>
          setExperiences([
            ...experiences,
            {
              org: "",
              role: "",
              city: "",
              state: "",
              startDate: "",
              endDate: "",
              current: false,
              bullets: [],
            },
          ])
        }
      >
        + Add Experience
      </button>
    </div>
  );
}
