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
      question: "👥 When working in a group, you usually:",
      options: [
        "👑 Take the lead and guide others",
        "👂 Listen carefully and think before speaking",
        "🤝 Help everyone share their ideas",
        "🎯 Focus on getting the work done",
        "🔄 Change your approach based on the group",
      ],
    },
    {
      id: 2,
      question: "⏰ When homework is due soon, you:",
      options: [
        "⚡ Work better under pressure",
        "📅 Start early and work bit by bit",
        "👥 Ask friends to work together",
        "🔍 Concentrate hard for long periods",
        "📋 Break it into smaller tasks",
      ],
    },
    {
      id: 3,
      question: "💬 When explaining something to friends, you:",
      options: [
        "⚡ Say it quickly and directly",
        "📖 Give lots of details and examples",
        "💚 Speak kindly and supportively",
        "🔧 Explain exactly how it works",
        "🎯 Talk about the bigger picture",
      ],
    },
    {
      id: 4,
      question: "🤔 When you need to make a choice, you:",
      options: [
        "⚡ Trust your gut feeling and decide fast",
        "🔍 Think about all the details first",
        "👥 Ask friends and family what they think",
        "🔧 Consider what's most practical",
        "📈 Think about what happens later",
      ],
    },
    {
      id: 5,
      question: "😤 When there's an argument or conflict, you:",
      options: [
        "💪 Deal with it directly and honestly",
        "😌 Try to avoid it and keep peace",
        "🤝 Help everyone find agreement",
        "📊 Focus on the facts",
        "🔍 Look at the whole situation",
      ],
    },
    {
      id: 6,
      question: "⚡ You get energy from:",
      options: [
        "👥 Being with friends and classmates",
        "🧘 Quiet time alone to think",
        "💚 Helping others feel better",
        "🧩 Solving problems and puzzles",
        "👑 Leading activities and projects",
      ],
    },
    {
      id: 7,
      question: "📚 When learning something new, you:",
      options: [
        "🚀 Try it right away",
        "📖 Read about it first, then try",
        "👥 Learn best in a study group",
        "🔧 Focus on how to use it",
        "🔍 See how it connects to other things",
      ],
    },
    {
      id: 8,
      question: "🎲 When trying something new, you:",
      options: [
        "✨ Get excited and try it",
        "🛡️ Prefer safe, familiar things",
        "👥 Think about how it affects others",
        "🔬 Want to understand it fully first",
        "🎯 Plan it out carefully",
      ],
    },
    {
      id: 9,
      question: "👨‍👩‍👧‍👦 In group projects at school, you:",
      options: [
        "👑 Become the group leader",
        "🧠 Share your knowledge and ideas",
        "🤝 Encourage and help your teammates",
        "✅ Make sure everything is done well",
        "📋 Organize and plan the work",
      ],
    },
    {
      id: 10,
      question: "🔄 When things change, you feel:",
      options: [
        "😃 Excited about new opportunities",
        "😰 Nervous and want things to stay the same",
        "😟 Worried about how it affects others",
        "🤔 Curious about how it works",
        "🧠 Strategic about adapting",
      ],
    },
    {
      id: 11,
      question: "💭 When giving advice to a friend, you:",
      options: [
        "💪 Tell them straight what you think",
        "🤐 Be careful not to hurt their feelings",
        "💚 Be encouraging and positive",
        "📝 Give specific helpful tips",
        "🎯 Focus on their goals",
      ],
    },
    {
      id: 12,
      question: "📝 Your study style is:",
      options: [
        "⚡ Fast and get things done quickly",
        "📚 Slow, careful, and detailed",
        "👥 Working with others",
        "🔧 Focused on one thing at a time",
        "🎯 Goal-oriented and organized",
      ],
    },
    {
      id: 13,
      question: "😰 When you're stressed about school, you:",
      options: [
        "💪 Take charge and push through",
        "🧘 Want to be alone and rest",
        "💚 Talk to friends or family",
        "🔍 Focus hard on solving the problem",
        "🔍 Step back and think about it",
      ],
    },
    {
      id: 14,
      question: "🏫 Your ideal classroom would be:",
      options: [
        "🎉 Fun and always changing",
        "📚 Quiet and organized",
        "👥 Friendly and supportive",
        "🔬 Full of experiments and problems",
        "🎯 Focused on goals and achievements",
      ],
    },
    {
      id: 15,
      question: "🗣️ When sharing your ideas in class, you:",
      options: [
        "💪 Speak confidently and persuasively",
        "📊 Back it up with facts and examples",
        "💚 Focus on how it helps everyone",
        "🔧 Explain it logically step by step",
        "🎯 Show the big picture value",
      ],
    },
    {
      id: 16,
      question: "🧩 When solving a problem, you:",
      options: [
        "⚡ Decide quickly and act",
        "🔍 Think about it carefully first",
        "👥 Discuss it with others",
        "🔬 Try different methods systematically",
        "📋 Plan the solution first",
      ],
    },
    {
      id: 17,
      question: "👥 During class discussions, you:",
      options: [
        "👑 Lead the conversation",
        "👂 Listen well and add when needed",
        "🤝 Make sure everyone speaks",
        "🔧 Focus on getting facts right",
        "💡 Share big picture ideas",
      ],
    },
    {
      id: 18,
      question: "💪 What motivates you most?",
      options: [
        "🏆 Winning and achieving goals",
        "⭐ Being really good at something",
        "💚 Helping others do well",
        "✅ Creating quality work",
        "🚀 Making new things happen",
      ],
    },
    {
      id: 19,
      question: "😤 When someone is difficult to work with, you:",
      options: [
        "💪 Talk to them directly about it",
        "🤐 Try to understand them better",
        "🤝 Look for ways to get along",
        "📊 Stick to the facts",
        "🔍 Find the real reason behind it",
      ],
    },
    {
      id: 20,
      question: "🎯 Your dream role would be:",
      options: [
        "👑 Leading a team or group",
        "🧠 Being the expert everyone asks",
        "💚 Supporting and helping others",
        "🔧 Building and creating solutions",
        "📈 Planning and organizing projects",
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
