"use client";

import { useState } from "react";

interface SkillsQuizProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

export default function SkillsQuiz({ onComplete, onBack }: SkillsQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "💻 How good are you with computers and phones?",
      options: [
        "😅 I'm just learning the basics",
        "😊 I can use apps and websites",
        "😃 I can fix simple computer problems",
        "🤓 I'm really good with technology",
        "🚀 I can program or build apps",
      ],
    },
    {
      id: 2,
      question: "📊 How do you handle information and data?",
      options: [
        "😕 I find numbers confusing",
        "😊 I can understand basic charts",
        "😃 I can organize and compare information",
        "🤓 I like analyzing data and finding patterns",
        "🚀 I can create reports and see trends",
      ],
    },
    {
      id: 3,
      question: "🗣️ How do you feel about speaking in front of the class?",
      options: [
        "😰 I really don't like it",
        "😟 I get nervous but can do it",
        "😐 I'm okay if I prepare well",
        "😊 I'm comfortable speaking",
        "😃 I love presenting and talking",
      ],
    },
    {
      id: 4,
      question: "📋 How good are you at organizing projects?",
      options: [
        "😕 I struggle to organize things",
        "😊 I can organize my homework",
        "😃 I can plan group projects",
        "🤓 I'm good at planning activities",
        "🚀 I can lead big projects",
      ],
    },
    {
      id: 5,
      question: "✍️ How would you rate your writing?",
      options: [
        "😕 I find writing difficult",
        "😊 I can write simple essays",
        "😃 I write clearly and well",
        "🤓 I can write persuasively",
        "🚀 I'm excellent at all types of writing",
      ],
    },
    {
      id: 6,
      question: "🎨 How good are you at drawing or designing?",
      options: [
        "😕 I'm not very artistic",
        "😊 I can draw simple things",
        "😃 I enjoy drawing and design",
        "🤓 I'm good at creative projects",
        "🚀 I'm very talented in art and design",
      ],
    },
    {
      id: 7,
      question: "🧩 How do you handle difficult problems?",
      options: [
        "😕 I find them too hard",
        "😊 I can solve them with help",
        "😃 I can solve most problems myself",
        "🤓 I'm really good at problem-solving",
        "🚀 I love complex challenges",
      ],
    },
    {
      id: 8,
      question: "💬 How good are you at helping others?",
      options: [
        "😕 I'm not very good at it",
        "😊 I try to help when I can",
        "😃 I help friends regularly",
        "🤓 I'm known for helping others",
        "🚀 Helping others is my strength",
      ],
    },
    {
      id: 9,
      question: "📱 How quickly do you learn to use new technology?",
      options: [
        "😕 I prefer things I know",
        "😟 I need lots of help",
        "😐 I learn with practice",
        "😊 I pick up new tech easily",
        "🚀 I master new tech quickly",
      ],
    },
    {
      id: 10,
      question: "💰 How comfortable are you talking about money or business?",
      options: [
        "😕 I avoid business topics",
        "😊 I understand basic money",
        "😃 I can discuss simple business",
        "🤓 I enjoy business and finance",
        "🚀 I'm very interested in business",
      ],
    },
    {
      id: 11,
      question: "🔍 How good are you at researching topics?",
      options: [
        "😕 I just search online",
        "😊 I can find good information",
        "😃 I research topics thoroughly",
        "🤓 I'm excellent at research",
        "🚀 I can lead research projects",
      ],
    },
    {
      id: 12,
      question: "👥 How good are you at leading groups?",
      options: [
        "😕 I haven't led groups",
        "😊 I've led small groups sometimes",
        "😃 I often lead group activities",
        "🤓 I'm a natural leader",
        "🚀 Leading is one of my strengths",
      ],
    },
    {
      id: 13,
      question: "🔬 How good are you at analyzing and thinking deeply?",
      options: [
        "😕 I find analysis difficult",
        "😊 I can analyze with help",
        "😃 I analyze things well",
        "🤓 I'm very analytical",
        "🚀 I excel at complex analysis",
      ],
    },
    {
      id: 14,
      question: "📢 How good are you at sharing ideas and communicating?",
      options: [
        "😕 I'm not very good at it",
        "😊 I can share basic ideas",
        "😃 I communicate clearly",
        "🤓 I'm great at explaining things",
        "🚀 Communication is my strength",
      ],
    },
    {
      id: 15,
      question: "💵 How comfortable are you with money and budgeting?",
      options: [
        "😕 I avoid money matters",
        "😊 I understand saving",
        "😃 I can budget my pocket money",
        "🤓 I'm good with finances",
        "🚀 I love financial planning",
      ],
    },
    {
      id: 16,
      question: "👨‍🏫 How good are you at teaching or helping others learn?",
      options: [
        "😕 I haven't taught others",
        "😊 I help friends sometimes",
        "😃 I often help others learn",
        "🤓 I'm good at explaining things",
        "🚀 Teaching is something I enjoy",
      ],
    },
    {
      id: 17,
      question: "🤝 How good are you at negotiating or convincing others?",
      options: [
        "😕 I avoid these situations",
        "😊 I can convince with preparation",
        "😃 I'm good at persuading",
        "🤓 I excel at negotiations",
        "🚀 I'm excellent at convincing others",
      ],
    },
    {
      id: 18,
      question: "✅ How careful are you about checking your work?",
      options: [
        "😕 I often miss mistakes",
        "😊 I check sometimes",
        "😃 I usually check my work",
        "🤓 I'm very careful and thorough",
        "🚀 Quality checking is important to me",
      ],
    },
    {
      id: 19,
      question: "📈 How good are you at planning for the future?",
      options: [
        "😕 I prefer to take things as they come",
        "😊 I can plan a little ahead",
        "😃 I'm good at planning",
        "🤓 I plan things carefully",
        "🚀 Strategic planning is my strength",
      ],
    },
    {
      id: 20,
      question:
        "🌍 How interested are you in working with people from other countries?",
      options: [
        "😕 I haven't thought about it",
        "😊 It might be interesting",
        "😃 I'd like to try it",
        "🤓 I'm interested in international work",
        "🚀 I'm very interested in global opportunities",
      ],
    },
    {
      id: 21,
      question: "⏰ How good are you at managing your time?",
      options: [
        "😕 I often run out of time",
        "😊 I manage time with effort",
        "😃 I usually finish on time",
        "🤓 I'm good at time management",
        "🚀 I excel at organizing my time",
      ],
    },
    {
      id: 22,
      question: "📱 How good are you at using social media and digital tools?",
      options: [
        "😕 I use basic apps only",
        "😊 I use social media regularly",
        "😃 I'm good with digital tools",
        "🤓 I create digital content",
        "🚀 I'm excellent with digital marketing",
      ],
    },
    {
      id: 23,
      question: "📝 How good are you at writing instructions or guides?",
      options: [
        "😕 I find it difficult",
        "😊 I can write basic instructions",
        "😃 I can write clear guides",
        "🤓 I write detailed instructions well",
        "🚀 I'm excellent at technical writing",
      ],
    },
    {
      id: 24,
      question: "🔄 How good are you at improving how things are done?",
      options: [
        "😕 I don't think about it much",
        "😊 I make small improvements",
        "😃 I find better ways to do things",
        "🤓 I'm good at improving processes",
        "🚀 I excel at making systems better",
      ],
    },
    {
      id: 25,
      question: "🔄 How well do you handle changes?",
      options: [
        "😕 I struggle with change",
        "😊 I adapt with support",
        "😃 I handle changes well",
        "🤓 I thrive when things change",
        "🚀 I lead others through change",
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
    const skillCategories = {
      technical: 0,
      communication: 0,
      leadership: 0,
      analytical: 0,
      creative: 0,
    };

    // Map questions to skill categories
    const questionCategories = [
      0, // programming
      1, // data analysis
      2, // public speaking
      3, // project management
      4, // writing
      5, // design
      6, // problem-solving
      7, // customer service
      8, // learning technology
      9, // sales
      10, // research
      11, // team leadership
      12, // analytical thinking
      13, // marketing
      14, // financial analysis
      15, // training
      16, // negotiation
      17, // quality assurance
      18, // strategic planning
      19, // international business
      20, // time management
      21, // digital marketing
      22, // technical documentation
      23, // process improvement
      24, // adaptability
    ];

    questions.forEach((_, index) => {
      const answer = answers[index];
      if (answer !== undefined) {
        const categoryIndex = questionCategories[index];
        const skillLevel = answer + 1; // Convert 0-4 to 1-5

        switch (categoryIndex) {
          case 0:
          case 1:
          case 5:
          case 6:
          case 8:
          case 10:
          case 12:
          case 14:
          case 17:
          case 22:
          case 23:
            skillCategories.technical += skillLevel;
            break;
          case 2:
          case 4:
          case 7:
          case 13:
          case 15:
          case 16:
          case 21:
            skillCategories.communication += skillLevel;
            break;
          case 3:
          case 11:
          case 18:
          case 20:
          case 24:
            skillCategories.leadership += skillLevel;
            break;
          case 6:
          case 10:
          case 12:
          case 14:
          case 18:
          case 23:
            skillCategories.analytical += skillLevel;
            break;
          case 5:
          case 6:
          case 8:
          case 10:
          case 13:
          case 21:
          case 24:
            skillCategories.creative += skillLevel;
            break;
        }
      }
    });

    // Calculate average scores for each category
    const categoryCounts = {
      technical: 12,
      communication: 7,
      leadership: 5,
      analytical: 6,
      creative: 7,
    };

    const averages = Object.fromEntries(
      Object.entries(skillCategories).map(([key, value]) => [
        key,
        categoryCounts[key as keyof typeof categoryCounts] > 0
          ? Math.round(
              (value / categoryCounts[key as keyof typeof categoryCounts]) * 20
            ) // Convert to percentage
          : 0,
      ])
    );

    const topSkill = Object.entries(averages).reduce((a, b) =>
      averages[a[0] as keyof typeof averages] >
      averages[b[0] as keyof typeof averages]
        ? a
        : b
    );

    return {
      skillCategories: averages,
      topSkill: topSkill[0],
      topPercentage: topSkill[1],
      totalQuestions: questions.length,
      answeredQuestions: Object.values(answers).length,
    };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  if (isCompleted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-[#41D3DC] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="text-3xl font-bold text-[#16465B] mb-4">
          Skills Assessment Complete!
        </h2>
        <p className="text-[#16465B]/70">Analyzing your skill profile...</p>
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
            className="bg-gradient-to-r from-[#41D3DC] to-[#41D3DC]/80 h-2 rounded-full transition-all duration-300"
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
                  ? "border-[#41D3DC] bg-[#41D3DC]/10"
                  : "border-[#16465B]/20 hover:border-[#41D3DC]/60 hover:bg-[#41D3DC]/5"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-4 ${
                    currentAnswer === index
                      ? "border-[#41D3DC] bg-[#41D3DC]"
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
          className="px-8 py-3 bg-[#41D3DC] hover:bg-[#41D3DC]/90 disabled:bg-[#41D3DC]/50 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1
            ? "Complete Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}
