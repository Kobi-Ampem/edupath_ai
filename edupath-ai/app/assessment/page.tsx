"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import InterestQuiz from "./InterestQuiz";
import PersonalityQuiz from "./PersonalityQuiz";
import SkillsQuiz from "./SkillsQuiz";

type QuizType = "interest" | "personality" | "skills" | null;

export default function Assessment() {
  const searchParams = useSearchParams();
  const career = searchParams.get("career");
  const [currentQuiz, setCurrentQuiz] = useState<QuizType>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<QuizType[]>([]);
  const [quizResults, setQuizResults] = useState<Record<string, any>>({});

  const quizzes = [
    {
      id: "interest",
      title: "Interest Assessment",
      description: "Discover what activities and subjects genuinely excite you",
      icon: "🎯",
      questions: 15,
      duration: "5-7 minutes",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "personality",
      title: "Personality Assessment",
      description: "Understand your work style and communication preferences",
      icon: "🧠",
      questions: 20,
      duration: "7-10 minutes",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "skills",
      title: "Skills Assessment",
      description: "Evaluate your current abilities and identify growth areas",
      icon: "⚡",
      questions: 25,
      duration: "10-15 minutes",
      color: "from-green-500 to-green-600",
    },
  ];

  const handleQuizComplete = (quizType: QuizType, results: any) => {
    setQuizResults((prev) => ({
      ...prev,
      [quizType!]: results,
    }));
    setCompletedQuizzes((prev) => [...prev, quizType!]);
    setCurrentQuiz(null);
  };

  const getProgressPercentage = () => {
    return (completedQuizzes.length / quizzes.length) * 100;
  };

  const allQuizzesCompleted = completedQuizzes.length === quizzes.length;

  if (currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white/95">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {currentQuiz === "interest" && (
              <InterestQuiz
                onComplete={(results) =>
                  handleQuizComplete("interest", results)
                }
                onBack={() => setCurrentQuiz(null)}
              />
            )}
            {currentQuiz === "personality" && (
              <PersonalityQuiz
                onComplete={(results) =>
                  handleQuizComplete("personality", results)
                }
                onBack={() => setCurrentQuiz(null)}
              />
            )}
            {currentQuiz === "skills" && (
              <SkillsQuiz
                onComplete={(results) => handleQuizComplete("skills", results)}
                onBack={() => setCurrentQuiz(null)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (allQuizzesCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white/95">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ResultsPage
              results={quizResults}
              career={career}
              onRetake={() => {
                setCompletedQuizzes([]);
                setQuizResults({});
                setCurrentQuiz(null);
              }}
            />
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
            <h1 className="text-4xl md:text-5xl font-bold text-[#16465B] mb-6 pt-24">
              Career Assessment
            </h1>
            <p className="text-xl text-[#16465B]/80 max-w-3xl mx-auto mb-8">
              Complete our comprehensive assessment to discover your ideal
              career path. Take all three quizzes to get personalized
              recommendations.
            </p>
            {career && (
              <div className="inline-block px-6 py-3 bg-[#16465B]/10 rounded-full">
                <span className="text-[#16465B] font-medium">
                  Focus Area:{" "}
                  {career
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#16465B] font-medium">
                Assessment Progress
              </span>
              <span className="text-[#16465B]/70">
                {completedQuizzes.length} of {quizzes.length} completed
              </span>
            </div>
            <div className="w-full bg-[#16465B]/10 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#16465B] to-[#16465B]/80 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Quiz Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quizzes.map((quiz) => {
              const isCompleted = completedQuizzes.includes(
                quiz.id as QuizType
              );
              const isNext =
                completedQuizzes.length === 0
                  ? quiz.id === "interest"
                  : completedQuizzes.length === 1
                  ? quiz.id === "personality"
                  : completedQuizzes.length === 2
                  ? quiz.id === "skills"
                  : false;

              return (
                <div
                  key={quiz.id}
                  className={`relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:scale-105 ${
                    isCompleted
                      ? "border-green-500/50 bg-green-50/50"
                      : isNext
                      ? "border-[#16465B]/40 cursor-pointer hover:shadow-xl"
                      : "border-[#16465B]/20 cursor-not-allowed opacity-60"
                  }`}
                  onClick={() => isNext && setCurrentQuiz(quiz.id as QuizType)}
                >
                  {isCompleted && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                  )}

                  {isNext && !isCompleted && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-[#16465B] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">→</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <div
                      className={`text-6xl mb-4 ${
                        isCompleted ? "opacity-60" : ""
                      }`}
                    >
                      {quiz.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#16465B] mb-3">
                      {quiz.title}
                    </h3>
                    <p className="text-[#16465B]/70 mb-6 leading-relaxed">
                      {quiz.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm text-[#16465B]/60">
                        <span>Questions:</span>
                        <span>{quiz.questions}</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#16465B]/60">
                        <span>Duration:</span>
                        <span>{quiz.duration}</span>
                      </div>
                    </div>

                    <button
                      disabled={!isNext}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-100 text-green-700 cursor-not-allowed"
                          : isNext
                          ? "bg-[#16465B] hover:bg-[#16465B]/90 text-white hover:scale-105"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isCompleted
                        ? "Completed"
                        : isNext
                        ? "Start Quiz"
                        : "Complete Previous First"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Instructions */}
          <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#16465B]/10">
            <h3 className="text-2xl font-bold text-[#16465B] mb-4 text-center">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#16465B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#16465B] font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-[#16465B] mb-2">
                  Take Quizzes
                </h4>
                <p className="text-[#16465B]/70 text-sm">
                  Complete each assessment honestly. There are no right or wrong
                  answers.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#16465B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#16465B] font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-[#16465B] mb-2">
                  AI Analysis
                </h4>
                <p className="text-[#16465B]/70 text-sm">
                  Our AI analyzes your responses to understand your unique
                  profile.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#16465B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#16465B] font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-[#16465B] mb-2">
                  Get Results
                </h4>
                <p className="text-[#16465B]/70 text-sm">
                  Receive personalized career recommendations and next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Results page component
function ResultsPage({
  results,
  career,
  onRetake,
}: {
  results: any;
  career: string | null;
  onRetake: () => void;
}) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#16465B] mb-4">
          Assessment Complete!
        </h2>
        <p className="text-[#16465B]/70 mb-8">
          Your personalized career recommendations are ready.
        </p>
        <button
          onClick={onRetake}
          className="px-8 py-3 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          Retake Assessment
        </button>
      </div>
    </div>
  );
}
