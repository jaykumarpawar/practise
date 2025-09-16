"use client";

import React from "react";

export interface SkillCategory {
  title: string;
  items: string[];
}

interface SkillsSectionProps {
  skills: SkillCategory[];
  setSkills: (skills: SkillCategory[]) => void;
}

export default function SkillsForm({ skills, setSkills }: SkillsSectionProps) {
  const handleCategoryTitleChange = (catIdx: number, value: string) => {
    const updated = [...skills];
    updated[catIdx].title = value;
    setSkills(updated);
  };

  const handleSkillChange = (
    catIdx: number,
    skillIdx: number,
    value: string
  ) => {
    const updated = [...skills];
    updated[catIdx].items[skillIdx] = value;
    setSkills(updated);
  };

  const addSkill = (catIdx: number) => {
    const updated = [...skills];
    updated[catIdx].items.push("");
    setSkills(updated);
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    const updated = [...skills];
    updated[catIdx].items = updated[catIdx].items.filter(
      (_, i) => i !== skillIdx
    );
    setSkills(updated);
  };

  const addCategory = () => {
    setSkills([...skills, { title: "", items: [""] }]);
  };

  const removeCategory = (catIdx: number) => {
    setSkills(skills.filter((_, i) => i !== catIdx));
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Skills & Interests</h3>

      {skills.map((category, catIdx) => (
        <div key={catIdx} className="mb-4 border p-3 rounded-lg bg-white">
          {/* Category Title */}
          <input
            value={category.title}
            onChange={(e) => handleCategoryTitleChange(catIdx, e.target.value)}
            placeholder="Category Title (e.g. Finance skills)"
            className="w-full border rounded-lg p-2 mb-3 font-semibold"
          />

          {/* Skill Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.items.map((skill, skillIdx) => (
              <div key={skillIdx} className="flex items-center gap-2">
                <input
                  value={skill}
                  onChange={(e) =>
                    handleSkillChange(catIdx, skillIdx, e.target.value)
                  }
                  placeholder={`Skill ${skillIdx + 1}`}
                  className="flex-1 border rounded-lg p-2"
                />
                {skillIdx !== 0 && (
                  <button
                    type="button"
                    className="shrink-0 px-3 py-2 bg-red-500 text-white rounded h-full"
                    onClick={() => removeSkill(catIdx, skillIdx)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Skill Button */}
          <button
            type="button"
            className="mt-3 text-green-600 text-sm rounded-lg border px-2 py-1 ml-2 bg-white hover:bg-green-600 hover:text-white transition-colors duration-300"
            onClick={() => addSkill(catIdx)}
          >
            + Add Skill
          </button>

          {/* Remove Category */}
          {catIdx !== 0 && (
            <button
              type="button"
              className="mt-3 text-red-600 text-sm rounded-lg border px-2 py-1 ml-2 bg-white hover:bg-red-600 hover:text-white transition-colors duration-300"
              onClick={() => removeCategory(catIdx)}
            >
              Remove Category
            </button>
          )}
        </div>
      ))}

      {/* Add Category Button */}
      <button
        type="button"
        className="bg-blue-600 text-white px-3 py-1 rounded-lg"
        onClick={addCategory}
      >
        + Add Skill Category
      </button>
    </div>
  );
}
