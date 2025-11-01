"use client";

import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { getCareerBySlug, careerPaths } from "../careerData";

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const career = getCareerBySlug(slug);

  if (!career) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white/95">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 mt-10">
          <div className="max-w-4xl mx-auto text-center mt-10">
            <h1 className="text-4xl font-bold text-[#16465B] mb-4">
              Career Not Found
            </h1>
            <p className="text-[#16465B]/70 mb-8">
              The career path you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push("/careers")}
              className="px-6 py-3 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Back to Careers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white/95">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#16465B]/5 to-transparent">
        <div className="max-w-4xl mx-auto mt-10">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center text-[#16465B]/70 hover:text-[#16465B] transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Careers
          </button>

          <div className="flex items-center space-x-6 mb-8" >
            <div className="text-6xl">{career.icon}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-4 py-2 bg-[#16465B]/10 text-[#16465B] rounded-full text-sm font-semibold">
                  {career.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    career.growth === "Very High"
                      ? "bg-green-100 text-green-700"
                      : career.growth === "High"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {career.growth} Growth
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#16465B] mb-4">
                {career.title}
              </h1>
              <p className="text-xl text-[#16465B]/80 leading-relaxed">
                {career.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Career Outlook */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20">
                <h2 className="text-2xl font-bold text-[#16465B] mb-4 flex items-center">
                  <span className="mr-3">📈</span>
                  Career Outlook
                </h2>
                <p className="text-[#16465B]/80 leading-relaxed">
                  {career.outlook}
                </p>
              </div>

              {/* Education Path */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20">
                <h2 className="text-2xl font-bold text-[#16465B] mb-6 flex items-center">
                  <span className="mr-3">🎓</span>
                  Education Path
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#16465B]/70 mb-2">
                      Senior High School (SHS) Path
                    </h3>
                    <p className="text-[#16465B] font-medium">
                      {career.shsPath}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#16465B]/70 mb-2">
                      Post-SHS Education
                    </h3>
                    <p className="text-[#16465B]">{career.education}</p>
                  </div>
                </div>
              </div>

              {/* Key Subjects */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20">
                <h2 className="text-2xl font-bold text-[#16465B] mb-4 flex items-center">
                  <span className="mr-3">📚</span>
                  Key Subjects
                </h2>
                <div className="flex flex-wrap gap-3">
                  {career.keySubjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#16465B]/10 text-[#16465B] rounded-full text-sm font-medium"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Salary Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#16465B]/20">
                <h3 className="text-lg font-bold text-[#16465B] mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  Salary Range
                </h3>
                <p className="text-[#16465B] font-semibold text-lg">
                  {career.avgSalary}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#16465B]/20">
                <h3 className="text-lg font-bold text-[#16465B] mb-4">
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#16465B]/70 text-sm">Category:</span>
                    <span className="text-[#16465B] font-medium text-sm">
                      {career.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#16465B]/70 text-sm">Growth:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        career.growth === "Very High"
                          ? "bg-green-100 text-green-700"
                          : career.growth === "High"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {career.growth}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#16465B] to-[#16465B]/80 rounded-2xl p-6 shadow-lg text-white">
                <h3 className="text-lg font-bold mb-3">Ready to Start?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Take our assessment to see if this career path matches your
                  interests and skills.
                </p>
                <button
                  onClick={() => {
                    const isAuthenticated =
                      localStorage.getItem("isAuthenticated");
                    if (isAuthenticated) {
                      const careerParam = career.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/\//g, "-");
                      router.push(`/assessment?career=${careerParam}`);
                    } else {
                      const careerParam = career.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/\//g, "-");
                      router.push(
                        `/login?redirect=assessment&career=${careerParam}`
                      );
                    }
                  }}
                  className="w-full px-4 py-3 bg-white text-[#16465B] rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Take Assessment
                </button>
              </div>

              {/* Related Careers */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#16465B]/20">
                <h3 className="text-lg font-bold text-[#16465B] mb-4">
                  Explore More Careers
                </h3>
                <div className="space-y-2">
                  {careerPaths
                    .filter(
                      (c) =>
                        c.id !== career.id && c.category === career.category
                    )
                    .slice(0, 3)
                    .map((relatedCareer) => (
                      <button
                        key={relatedCareer.id}
                        onClick={() => {
                          const slug = relatedCareer.title
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/\//g, "-");
                          router.push(`/careers/${slug}`);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#16465B]/5 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{relatedCareer.icon}</span>
                          <span className="text-[#16465B] text-sm font-medium">
                            {relatedCareer.title}
                          </span>
                        </div>
                      </button>
                    ))}
                  {careerPaths.filter(
                    (c) => c.id !== career.id && c.category === career.category
                  ).length === 0 && (
                    <p className="text-[#16465B]/50 text-sm italic">
                      No related careers in this category
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
