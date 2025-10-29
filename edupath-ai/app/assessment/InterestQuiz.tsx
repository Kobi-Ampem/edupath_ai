"use client";

import { useState } from "react";

interface InterestQuizProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

export default function InterestQuiz({
  onComplete,
  onBack,
}: InterestQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which activity would you most enjoy?",
      options: [
        "Analyzing data and solving complex problems",
        "Creating art, music, or writing",
        "Helping others and working with people",
        "Building or fixing things with your hands",
        "Leading teams and making strategic decisions",
      ],
    },
    {
      id: 2,
      question: "What type of work environment appeals to you most?",
      options: [
        "Quiet office with minimal distractions",
        "Creative studio or flexible workspace",
        "Dynamic environment with lots of interaction",
        "Workshop or outdoor setting",
        "Corporate office with meeting rooms",
      ],
    },
    {
      id: 3,
      question: "Which subject would you choose to study in depth?",
      options: [
        "Mathematics or Science",
        "Literature or Fine Arts",
        "Psychology or Social Sciences",
        "Engineering or Technology",
        "Business or Economics",
      ],
    },
    {
      id: 4,
      question: "What motivates you most in your work?",
      options: [
        "Solving challenging problems",
        "Expressing creativity and innovation",
        "Making a positive impact on others",
        "Creating tangible, useful products",
        "Achieving goals and driving success",
      ],
    },
    {
      id: 5,
      question: "Which type of project would excite you most?",
      options: [
        "Research and analysis project",
        "Creative design project",
        "Community service initiative",
        "Technical construction project",
        "Business strategy project",
      ],
    },
    {
      id: 6,
      question: "How do you prefer to learn new things?",
      options: [
        "Through systematic study and practice",
        "Through experimentation and exploration",
        "Through discussion and collaboration",
        "Through hands-on experience",
        "Through case studies and real-world examples",
      ],
    },
    {
      id: 7,
      question: "What type of challenge energizes you?",
      options: [
        "Intellectual puzzles and logic problems",
        "Creative blocks and artistic challenges",
        "Interpersonal conflicts and communication issues",
        "Technical problems and mechanical failures",
        "Strategic planning and decision-making",
      ],
    },
    {
      id: 8,
      question: "Which work schedule appeals to you most?",
      options: [
        "Regular 9-5 with predictable routine",
        "Flexible hours with creative freedom",
        "Variable schedule based on client needs",
        "Project-based with intense work periods",
        "Long hours with high responsibility",
      ],
    },
    {
      id: 9,
      question: "What type of recognition do you value most?",
      options: [
        "Expertise and technical excellence",
        "Creative achievement and innovation",
        "Positive impact on people's lives",
        "Quality craftsmanship and reliability",
        "Leadership and business success",
      ],
    },
    {
      id: 10,
      question: "Which activity would you do in your free time?",
      options: [
        "Read scientific articles or solve puzzles",
        "Visit museums or create art",
        "Volunteer or mentor others",
        "Build or repair things",
        "Network or attend business events",
      ],
    },
    {
      id: 11,
      question: "What type of team role do you naturally take?",
      options: [
        "Technical expert or researcher",
        "Creative director or innovator",
        "Team facilitator or supporter",
        "Problem solver or implementer",
        "Project leader or coordinator",
      ],
    },
    {
      id: 12,
      question: "Which industry trend interests you most?",
      options: [
        "Artificial Intelligence and Machine Learning",
        "Digital Arts and Media",
        "Healthcare and Social Services",
        "Renewable Energy and Sustainability",
        "Fintech and Digital Business",
      ],
    },
    {
      id: 13,
      question: "What type of feedback do you prefer?",
      options: [
        "Detailed technical analysis",
        "Creative critique and suggestions",
        "Personal encouragement and support",
        "Practical improvement tips",
        "Performance metrics and goals",
      ],
    },
    {
      id: 14,
      question: "Which work outcome would satisfy you most?",
      options: [
        "Discovering new knowledge or solutions",
        "Creating something beautiful or meaningful",
        "Improving someone's life or situation",
        "Building something functional and useful",
        "Achieving measurable business results",
      ],
    },
    {
      id: 15,
      question: "What type of professional development interests you?",
      options: [
        "Advanced technical certifications",
        "Creative workshops and masterclasses",
        "Communication and leadership training",
        "Hands-on skill development",
        "Business strategy and management courses",
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
    const categories = {
      analytical: 0,
      creative: 0,
      social: 0,
      practical: 0,
      leadership: 0,
    };

    questions.forEach((_, index) => {
      const answer = answers[index];
      if (answer !== undefined) {
        switch (answer) {
          case 0:
            categories.analytical++;
            break;
          case 1:
            categories.creative++;
            break;
          case 2:
            categories.social++;
            break;
          case 3:
            categories.practical++;
            break;
          case 4:
            categories.leadership++;
            break;
        }
      }
    });

    const totalAnswers = Object.values(answers).length;
    const percentages = Object.fromEntries(
      Object.entries(categories).map(([key, value]) => [
        key,
        totalAnswers > 0 ? Math.round((value / totalAnswers) * 100) : 0,
      ])
    );

    const topCategory = Object.entries(percentages).reduce((a, b) =>
      percentages[a[0]] > percentages[b[0]] ? a : b
    );

    return {
      categories: percentages,
      topCategory: topCategory[0],
      topPercentage: topCategory[1],
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
          Interest Assessment Complete!
        </h2>
        <p className="text-[#16465B]/70">Analyzing your responses...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20 mt-24">
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
            className="bg-gradient-to-r from-[#16465B] to-[#16465B]/80 h-2 rounded-full transition-all duration-300"
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
                  ? "border-[#16465B] bg-[#16465B]/5"
                  : "border-[#16465B]/20 hover:border-[#16465B]/40 hover:bg-[#16465B]/5"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-4 ${
                    currentAnswer === index
                      ? "border-[#16465B] bg-[#16465B]"
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
          className="px-8 py-3 bg-[#16465B] hover:bg-[#16465B]/90 disabled:bg-[#16465B]/50 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1
            ? "Complete Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}
