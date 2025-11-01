"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import { careerPaths, CareerPath } from "../careers/careerData";

interface AssessmentResults {
  interest?: {
    categories: {
      analytical: number;
      creative: number;
      social: number;
      practical: number;
      leadership: number;
    };
    topCategory: string;
    topPercentage: number;
  };
  personality?: {
    traits: {
      leadership: number;
      analytical: number;
      supportive: number;
      practical: number;
      strategic: number;
    };
    topTrait: string;
    topPercentage: number;
  };
  skills?: {
    skillCategories: {
      technical: number;
      communication: number;
      leadership: number;
      analytical: number;
      creative: number;
    };
    topSkill: string;
    topPercentage: number;
  };
}

export default function RecommendationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<AssessmentResults>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      window.location.href = `/login?redirect=recommendations`;
    } else {
      setIsCheckingAuth(false);
      // Get results from localStorage or URL params
      const storedResults = localStorage.getItem("assessmentResults");
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      } else {
        // Try to get from URL params
        const resultsParam = searchParams.get("results");
        if (resultsParam) {
          try {
            setResults(JSON.parse(decodeURIComponent(resultsParam)));
          } catch (e) {
            console.error("Failed to parse results", e);
          }
        }
      }
      setIsLoading(false);
    }
  }, [searchParams]);

  const generateRecommendations = () => {
    const recommendations = {
      shsPrograms: [] as Array<{
        program: string;
        score: number;
        reason: string;
      }>,
      careers: [] as Array<{
        career: CareerPath;
        score: number;
        reasons: string[];
      }>,
      insights: [] as string[],
    };

    // Calculate overall profile scores
    const profile = {
      analytical:
        (results.interest?.categories.analytical || 0) * 0.3 +
        (results.personality?.traits.analytical || 0) * 0.3 +
        (results.skills?.skillCategories.analytical || 0) * 0.4,
      creative:
        (results.interest?.categories.creative || 0) * 0.3 +
        (results.skills?.skillCategories.creative || 0) * 0.7,
      social:
        (results.interest?.categories.social || 0) * 0.6 +
        (results.personality?.traits.supportive || 0) * 0.4,
      practical:
        (results.interest?.categories.practical || 0) * 0.4 +
        (results.personality?.traits.practical || 0) * 0.3 +
        (results.skills?.skillCategories.technical || 0) * 0.3,
      leadership:
        (results.interest?.categories.leadership || 0) * 0.3 +
        (results.personality?.traits.leadership || 0) * 0.4 +
        (results.skills?.skillCategories.leadership || 0) * 0.3,
      technical: results.skills?.skillCategories.technical || 0,
      communication: results.skills?.skillCategories.communication || 0,
    };

    // Recommend SHS Programs
    const shsPrograms = [
      {
        name: "General Science",
        score:
          profile.analytical * 0.4 +
          profile.technical * 0.4 +
          profile.practical * 0.2,
        reason:
          "Your strong analytical and technical abilities make Science a great fit.",
      },
      {
        name: "General Arts",
        score:
          profile.creative * 0.3 +
          profile.social * 0.4 +
          profile.communication * 0.3,
        reason:
          "Your creative and social strengths align well with Arts programs.",
      },
      {
        name: "Business",
        score:
          profile.leadership * 0.4 +
          profile.communication * 0.3 +
          profile.analytical * 0.3,
        reason: "Your leadership and analytical skills suit Business programs.",
      },
      {
        name: "Agricultural Science",
        score:
          profile.practical * 0.5 +
          profile.analytical * 0.3 +
          profile.social * 0.2,
        reason:
          "Your practical skills and interest in applied sciences fit Agriculture.",
      },
      {
        name: "Technical",
        score:
          profile.technical * 0.5 +
          profile.practical * 0.4 +
          profile.analytical * 0.1,
        reason:
          "Your technical and practical strengths are ideal for Technical programs.",
      },
      {
        name: "Visual Arts",
        score:
          profile.creative * 0.7 +
          profile.communication * 0.2 +
          profile.practical * 0.1,
        reason:
          "Your strong creative abilities make Visual Arts a perfect match.",
      },
    ];

    recommendations.shsPrograms = shsPrograms
      .map((p) => ({
        program: p.name,
        score: Math.round(p.score),
        reason: p.reason,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Recommend Careers based on profile
    const careerMatches: { [key: string]: string[] } = {
      "Doctor / Nurse": ["social", "analytical", "practical", "supportive"],
      "Software Developer / IT Specialist": [
        "technical",
        "analytical",
        "practical",
        "creative",
      ],
      Teacher: ["social", "communication", "supportive", "creative"],
      Engineer: ["technical", "analytical", "practical", "leadership"],
      "Business Analyst": [
        "analytical",
        "leadership",
        "communication",
        "strategic",
      ],
      Lawyer: ["analytical", "communication", "leadership", "strategic"],
      "Accountant / Auditor": [
        "analytical",
        "practical",
        "technical",
        "strategic",
      ],
      "Marketing Specialist": [
        "creative",
        "communication",
        "leadership",
        "social",
      ],
      "Agricultural Scientist": [
        "practical",
        "analytical",
        "technical",
        "social",
      ],
      Architect: ["creative", "technical", "analytical", "practical"],
    };

    careerPaths.forEach((career) => {
      const matches = careerMatches[career.title] || [];
      let score = 0;
      const reasons: string[] = [];

      matches.forEach((match) => {
        let matchScore = 0;
        if (match === "analytical") matchScore = profile.analytical;
        else if (match === "creative") matchScore = profile.creative;
        else if (match === "social") matchScore = profile.social;
        else if (match === "practical") matchScore = profile.practical;
        else if (match === "leadership") matchScore = profile.leadership;
        else if (match === "technical") matchScore = profile.technical;
        else if (match === "communication") matchScore = profile.communication;
        else if (match === "supportive")
          matchScore = results.personality?.traits.supportive || 0;
        else if (match === "strategic")
          matchScore = results.personality?.traits.strategic || 0;

        score += matchScore * (1 / matches.length);
        if (matchScore > 60) {
          reasons.push(`Strong ${match} skills`);
        }
      });

      if (score > 40) {
        recommendations.careers.push({
          career,
          score: Math.round(score),
          reasons: reasons.length > 0 ? reasons : ["Good overall fit"],
        });
      }
    });

    recommendations.careers = recommendations.careers
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    // Generate insights
    const topInterest = results.interest?.topCategory || "balanced interests";
    const topPersonality = results.personality?.topTrait || "balanced traits";
    const topSkill = results.skills?.topSkill || "balanced skills";

    recommendations.insights.push(
      `Your strongest interest area is ${topInterest}, indicating you're drawn to activities that match this style.`,
      `Your personality profile shows ${topPersonality} as your dominant trait, which influences how you work best.`,
      `Your top skill category is ${topSkill}, showing where you excel and can build your career.`
    );

    if (profile.leadership > 70) {
      recommendations.insights.push(
        "You have strong leadership potential. Consider roles that involve managing teams or leading projects."
      );
    }

    if (profile.technical > 70) {
      recommendations.insights.push(
        "Your technical skills are a major strength. Focus on careers that leverage your technical expertise."
      );
    }

    if (profile.creative > 70) {
      recommendations.insights.push(
        "Your creative abilities are exceptional. Consider careers in design, arts, or innovation."
      );
    }

    return recommendations;
  };

  const recommendations =
    Object.keys(results).length > 0 ? generateRecommendations() : null;

  if (isCheckingAuth || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white/95 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#16465B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#16465B]">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white/95">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#16465B] mb-4">
              No Assessment Results Found
            </h1>
            <p className="text-[#16465B]/70 mb-8">
              Please complete the assessment to see your personalized
              recommendations.
            </p>
            <button
              onClick={() => router.push("/assessment")}
              className="px-8 py-3 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Take Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white/95">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#16465B] to-[#16465B]/80 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-4xl">🎯</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#16465B] mb-4">
              Your Personalized Recommendations
            </h1>
            <p className="text-xl text-[#16465B]/80 max-w-3xl mx-auto">
              Based on your assessment results, we've identified the best SHS
              programs and career paths for you.
            </p>
          </div>

          {/* Insights */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20 mb-8">
            <h2 className="text-2xl font-bold text-[#16465B] mb-6">
              📊 Your Profile Insights
            </h2>
            <div className="space-y-4">
              {recommendations.insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-[#16465B]/5 rounded-lg"
                >
                  <span className="text-[#16465B] mt-1">•</span>
                  <p className="text-[#16465B]/80 flex-1">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SHS Program Recommendations */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20 mb-8">
            <h2 className="text-2xl font-bold text-[#16465B] mb-6">
              📚 Recommended SHS Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.shsPrograms.map((rec, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    index === 0
                      ? "border-[#16465B] bg-[#16465B]/5"
                      : "border-[#16465B]/20 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#16465B]">
                      {rec.program}
                    </h3>
                    {index === 0 && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                        Best Match
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#16465B]/70">
                        Match Score
                      </span>
                      <span className="text-sm font-semibold text-[#16465B]">
                        {rec.score}%
                      </span>
                    </div>
                    <div className="w-full bg-[#16465B]/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#16465B] to-[#16465B]/80 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${rec.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-[#16465B]/70">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Recommendations */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20 mb-8">
            <h2 className="text-2xl font-bold text-[#16465B] mb-6">
              💼 Recommended Career Paths
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.careers.map((rec, index) => {
                const slug = rec.career.title
                  .toLowerCase()
                  .replace(/\s*\/\s*/g, "-")
                  .replace(/\s+/g, "-")
                  .replace(/--+/g, "-")
                  .replace(/^-|-$/g, "");
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                      index === 0
                        ? "border-[#16465B] bg-[#16465B]/5"
                        : "border-[#16465B]/20 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{rec.career.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-[#16465B]">
                            {rec.career.title}
                          </h3>
                          <p className="text-sm text-[#16465B]/60">
                            {rec.career.category}
                          </p>
                        </div>
                      </div>
                      {index === 0 && (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                          Top Match
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[#16465B]/70 mb-4">
                      {rec.career.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[#16465B]/70">
                          Match Score
                        </span>
                        <span className="text-sm font-semibold text-[#16465B]">
                          {rec.score}%
                        </span>
                      </div>
                      <div className="w-full bg-[#16465B]/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#16465B] to-[#16465B]/80 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${rec.score}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-[#16465B]/70 mb-2">
                        Why this fits:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {rec.reasons.map((reason, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-[#16465B]/10 text-[#16465B] rounded-full text-xs"
                          >
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-[#16465B]/60">SHS Path: </span>
                        <span className="text-[#16465B] font-medium">
                          {rec.career.shsPath}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#16465B]/60">Growth: </span>
                        <span className="text-[#16465B] font-medium">
                          {rec.career.growth}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/careers/${slug}`)}
                      className="w-full px-4 py-2 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Learn More
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-[#16465B] to-[#16465B]/90 rounded-2xl p-8 shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-6">🚀 Your Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-4">1️⃣</div>
                <h3 className="font-bold mb-2">Choose Your SHS Program</h3>
                <p className="text-white/90 text-sm">
                  Based on our recommendations, select the SHS program that best
                  aligns with your interests and goals.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-4">2️⃣</div>
                <h3 className="font-bold mb-2">Explore Career Paths</h3>
                <p className="text-white/90 text-sm">
                  Research the recommended careers, understand their
                  requirements, and see if they match your aspirations.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-4">3️⃣</div>
                <h3 className="font-bold mb-2">Plan Your Journey</h3>
                <p className="text-white/90 text-sm">
                  Start planning your educational path from JHS through SHS to
                  tertiary education.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button
              onClick={() => router.push("/assessment")}
              className="px-8 py-3 bg-white border-2 border-[#16465B] text-[#16465B] rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-[#16465B]/5"
            >
              Retake Assessment
            </button>
            <button
              onClick={() => router.push("/careers")}
              className="px-8 py-3 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Explore All Careers
            </button>
            <button
              onClick={() => router.push("/chat")}
              className="px-8 py-3 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Chat with Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
