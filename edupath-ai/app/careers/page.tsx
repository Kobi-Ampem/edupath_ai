"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { careerPaths } from "./careerData";

export default function Careers() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(auth === "true");
    };
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("authChange", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const categories = [
    "All",
    "Technology",
    "Healthcare",
    "Business",
    "Creative",
    "Education",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white/95">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#16465B] pt-24">
            Discover Your
            <span className="block bg-gradient-to-r from-[#16465B] to-[#16465B]/70 bg-clip-text text-transparent">
              Career Path
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#16465B]/80 max-w-3xl mx-auto">
            Explore diverse career opportunities and find the perfect path that
            matches your interests, skills, and goals. Let AI guide you toward
            your future.
          </p>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-[#16465B] mb-4">
              Explore Career Paths
            </h2>
            <p className="text-lg text-[#16465B]/80 max-w-3xl mx-auto">
              Browse through various career options and find detailed
              information about each path.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-[#16465B]/10 hover:bg-[#16465B]/20 text-[#16465B] rounded-full font-semibold transition-all duration-300 hover:scale-105 border border-[#16465B]/20"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Career Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((career) => (
              <div
                key={career.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-[#16465B]/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-2">{career.icon}</div>
                  <span className="px-3 py-1 bg-[#16465B]/10 text-[#16465B] rounded-full text-sm font-semibold">
                    {career.category}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-[#16465B] mb-3">
                  {career.title}
                </h3>
                <p className="text-[#16465B]/70 mb-4 leading-relaxed">
                  {career.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#16465B]/60 font-medium">
                      Average Salary:
                    </span>
                    <span className="text-[#16465B] font-semibold">
                      {career.avgSalary}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#16465B]/60 font-medium">
                      Growth:
                    </span>
                    <span className="px-2 py-1 bg-[#16465B]/10 text-[#16465B] rounded-full text-xs font-semibold">
                      {career.growth}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="text-sm">
                    <span className="text-[#16465B]/60 font-medium">
                      Education Path:{" "}
                    </span>
                    <span className="text-[#16465B]">{career.education}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#16465B]/60 font-medium">
                      SHS Path:{" "}
                    </span>
                    <span className="text-[#16465B]">{career.shsPath}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#16465B]/10 mb-4">
                  <h4 className="text-sm font-semibold text-[#16465B] mb-2">
                    Key Subjects:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.keySubjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#16465B]/10 text-[#16465B] rounded-full text-xs"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const slug = career.title
                      .toLowerCase()
                      .replace(/\s*\/\s*/g, "-") // Replace " / " or "/" with single dash
                      .replace(/\s+/g, "-") // Replace spaces with dash
                      .replace(/--+/g, "-") // Replace multiple dashes with single dash
                      .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
                    router.push(`/careers/${slug}`);
                  }}
                  className="mt-4 w-full px-4 py-2 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Only show if not authenticated */}
      {!isAuthenticated && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#16465B]/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-[#16465B]/20">
              <h2 className="text-4xl font-bold text-[#16465B] mb-6">
                Need Personalized Career Guidance?
              </h2>
              <p className="text-lg text-[#16465B]/80 mb-8">
                Our AI-powered career advisor can analyze your interests,
                skills, and goals to recommend the perfect career path for you.
                Sign up to get started with a personalized career assessment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() =>
                    (window.location.href = "/signup?redirect=assessment")
                  }
                  className="px-8 py-4 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Sign Up & Start Assessment
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/login?redirect=assessment")
                  }
                  className="px-8 py-4 text-[#16465B] hover:text-[#16465B]/80 font-semibold text-lg transition-colors duration-300"
                >
                  Already have an account? Sign In
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#16465B]/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#16465B]/70">
            © 2025 EduPath AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
