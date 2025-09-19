"use client";

import { useState } from "react";
import { loginPopup } from "@/utils/auth";

interface PrintAuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export default function PrintAuthModal({
  open,
  onClose,
  onAuthSuccess,
}: PrintAuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleAuthAndPrint = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await loginPopup();
      if (user) {
        onAuthSuccess(user);
        onClose(); // close modal
        setTimeout(() => window.print(), 300); // small delay for modal close animation
      }
    } catch (e) {
      console.error("Auth failed", e);
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Please log in to continue
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          To print your resume, please authenticate with your email.
        </p>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAuthAndPrint}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Log In & Print"}
          </button>
        </div>
      </div>
    </div>
  );
}
