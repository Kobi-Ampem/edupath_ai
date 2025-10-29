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
      question: "How would you rate your programming/coding skills?",
      options: [
        "Beginner - I have little to no experience",
        "Novice - I can write basic code with help",
        "Intermediate - I can work independently on most tasks",
        "Advanced - I can solve complex problems and mentor others",
        "Expert - I can design systems and lead technical teams",
      ],
    },
    {
      id: 2,
      question: "Your experience with data analysis is:",
      options: [
        "None - I haven't worked with data analysis",
        "Basic - I can use simple tools like Excel",
        "Intermediate - I can use advanced tools and create reports",
        "Advanced - I can build models and derive insights",
        "Expert - I can design data strategies and lead analytics teams",
      ],
    },
    {
      id: 3,
      question: "How comfortable are you with public speaking?",
      options: [
        "Very uncomfortable - I avoid it whenever possible",
        "Somewhat uncomfortable - I can do it with preparation",
        "Neutral - I'm okay with it in familiar settings",
        "Comfortable - I can speak to groups confidently",
        "Very comfortable - I enjoy and excel at public speaking",
      ],
    },
    {
      id: 4,
      question: "Your project management experience:",
      options: [
        "None - I haven't managed projects",
        "Limited - I've coordinated small tasks",
        "Moderate - I've led small to medium projects",
        "Extensive - I've managed large, complex projects",
        "Expert - I've led enterprise-level initiatives",
      ],
    },
    {
      id: 5,
      question: "How would you describe your writing skills?",
      options: [
        "Basic - I can write simple documents",
        "Good - I can write clearly for most purposes",
        "Strong - I can write persuasively and professionally",
        "Advanced - I can write for various audiences and formats",
        "Expert - I can write complex technical or business documents",
      ],
    },
    {
      id: 6,
      question: "Your experience with design tools (Figma, Adobe, etc.):",
      options: [
        "None - I haven't used design tools",
        "Basic - I can use simple features",
        "Intermediate - I can create professional designs",
        "Advanced - I can design complex systems and workflows",
        "Expert - I can lead design teams and establish standards",
      ],
    },
    {
      id: 7,
      question: "How would you rate your problem-solving abilities?",
      options: [
        "Struggle with complex problems",
        "Can solve problems with guidance",
        "Can solve most problems independently",
        "Excel at solving complex, multi-faceted problems",
        "Can solve any problem and teach others to do the same",
      ],
    },
    {
      id: 8,
      question: "Your experience with customer service:",
      options: [
        "None - I haven't worked in customer service",
        "Limited - I've handled basic customer inquiries",
        "Moderate - I've managed customer relationships",
        "Extensive - I've led customer service teams",
        "Expert - I've designed customer experience strategies",
      ],
    },
    {
      id: 9,
      question: "How comfortable are you with learning new technology?",
      options: [
        "Very uncomfortable - I prefer familiar tools",
        "Somewhat uncomfortable - I need lots of support",
        "Neutral - I can learn with adequate training",
        "Comfortable - I enjoy learning new technologies",
        "Very comfortable - I quickly master new technologies",
      ],
    },
    {
      id: 10,
      question: "Your experience with sales and business development:",
      options: [
        "None - I haven't worked in sales",
        "Limited - I've made basic sales presentations",
        "Moderate - I've closed deals and built relationships",
        "Extensive - I've led sales teams and strategies",
        "Expert - I've built entire sales organizations",
      ],
    },
    {
      id: 11,
      question: "How would you rate your research skills?",
      options: [
        "Basic - I can find information online",
        "Good - I can conduct thorough research",
        "Strong - I can research complex topics effectively",
        "Advanced - I can design and execute research studies",
        "Expert - I can lead research initiatives and teams",
      ],
    },
    {
      id: 12,
      question: "Your experience with team leadership:",
      options: [
        "None - I haven't led teams",
        "Limited - I've led small groups occasionally",
        "Moderate - I've managed small teams regularly",
        "Extensive - I've led large, diverse teams",
        "Expert - I've built and led entire organizations",
      ],
    },
    {
      id: 13,
      question: "How would you describe your analytical thinking?",
      options: [
        "Struggle with complex analysis",
        "Can analyze with guidance and tools",
        "Can analyze most situations independently",
        "Excel at complex, multi-dimensional analysis",
        "Can analyze any situation and teach others",
      ],
    },
    {
      id: 14,
      question: "Your experience with marketing and communications:",
      options: [
        "None - I haven't worked in marketing",
        "Limited - I've created basic marketing materials",
        "Moderate - I've run marketing campaigns",
        "Extensive - I've developed marketing strategies",
        "Expert - I've built marketing organizations",
      ],
    },
    {
      id: 15,
      question: "How comfortable are you with financial analysis?",
      options: [
        "Very uncomfortable - I avoid financial tasks",
        "Somewhat uncomfortable - I need help with finances",
        "Neutral - I can handle basic financial tasks",
        "Comfortable - I can analyze financial data",
        "Very comfortable - I excel at financial analysis",
      ],
    },
    {
      id: 16,
      question: "Your experience with training and mentoring:",
      options: [
        "None - I haven't trained others",
        "Limited - I've helped colleagues occasionally",
        "Moderate - I've trained others regularly",
        "Extensive - I've developed training programs",
        "Expert - I've built learning and development systems",
      ],
    },
    {
      id: 17,
      question: "How would you rate your negotiation skills?",
      options: [
        "Poor - I avoid negotiations",
        "Fair - I can negotiate with preparation",
        "Good - I can handle most negotiations",
        "Strong - I excel at complex negotiations",
        "Expert - I can negotiate any situation successfully",
      ],
    },
    {
      id: 18,
      question: "Your experience with quality assurance and testing:",
      options: [
        "None - I haven't worked in QA",
        "Limited - I've done basic testing",
        "Moderate - I've designed test processes",
        "Extensive - I've led QA teams and strategies",
        "Expert - I've built comprehensive QA systems",
      ],
    },
    {
      id: 19,
      question: "How comfortable are you with strategic planning?",
      options: [
        "Very uncomfortable - I prefer tactical work",
        "Somewhat uncomfortable - I need guidance",
        "Neutral - I can contribute to planning",
        "Comfortable - I can lead strategic planning",
        "Very comfortable - I excel at strategic thinking",
      ],
    },
    {
      id: 20,
      question: "Your experience with international business:",
      options: [
        "None - I haven't worked internationally",
        "Limited - I've worked with international clients",
        "Moderate - I've managed international projects",
        "Extensive - I've led global initiatives",
        "Expert - I've built international business operations",
      ],
    },
    {
      id: 21,
      question: "How would you rate your time management skills?",
      options: [
        "Poor - I often miss deadlines",
        "Fair - I usually meet deadlines with effort",
        "Good - I consistently meet deadlines",
        "Strong - I excel at managing multiple priorities",
        "Expert - I can optimize time for entire teams",
      ],
    },
    {
      id: 22,
      question: "Your experience with digital marketing:",
      options: [
        "None - I haven't done digital marketing",
        "Limited - I've used basic digital tools",
        "Moderate - I've run digital campaigns",
        "Extensive - I've developed digital strategies",
        "Expert - I've built digital marketing organizations",
      ],
    },
    {
      id: 23,
      question: "How comfortable are you with technical documentation?",
      options: [
        "Very uncomfortable - I avoid documentation",
        "Somewhat uncomfortable - I need templates",
        "Neutral - I can write basic documentation",
        "Comfortable - I can create comprehensive docs",
        "Very comfortable - I excel at technical writing",
      ],
    },
    {
      id: 24,
      question: "Your experience with process improvement:",
      options: [
        "None - I haven't improved processes",
        "Limited - I've made small improvements",
        "Moderate - I've redesigned processes",
        "Extensive - I've led process transformation",
        "Expert - I've built process excellence programs",
      ],
    },
    {
      id: 25,
      question: "How would you rate your adaptability to change?",
      options: [
        "Poor - I struggle with change",
        "Fair - I can adapt with support",
        "Good - I adapt well to most changes",
        "Strong - I thrive in changing environments",
        "Expert - I can lead others through change",
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
