"use client";

import { useState } from "react";

export default function CreateResumePage() {
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      userId: crypto.randomUUID(),
      title,
      sections: [
        {
          type: "experience",
          content: {
            company: "OpenAI",
            role: experience,
            startDate: "2020-05-01",
            endDate: "2023-08-01",
            description: "Worked on AI-driven applications.",
          },
        },
        {
          type: "skills",
          content: {
            skills: skills.split(",").map((s) => s.trim()),
          },
        },
      ],
    };

    try {
      const res = await fetch("http://localhost:5000/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(`✅ Resume created with ID: ${data._id || data.id}`);
        setExperience("");
        setSkills("");
        setTitle("");
        setTimeout(() => setMessage(""), 5000);
      } else {
        setMessage("❌ Failed to create resume");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error connecting to backend");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Create Resume</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resume Title
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience Role
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills (comma separated)
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            Create Resume
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
