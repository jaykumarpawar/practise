"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface SkillCategory {
  title: string;
  items: string[];
}

interface SkillsSectionProps {
  skills: SkillCategory[];
  setSkills: (skills: SkillCategory[]) => void;
}

export default function SkillsForm({ skills, setSkills }: SkillsSectionProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = skills.findIndex((_, i) => i.toString() === active.id);
    const newIndex = skills.findIndex((_, i) => i.toString() === over.id);

    setSkills(arrayMove(skills, oldIndex, newIndex));
  };

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
      <h3 className="text-lg font-semibold mb-2">Skills & Interests</h3>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={skills.map((_, i) => i.toString())}
          strategy={verticalListSortingStrategy}
        >
          {skills.map((category, catIdx) => (
            <SortableCategory
              key={catIdx}
              id={catIdx.toString()}
              category={category}
              catIdx={catIdx}
              handleCategoryTitleChange={handleCategoryTitleChange}
              handleSkillChange={handleSkillChange}
              addSkill={addSkill}
              removeSkill={removeSkill}
              removeCategory={removeCategory}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* Add Category Button */}
      <button
        type="button"
        className="bg-blue-600 text-white px-3 py-1 rounded"
        onClick={addCategory}
      >
        + Add Skill Category
      </button>
    </div>
  );
}

function SortableCategory({
  id,
  category,
  catIdx,
  handleCategoryTitleChange,
  handleSkillChange,
  addSkill,
  removeSkill,
  removeCategory,
}: {
  id: string;
  category: SkillCategory;
  catIdx: number;
  handleCategoryTitleChange: (catIdx: number, value: string) => void;
  handleSkillChange: (catIdx: number, skillIdx: number, value: string) => void;
  addSkill: (catIdx: number) => void;
  removeSkill: (catIdx: number, skillIdx: number) => void;
  removeCategory: (catIdx: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-4 border p-3 rounded bg-white shadow-sm"
    >
      {/* Drag Handle */}
      <div className="flex items-center mb-2">
        <div
          {...attributes}
          {...listeners}
          className="w-4 h-6 mr-2 cursor-grab flex flex-col justify-center items-center text-gray-400 hover:text-gray-600"
        >
          {/* Dotted Grip */}
          <div className="h-1 w-1 bg-gray-400 rounded-full mb-1"></div>
          <div className="h-1 w-1 bg-gray-400 rounded-full mb-1"></div>
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
        </div>
        <input
          value={category.title}
          onChange={(e) => handleCategoryTitleChange(catIdx, e.target.value)}
          placeholder="Category Title (e.g. Finance skills)"
          className="flex-1 border rounded p-2 font-semibold"
        />
      </div>

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
              className="flex-1 border rounded p-2"
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
      <div className="flex gap-3">
        <button
          type="button"
          className="mt-3 text-green-600 text-sm rounded border px-2 py-1 bg-white hover:bg-green-600 hover:text-white transition-colors duration-300"
          onClick={() => addSkill(catIdx)}
        >
          + Add Skill
        </button>

        {/* Remove Category Button */}
        {catIdx !== 0 && (
          <button
            type="button"
            className="mt-3 text-red-600 text-sm rounded border px-2 py-1 bg-white hover:bg-red-600 hover:text-white transition-colors duration-300"
            onClick={() => removeCategory(catIdx)}
          >
            Remove Category
          </button>
        )}
      </div>
    </div>
  );
}
