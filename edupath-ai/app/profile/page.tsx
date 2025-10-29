"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white/95 py-12">
      <Navbar />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 pt-24">
          <h1 className="text-4xl font-bold text-[#16465B] mb-4">Profile</h1>
          <p className="text-[#16465B]/70 text-lg max-w-2xl mx-auto">
            Please sign up to access your profile and continue with your career
            assessment.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-[#16465B]/20 text-center">
            {/* Icon */}
            <div className="w-24 h-24 bg-[#16465B]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-12 h-12 text-[#16465B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            {/* Message */}
            <h2 className="text-2xl font-bold text-[#16465B] mb-4">
              Sign Up Required
            </h2>
            <p className="text-[#16465B]/70 mb-8 text-lg">
              To access your profile and continue with your career assessment
              journey, please create an account or sign in.
            </p>

            {/* Action Button */}
            <button
              onClick={handleSignUp}
              className="px-8 py-4 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Go to Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
