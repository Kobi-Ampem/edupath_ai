"use client";

import { useState } from "react";

interface PersonalityQuizProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

export default function PersonalityQuiz({
  onComplete,
  onBack,
}: PersonalityQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "In group settings, you typically:",
      options: [
        "Take charge and direct the conversation",
        "Listen more than you speak",
        "Facilitate discussion and ensure everyone participates",
        "Focus on the task at hand",
        "Adapt your style based on the group dynamic",
      ],
    },
    {
      id: 2,
      question: "When facing a deadline, you:",
      options: [
        "Work best under pressure and thrive in the rush",
        "Prefer to plan ahead and work steadily",
        "Collaborate with others to meet the goal",
        "Focus intensely and work in long stretches",
        "Break it down into manageable chunks",
      ],
    },
    {
      id: 3,
      question: "Your ideal work communication style is:",
      options: [
        "Direct and to the point",
        "Detailed and comprehensive",
        "Encouraging and supportive",
        "Technical and precise",
        "Strategic and forward-thinking",
      ],
    },
    {
      id: 4,
      question: "When making decisions, you:",
      options: [
        "Trust your instincts and act quickly",
        "Analyze all available data thoroughly",
        "Seek input from others before deciding",
        "Consider practical implications carefully",
        "Evaluate long-term consequences",
      ],
    },
    {
      id: 5,
      question: "In conflict situations, you:",
      options: [
        "Address issues head-on and directly",
        "Avoid confrontation and seek harmony",
        "Mediate and find common ground",
        "Focus on facts and logical solutions",
        "Step back and assess the bigger picture",
      ],
    },
    {
      id: 6,
      question: "Your energy comes from:",
      options: [
        "Being around people and social interaction",
        "Quiet reflection and independent work",
        "Helping others and making a difference",
        "Solving problems and creating solutions",
        "Leading projects and driving change",
      ],
    },
    {
      id: 7,
      question: "When learning something new, you:",
      options: [
        "Jump in and learn through doing",
        "Study the theory first, then practice",
        "Learn best with others in a group",
        "Focus on practical applications",
        "Look for patterns and connections",
      ],
    },
    {
      id: 8,
      question: "Your approach to risk is:",
      options: [
        "Embrace calculated risks and new opportunities",
        "Prefer stability and predictable outcomes",
        "Consider how risks affect others",
        "Evaluate risks based on data and evidence",
        "Take strategic risks with clear benefits",
      ],
    },
    {
      id: 9,
      question: "In team projects, you naturally:",
      options: [
        "Take on leadership roles",
        "Provide technical expertise",
        "Support and encourage team members",
        "Focus on quality and attention to detail",
        "Coordinate and organize the work",
      ],
    },
    {
      id: 10,
      question: "Your response to change is:",
      options: [
        "Excited and energized by new possibilities",
        "Cautious and prefer gradual transitions",
        "Concerned about how it affects others",
        "Focused on understanding the technical details",
        "Strategic about adapting and positioning",
      ],
    },
    {
      id: 11,
      question: "When giving feedback, you:",
      options: [
        "Be direct and honest, even if it's tough",
        "Be diplomatic and considerate of feelings",
        "Focus on encouragement and improvement",
        "Provide specific, actionable information",
        "Frame it in terms of goals and outcomes",
      ],
    },
    {
      id: 12,
      question: "Your work style is:",
      options: [
        "Fast-paced and action-oriented",
        "Methodical and detail-focused",
        "Collaborative and relationship-oriented",
        "Independent and task-focused",
        "Strategic and results-oriented",
      ],
    },
    {
      id: 13,
      question: "When stressed, you:",
      options: [
        "Become more assertive and take control",
        "Withdraw and need time alone",
        "Seek support from others",
        "Focus intensely on solving the problem",
        "Step back and reassess the situation",
      ],
    },
    {
      id: 14,
      question: "Your ideal work environment includes:",
      options: [
        "Dynamic, fast-changing atmosphere",
        "Quiet, structured environment",
        "Supportive, team-oriented culture",
        "Technical, problem-solving focus",
        "Strategic, goal-oriented setting",
      ],
    },
    {
      id: 15,
      question: "When presenting ideas, you:",
      options: [
        "Be confident and persuasive",
        "Provide thorough documentation and evidence",
        "Focus on how it benefits everyone",
        "Present clear, logical arguments",
        "Frame it in terms of strategic value",
      ],
    },
    {
      id: 16,
      question: "Your approach to problem-solving is:",
      options: [
        "Quick decisions and immediate action",
        "Thorough analysis before acting",
        "Collaborative brainstorming and discussion",
        "Systematic investigation and testing",
        "Strategic planning and implementation",
      ],
    },
    {
      id: 17,
      question: "In meetings, you typically:",
      options: [
        "Lead discussions and drive decisions",
        "Listen carefully and contribute when needed",
        "Ensure everyone's voice is heard",
        "Focus on technical details and accuracy",
        "Provide strategic insights and direction",
      ],
    },
    {
      id: 18,
      question: "Your motivation comes from:",
      options: [
        "Achieving goals and winning",
        "Mastering skills and expertise",
        "Helping others succeed",
        "Creating quality work and solutions",
        "Driving innovation and change",
      ],
    },
    {
      id: 19,
      question: "When working with difficult people, you:",
      options: [
        "Address the issue directly and assertively",
        "Try to understand their perspective",
        "Focus on finding common ground",
        "Stick to facts and avoid emotions",
        "Look for underlying causes and solutions",
      ],
    },
    {
      id: 20,
      question: "Your ideal role would involve:",
      options: [
        "Leading teams and driving results",
        "Providing expertise and technical knowledge",
        "Supporting and developing others",
        "Creating and implementing solutions",
        "Planning and executing strategies",
      ],
    },
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate results
      const results = calculateResults();
      setIsCompleted(true);
      setTimeout(() => onComplete(results), 1000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateResults = () => {
    const traits = {
      leadership: 0,
      analytical: 0,
      supportive: 0,
      practical: 0,
      strategic: 0,
    };

    questions.forEach((_, index) => {
      const answer = answers[index];
      if (answer !== undefined) {
        switch (answer) {
          case 0:
            traits.leadership++;
            break;
          case 1:
            traits.analytical++;
            break;
          case 2:
            traits.supportive++;
            break;
          case 3:
            traits.practical++;
            break;
          case 4:
            traits.strategic++;
            break;
        }
      }
    });

    const totalAnswers = Object.values(answers).length;
    const percentages = Object.fromEntries(
      Object.entries(traits).map(([key, value]) => [
        key,
        totalAnswers > 0 ? Math.round((value / totalAnswers) * 100) : 0,
      ])
    );

    const topTrait = Object.entries(percentages).reduce((a, b) =>
      percentages[a[0]] > percentages[b[0]] ? a : b
    );

    return {
      traits: percentages,
      topTrait: topTrait[0],
      topPercentage: topTrait[1],
      totalQuestions: questions.length,
      answeredQuestions: totalAnswers,
    };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  if (isCompleted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="text-3xl font-bold text-[#16465B] mb-4">
          Personality Assessment Complete!
        </h2>
        <p className="text-[#16465B]/70">
          Analyzing your personality profile...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-[#16465B]/70 hover:text-[#16465B] transition-colors"
        >
          <span className="mr-2">←</span>
          Back to Assessment
        </button>
        <div className="text-sm text-[#16465B]/70">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-[#16465B]/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#30A2B4] to-[#30A2B4]/80 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#16465B] mb-6">
          {questions[currentQuestion].question}
        </h2>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(currentQuestion, index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                currentAnswer === index
                  ? "border-[#30A2B4] bg-[#30A2B4]/10"
                  : "border-[#16465B]/20 hover:border-[#30A2B4]/60 hover:bg-[#30A2B4]/5"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-4 ${
                    currentAnswer === index
                      ? "border-[#30A2B4] bg-[#30A2B4]"
                      : "border-[#16465B]/40"
                  }`}
                >
                  {currentAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="text-[#16465B] font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 text-[#16465B]/70 hover:text-[#16465B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentAnswer === undefined}
          className="px-8 py-3 bg-[#30A2B4] hover:bg-[#30A2B4]/90 disabled:bg-[#30A2B4]/50 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1
            ? "Complete Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}
