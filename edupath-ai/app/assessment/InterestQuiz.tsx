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
      question: "🎯 Which activity do you enjoy most?",
      options: [
        "🧮 Solving math problems and doing experiments",
        "🎨 Drawing, painting, or writing stories",
        "👥 Helping friends with their schoolwork",
        "🔧 Building things or fixing broken items",
        "📋 Organizing group projects and leading discussions",
      ],
    },
    {
      id: 2,
      question: "🏫 What kind of learning space do you prefer?",
      options: [
        "📚 Quiet classroom where I can focus",
        "🎭 Art room or creative space",
        "👨‍👩‍👧‍👦 Learning with friends in groups",
        "🔬 Science lab or workshop",
        "💼 Classroom with presentations and debates",
      ],
    },
    {
      id: 3,
      question: "📖 Which subject do you like studying most?",
      options: [
        "🔬 Integrated Science or Mathematics",
        "📝 English Language or Creative Arts",
        "🌍 Social Studies or Religious Studies",
        "⚙️ Pre-Technical Skills or ICT",
        "💼 Business Studies or Economics",
      ],
    },
    {
      id: 4,
      question: "💪 What makes you feel most proud?",
      options: [
        "✨ Getting a difficult problem right",
        "🎨 Creating something beautiful or original",
        "😊 Making someone else happy or helping them",
        "🛠️ Fixing or building something that works",
        "🏆 Winning a competition or achieving a goal",
      ],
    },
    {
      id: 5,
      question: "📝 Which school project would you choose?",
      options: [
        "🔬 Science fair experiment",
        "🎨 Art exhibition or creative writing",
        "🤝 Community service project",
        "⚙️ Building a model or prototype",
        "📊 Planning a school event or business",
      ],
    },
    {
      id: 6,
      question: "📚 How do you like to learn best?",
      options: [
        "📖 Reading textbooks and practicing exercises",
        "🎨 Trying new creative projects",
        "👥 Studying with friends and discussing",
        "🔧 Learning by doing hands-on activities",
        "📈 Looking at real examples and case studies",
      ],
    },
    {
      id: 7,
      question: "🧩 What type of challenge do you enjoy?",
      options: [
        "🧮 Difficult math or logic puzzles",
        "🎨 Creating something from scratch",
        "💬 Talking to people and solving conflicts",
        "🔧 Fixing something that's broken",
        "📋 Planning and organizing activities",
      ],
    },
    {
      id: 8,
      question: "⏰ How do you prefer to spend your day?",
      options: [
        "📅 Following a regular schedule",
        "🎨 Having time for creative activities",
        "👥 Being around people and socializing",
        "🔨 Working on practical projects",
        "💼 Taking on responsibilities and challenges",
      ],
    },
    {
      id: 9,
      question: "🏅 What kind of praise means most to you?",
      options: [
        "⭐ Being called smart or clever",
        "🎨 Being praised for creativity",
        "❤️ Being thanked for helping someone",
        "🔧 Being appreciated for making something useful",
        "👑 Being recognized as a leader",
      ],
    },
    {
      id: 10,
      question: "🆓 What do you do after school?",
      options: [
        "📚 Read books or solve puzzles",
        "🎨 Draw, paint, or write",
        "👥 Help at home or volunteer",
        "🔧 Build models or repair things",
        "📱 Organize events or join clubs",
      ],
    },
    {
      id: 11,
      question: "👥 In group work, what role do you take?",
      options: [
        "🔬 The one who finds the answers",
        "🎨 The one with creative ideas",
        "🤝 The one who helps everyone get along",
        "🛠️ The one who builds or makes things",
        "👔 The one who leads and coordinates",
      ],
    },
    {
      id: 12,
      question: "🌍 What future topic interests you most?",
      options: [
        "🤖 Technology and computers",
        "🎬 Media and creative arts",
        "🏥 Healthcare and helping people",
        "🌱 Agriculture and the environment",
        "💼 Business and entrepreneurship",
      ],
    },
    {
      id: 13,
      question: "💬 What type of feedback helps you?",
      options: [
        "📊 Detailed explanations of right and wrong",
        "💡 Ideas for making things more creative",
        "💚 Encouragement and support",
        "🔧 Tips on how to improve practically",
        "📈 Clear goals and achievements",
      ],
    },
    {
      id: 14,
      question: "🎯 What would make you most satisfied?",
      options: [
        "🔍 Discovering how something works",
        "🎨 Making something beautiful or special",
        "😊 Knowing you helped someone",
        "🔨 Creating something people can use",
        "🏆 Reaching a goal or winning",
      ],
    },
    {
      id: 15,
      question: "📈 What skill would you like to develop?",
      options: [
        "🔬 Advanced science or math skills",
        "🎨 Creative talents and art skills",
        "💬 Communication and helping skills",
        "🔧 Practical hands-on skills",
        "👔 Leadership and planning skills",
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
