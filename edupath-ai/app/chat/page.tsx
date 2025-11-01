"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ConversationMemory {
  mentionedTopics: string[];
  userInterests: string[];
  mood: "positive" | "neutral" | "stressed" | "excited" | "uncertain";
  userName?: string;
  lastTopic?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your EduPath AI advisor. I specialize in helping JHS students in Ghana with:\n\n📚 Subject Guidance - Choosing the right SHS program and subjects\n💼 Career Guidance - Exploring career paths relevant to Ghana\n💚 Mental Health Support - Managing exam stress and academic anxiety\n\nWhat would you like help with today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [memory, setMemory] = useState<ConversationMemory>({
    mentionedTopics: [],
    userInterests: [],
    mood: "neutral",
  });

  // Check authentication on component mount and load user info
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      window.location.href = `/login?redirect=chat`;
    } else {
      setIsCheckingAuth(false);
      // Load user name for personalization
      const firstName = localStorage.getItem("userFirstName");
      if (firstName) {
        setMemory((prev) => ({ ...prev, userName: firstName }));
      }
    }
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Pattern matching helper
  const matchesPattern = (input: string, patterns: string[]): boolean => {
    const lowerInput = input.toLowerCase();
    return patterns.some((pattern) => {
      // Support regex-like patterns
      if (pattern.includes(".*")) {
        const regex = new RegExp(pattern.replace(/\.\*/g, ".*"), "i");
        return regex.test(input);
      }
      // Word boundary matching
      if (pattern.startsWith("\\b")) {
        const regex = new RegExp(pattern, "i");
        return regex.test(input);
      }
      // Simple contains check
      return lowerInput.includes(pattern.toLowerCase());
    });
  };

  // Detect user mood from input
  const detectMood = (
    input: string
  ): "positive" | "neutral" | "stressed" | "excited" | "uncertain" => {
    const lowerInput = input.toLowerCase();

    // Positive/Excited indicators
    if (
      matchesPattern(lowerInput, [
        "excited",
        "happy",
        "love",
        "great",
        "awesome",
        "wonderful",
        "amazing",
        "!",
      ])
    ) {
      return lowerInput.includes("excited") || lowerInput.includes("can't wait")
        ? "excited"
        : "positive";
    }

    // Stressed indicators
    if (
      matchesPattern(lowerInput, [
        "stress",
        "worried",
        "anxious",
        "scared",
        "nervous",
        "pressure",
        "overwhelmed",
        "can't",
        "difficult",
        "hard",
        "struggling",
      ])
    ) {
      return "stressed";
    }

    // Uncertain indicators
    if (
      matchesPattern(lowerInput, [
        "don't know",
        "confused",
        "unsure",
        "maybe",
        "think",
        "not sure",
        "?",
      ])
    ) {
      return "uncertain";
    }

    return "neutral";
  };

  // Extract mentioned topics
  const extractTopics = (input: string): string[] => {
    const topics: string[] = [];
    const lowerInput = input.toLowerCase();

    const topicKeywords: { [key: string]: string[] } = {
      science: [
        "science",
        "scientific",
        "stem",
        "physics",
        "chemistry",
        "biology",
      ],
      engineering: [
        "engineering",
        "engineer",
        "civil",
        "electrical",
        "mechanical",
      ],
      medicine: [
        "doctor",
        "medical",
        "medicine",
        "healthcare",
        "nurse",
        "pharmacy",
      ],
      law: ["law", "lawyer", "legal", "attorney"],
      business: ["business", "accounting", "banking", "finance", "commerce"],
      arts: ["arts", "art", "creative", "design", "visual"],
      teaching: ["teacher", "teaching", "educate", "education"],
    };

    Object.keys(topicKeywords).forEach((topic) => {
      if (
        topicKeywords[topic].some((keyword) => lowerInput.includes(keyword))
      ) {
        topics.push(topic);
      }
    });

    return topics;
  };

  // Get personalized greeting
  const getPersonalizedGreeting = (): string => {
    const greetings = memory.userName
      ? [
          `Hey ${memory.userName}! 👋`,
          `Hi there, ${memory.userName}! 😊`,
          `Hello ${memory.userName}! Great to chat with you again!`,
        ]
      : [
          "Hey there! 👋",
          "Hi! Great to meet you! 😊",
          "Hello! I'm here to help!",
        ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  // Get follow-up questions based on context
  const getFollowUpQuestion = (topic: string, mood: string): string => {
    const followUps: { [key: string]: string[] } = {
      science: [
        "Which science subjects are you most excited about?",
        "Have you thought about what career you'd like with a science background?",
        "What draws you to science programs?",
      ],
      engineering: [
        "What type of engineering interests you most?",
        "Do you enjoy building things or solving problems?",
        "Have you looked into any specific engineering fields yet?",
      ],
      medicine: [
        "What aspect of healthcare appeals to you?",
        "Have you considered different healthcare careers like nursing or pharmacy?",
        "What motivates you to pursue healthcare?",
      ],
      general: [
        "What interests you most about this?",
        "Have you discussed this with your teachers or parents?",
        "What would be your ideal outcome?",
      ],
    };

    const options = followUps[topic] || followUps.general;
    return options[Math.floor(Math.random() * options.length)];
  };

  // Generate hardcoded AI responses based on user input
  const generateResponse = (
    userInput: string,
    conversationHistory: Message[]
  ): string => {
    const lowerInput = userInput.toLowerCase();

    // Update memory
    const currentMood = detectMood(userInput);
    const topics = extractTopics(userInput);
    const newMemory = {
      ...memory,
      mood: currentMood,
      mentionedTopics: [...new Set([...memory.mentionedTopics, ...topics])],
      userInterests:
        topics.length > 0
          ? [...new Set([...memory.userInterests, ...topics[0]])]
          : memory.userInterests,
      lastTopic: topics[0] || memory.lastTopic,
    };
    setMemory(newMemory);

    // Check for user name in input
    if (
      matchesPattern(userInput, ["my name is", "i'm", "i am", "call me"]) &&
      !memory.userName
    ) {
      const nameMatch = userInput.match(
        /(?:name is|i'?m|i am|call me)\s+([A-Z][a-z]+)/i
      );
      if (nameMatch) {
        const name = nameMatch[1];
        setMemory((prev) => ({ ...prev, userName: name }));
        return `Nice to meet you, ${name}! 😊 I'll remember that. Now, how can I help you today?`;
      }
    }

    // Subject Guidance - Using patterns
    if (
      matchesPattern(lowerInput, [
        "shs",
        "program",
        "subject",
        "course",
        "what.*study",
        "which.*choose",
        "need.*take",
        "should.*pick",
      ])
    ) {
      if (
        matchesPattern(lowerInput, [
          "science",
          "stem",
          "physics",
          "chemistry",
          "biology",
        ])
      ) {
        const tone =
          currentMood === "excited"
            ? "That's fantastic!"
            : currentMood === "uncertain"
            ? "I understand it can be confusing, but"
            : "Great choice!";
        const followUp = getFollowUpQuestion("science", currentMood);
        return `${tone} Science programs in Ghana offer excellent opportunities. Here's what you should know:

📚 **Science Program Options:**
• **General Science** - Covers Physics, Chemistry, Biology, and Mathematics
• **Agricultural Science** - Focuses on farming, agribusiness, and food security
• **Technical** - Includes Applied Electricity, Electronics, Building Construction, etc.

**Key Subjects:**
- Core Mathematics
- English Language
- Integrated Science
- Social Studies
- Physics, Chemistry, Biology (for General Science)
- Elective Mathematics (highly recommended)

**Career Paths:** Medicine, Engineering, Pharmacy, Agricultural Sciences, Computer Science, and many more!

${followUp}`;
      } else if (
        matchesPattern(lowerInput, [
          "art",
          "business",
          "visual",
          "accounting",
          "commerce",
          "arts",
        ])
      ) {
        const tone =
          currentMood === "uncertain"
            ? "That's totally okay to explore!"
            : "Excellent choice!";
        const followUp = getFollowUpQuestion("general", currentMood);
        return `${tone} Arts and Business programs offer diverse career opportunities:

📚 **Arts & Business Programs:**
• **General Arts** - Literature, History, Geography, Economics, Government
• **Business** - Accounting, Business Management, Economics, Costing
• **Visual Arts** - Fine Arts, Textiles, Graphic Design, Sculpture

**Key Subjects:**
- Core Mathematics
- English Language
- Social Studies
- Electives based on program choice
- For Business: Accounting, Business Management, Economics

**Career Paths:** Law, Journalism, Banking, Accounting, Teaching, Marketing, Design, and many creative industries!

${followUp}`;
      } else if (
        matchesPattern(lowerInput, [
          "engineering",
          "engineer",
          "civil",
          "electrical",
          "mechanical",
        ])
      ) {
        const followUp = getFollowUpQuestion("engineering", currentMood);
        return `Engineering is a fantastic career choice! Here's what you need to know:

📚 **SHS Program:** Science (General Science recommended)
**Key Subjects:**
• Core Mathematics
• Elective Mathematics (essential!)
• Physics
• Chemistry
• Technical Drawing (if available)

**Popular Engineering Fields in Ghana:**
• Civil Engineering - Buildings, roads, infrastructure
• Electrical Engineering - Power, electronics, telecommunications
• Mechanical Engineering - Machinery, manufacturing
• Computer Engineering - Hardware and software systems
• Petroleum Engineering - Oil and gas industry

**Next Steps:**
1. Focus on Mathematics and Physics now
2. Apply to universities like KNUST, UCC, UG after SHS
3. Many programs require strong WASSCE results

${followUp}`;
      } else {
        const name = memory.userName ? `, ${memory.userName}` : "";
        const contextualIntro = memory.lastTopic
          ? `Since you mentioned ${memory.lastTopic} earlier, let me help you with SHS programs!`
          : "Great question about SHS programs!";
        return `${contextualIntro} In Ghana, you have several excellent options:

📚 **Main SHS Programs:**
1. **General Science** - For medicine, engineering, sciences
2. **General Arts** - For law, humanities, social sciences
3. **Business** - For accounting, banking, business
4. **Agricultural Science** - For farming, agribusiness
5. **Technical** - For technical skills and trades
6. **Visual Arts** - For creative and design careers

**How to Choose:**
• Think about your interests and strengths
• Consider career goals (what do you want to become?)
• Look at required subjects for your dream career
• Talk to teachers and career counselors

What career are you interested in${name}? I can help you choose the best program!`;
      }
    }

    // Career Guidance - Using patterns
    if (
      matchesPattern(lowerInput, [
        "career",
        "job",
        "profession",
        "become",
        "want.*be",
        "dream.*job",
        "what.*do",
        "doctor",
        "lawyer",
        "engineer",
        "teacher",
        "nurse",
      ])
    ) {
      if (
        matchesPattern(lowerInput, [
          "health",
          "doctor",
          "nurse",
          "medical",
          "physician",
          "pharmacy",
        ])
      ) {
        const tone =
          currentMood === "excited"
            ? "That's wonderful! Healthcare is such a meaningful path!"
            : "Healthcare careers in Ghana are very rewarding!";
        const followUp = memory.userName
          ? `Have you shadowed any healthcare professionals yet, ${memory.userName}?`
          : "Have you considered which healthcare role might suit you best?";
        return `${tone} Here are some options:

🏥 **Healthcare Careers:**
• **Medical Doctor** - 6 years at medical school (UG, KNUST)
• **Nursing** - 4 years at nursing training colleges
• **Pharmacist** - 4-5 years at pharmacy school
• **Physiotherapist** - Rehabilitation and therapy
• **Medical Laboratory Scientist** - Lab tests and diagnostics

**SHS Path:** General Science
**Key Subjects:** Biology, Chemistry, Physics, Mathematics

**Requirements:**
- Strong WASSCE results (usually 6 credits including Mathematics, English, and Sciences)
- Pass entrance exams for medical schools
- Passion for helping others

**Job Market:** Healthcare professionals are always in demand in Ghana, with opportunities in both public and private sectors.

${followUp}`;
      } else if (
        matchesPattern(lowerInput, [
          "engineering",
          "engineer",
          "civil",
          "electrical",
          "mechanical",
          "computer.*engineer",
        ])
      ) {
        return `Engineering is a high-demand field in Ghana! Here's what you need to know:

🔧 **Engineering Careers:**
• **Civil Engineering** - Build roads, bridges, buildings (KNUST, UCC)
• **Electrical Engineering** - Power systems, electronics (KNUST, UG)
• **Mechanical Engineering** - Machinery and manufacturing (KNUST)
• **Computer Engineering** - Software and hardware (KNUST, UG)
• **Petroleum Engineering** - Oil and gas (GNPC, private companies)

**SHS Path:** General Science
**Key Subjects:** Mathematics (Core + Elective), Physics, Chemistry

**Requirements:**
- Excellent Mathematics and Physics grades
- Engineering programs are competitive
- Strong problem-solving skills

**Job Market:** Growing demand, especially in infrastructure, energy, and tech sectors. Many opportunities in both public and private companies.

Which type of engineering interests you most?`;
      } else if (
        matchesPattern(lowerInput, [
          "law",
          "lawyer",
          "legal",
          "attorney",
          "judge",
        ])
      ) {
        return `Law is a respected profession in Ghana! Here's the path:

⚖️ **Law Career Path:**
• **SHS Program:** General Arts (recommended) or Business
• **Key Subjects:** English, Literature, Government, Economics
• **University:** 4-year LLB at UG, KNUST, or private universities
• **Law School:** 2-year professional course after LLB
• **Specializations:** Corporate Law, Criminal Law, Human Rights, etc.

**Requirements:**
- Strong English and essay writing skills
- Critical thinking abilities
- Good WASSCE results

**Career Options:**
- Private practice as a lawyer
- Corporate legal counsel
- Government legal services
- NGOs and international organizations
- Judiciary

**Job Market:** Competitive but rewarding, especially in corporate and international law.

Would you like more details about law school requirements?`;
      } else if (
        matchesPattern(lowerInput, [
          "teacher",
          "teaching",
          "educate",
          "lecture",
        ])
      ) {
        return `Teaching is a noble profession that shapes the future! Here's how to become a teacher in Ghana:

📖 **Teaching Careers:**
• **Primary School Teacher** - Teacher Training Colleges (3 years)
• **JHS/SHS Teacher** - University degree in your subject + Postgraduate Diploma in Education
• **University Lecturer** - Master's or PhD required

**SHS Path:** Depends on subject you want to teach
- Science subjects → General Science
- Arts subjects → General Arts
- Business → Business program

**Requirements:**
- Passion for education and working with students
- Good communication skills
- Patience and dedication

**Job Market:** Always in demand! Opportunities in public and private schools, as well as tutoring.

Which subject would you like to teach?`;
      } else {
        return `Great question about careers! In Ghana, you have many exciting career paths:

💼 **Popular Career Fields:**
• **Healthcare:** Doctor, Nurse, Pharmacist, Physiotherapist
• **Engineering:** Civil, Electrical, Mechanical, Computer
• **Law:** Lawyer, Legal Advisor, Judge
• **Business:** Accountant, Banker, Entrepreneur, Manager
• **Education:** Teacher, Lecturer, Education Administrator
• **Technology:** Software Developer, IT Specialist, Data Analyst
• **Creative Arts:** Graphic Designer, Artist, Media Professional

**Steps to Choose a Career:**
1. Identify your interests and strengths
2. Research career requirements
3. Choose the right SHS program
4. Focus on relevant subjects
5. Plan your university path

What career are you most interested in? I can give you specific guidance!`;
      }
    }

    // Mental Health Support - Using patterns with mood detection
    if (
      matchesPattern(lowerInput, [
        "stress",
        "anxious",
        "worried",
        "scared",
        "nervous",
        "pressure",
        "depressed",
        "sad",
        "overwhelmed",
        "can't.*handle",
        "feeling.*down",
        "tired.*of",
        "difficult",
        "hard.*cope",
      ])
    ) {
      if (
        matchesPattern(lowerInput, [
          "exam",
          "test",
          "wassce",
          "b.e.c.e",
          "assessment",
        ])
      ) {
        const name = memory.userName ? `, ${memory.userName}` : "";
        const empatheticStart =
          currentMood === "stressed"
            ? `I hear you${name}, and I want you to know that exam stress is completely normal - you're definitely not alone in this.`
            : `Exam stress is completely normal${name}! Here are some strategies that really help:`;
        return `${empatheticStart}

🧘 **Managing Exam Stress:**
• **Study Smart:** Create a realistic study schedule, break topics into chunks
• **Take Breaks:** 10-15 minute breaks every hour of study
• **Get Enough Sleep:** 7-9 hours of sleep helps memory and focus
• **Eat Well:** Balanced meals keep your energy up
• **Stay Active:** Even 20 minutes of walking helps reduce stress
• **Practice Relaxation:** Deep breathing, meditation, or listening to calm music

**During the Exam:**
- Read all questions first
- Start with questions you know best
- Don't panic if you don't know something - move on and come back
- Manage your time wisely

**Remember:**
- Your worth isn't determined by exam results
- It's okay to feel nervous - it shows you care
- Talk to teachers, parents, or counselors if stress becomes overwhelming

You've got this! What specific exam concerns do you have?`;
      } else {
        const name = memory.userName ? `, ${memory.userName}` : "";
        const empatheticStart =
          currentMood === "stressed"
            ? `I really appreciate you sharing this with me${name}. Let's work through this together.`
            : `I'm here to support you${name}! Mental health is just as important as academic success.`;
        return `${empatheticStart} Here are some helpful strategies:

💚 **Mental Health Support:**
• **Talk to Someone:** Teachers, parents, school counselor, or trusted friends
• **Take Breaks:** Rest is not laziness - it's essential for your well-being
• **Stay Connected:** Don't isolate yourself, spend time with supportive people
• **Practice Self-Care:** Eat well, sleep enough, exercise regularly
• **Set Realistic Goals:** You don't have to be perfect - do your best

**When to Seek Help:**
If you're feeling persistently sad, anxious, or overwhelmed, please reach out:
- School counselor or guidance teacher
- Parents or guardians
- Mental health hotlines in Ghana
- Your family doctor

**Remember:**
- Asking for help is a sign of strength, not weakness
- Your mental health matters
- You're not alone - many students feel this way

Would you like to talk more about what's bothering you?`;
      }
    }

    // Greetings - Using patterns
    if (
      matchesPattern(lowerInput, [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
      ])
    ) {
      const greeting = getPersonalizedGreeting();
      const contextualRef = memory.lastTopic
        ? ` We were talking about ${memory.lastTopic} earlier.`
        : "";
      return `${greeting} I'm here to help you with:
      
📚 Subject guidance for choosing SHS programs
💼 Career exploration and planning
💚 Mental health support for academic stress${contextualRef}

What would you like to know more about today?`;
    }

    // Thank you - Using patterns
    if (
      matchesPattern(lowerInput, ["thank", "thanks", "appreciate", "grateful"])
    ) {
      const name = memory.userName ? `, ${memory.userName}` : "";
      const responses = [
        `You're very welcome${name}! 😊 I'm glad I could help.`,
        `Anytime${name}! That's what I'm here for! 😊`,
        `No problem at all${name}! Happy to help! 😊`,
      ];
      return `${responses[Math.floor(Math.random() * responses.length)]}

I'm always here to help with:
• Choosing the right SHS program
• Exploring career options
• Managing academic stress
• Planning your educational journey

Feel free to ask me anything else!`;
    }

    // "I am learning" default response for unknown messages
    const name = memory.userName ? `, ${memory.userName}` : "";
    const learningResponses = [
      `Thanks for sharing that${name}! I'm still learning, so I might not have all the answers yet, but let me help with what I know.`,
      `Hmm, that's an interesting question${name}! I'm continuously learning, so I might not have the complete answer, but I can definitely help with what I understand.`,
      `I appreciate you asking that${name}! Since I'm still learning, I may not have all the details, but I can definitely guide you based on what I know.`,
    ];

    const baseResponse =
      learningResponses[Math.floor(Math.random() * learningResponses.length)];

    // Try to provide helpful context based on what we know
    const helpfulContext =
      memory.userInterests.length > 0
        ? `\n\nI remember you're interested in ${memory.userInterests.join(
            " and "
          )}. I'm really good at helping with:\n\n📚 **Subject Guidance** - Choosing SHS programs and subjects\n💼 **Career Guidance** - Exploring career paths\n💚 **Mental Health Support** - Managing exam stress and anxiety\n\nCould you rephrase your question, or would you like to explore one of these areas?`
        : `\n\nI specialize in helping JHS students in Ghana with:\n\n📚 **Subject Guidance** - Choosing SHS programs and subjects\n💼 **Career Guidance** - Exploring career paths\n💚 **Mental Health Support** - Managing exam stress and anxiety\n\nCould you tell me more about what you need help with? For example:\n• "What SHS program should I choose?"\n• "Tell me about careers in healthcare"\n• "I'm feeling stressed about exams"`;

    return baseResponse + helpfulContext;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText("");
    setIsLoading(true);

    // Variable loading delay (600-1200ms) to feel more natural
    const delay = 600 + Math.random() * 600;

    setTimeout(() => {
      const responseText = generateResponse(userMessage.text, updatedMessages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, delay);
  };

  const suggestedQuestions = [
    "What SHS program should I choose?",
    "Tell me about careers in healthcare in Ghana",
    "I'm feeling stressed about my exams",
    "What subjects do I need for engineering?",
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white/95 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#16465B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#16465B]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white/95">
      <Navbar />

      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 mt-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#16465B] mb-4">
              EduPath AI Advisor
            </h1>
            <p className="text-xl text-[#16465B]/80 max-w-2xl mx-auto">
              Get personalized guidance on subjects, careers, and mental health
              support tailored for JHS students in Ghana. Ask me anything!
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#16465B]/20 flex flex-col h-[calc(100vh-300px)] min-h-[600px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-[#16465B] text-white"
                        : "bg-[#16465B]/10 text-[#16465B]"
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === "user"
                          ? "text-white/70"
                          : "text-[#16465B]/60"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#16465B]/10 text-[#16465B] rounded-2xl px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-[#16465B] rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#16465B] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#16465B] rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4 border-t border-[#16465B]/10">
                <p className="text-sm text-[#16465B]/70 mb-3">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="px-4 py-2 bg-[#16465B]/5 hover:bg-[#16465B]/10 text-[#16465B] rounded-full text-sm font-medium transition-all duration-200 border border-[#16465B]/20"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-[#16465B]/10 p-4"
            >
              <div className="flex items-end space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                    rows={1}
                    className="w-full px-4 py-3 pr-12 border border-[#16465B]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16465B]/20 focus:border-[#16465B] resize-none text-[#16465B] placeholder:text-[#16465B]/50"
                    style={{
                      minHeight: "52px",
                      maxHeight: "120px",
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = `${Math.min(
                        target.scrollHeight,
                        120
                      )}px`;
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="px-6 py-3 bg-[#16465B] hover:bg-[#16465B]/90 disabled:bg-[#16465B]/50 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>Send</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-[#16465B]/5 border border-[#16465B]/20 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#16465B]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[#16465B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#16465B] mb-2">
                  How I can help you
                </h3>
                <ul className="text-sm text-[#16465B]/70 space-y-1">
                  <li>
                    • <strong>Subject Guidance:</strong> Help you choose SHS
                    programs and subjects
                  </li>
                  <li>
                    • <strong>Career Guidance:</strong> Explore career paths in
                    Ghana and beyond
                  </li>
                  <li>
                    • <strong>Mental Health Support:</strong> Get support for
                    exam stress and academic anxiety
                  </li>
                  <li>
                    • <strong>Education Planning:</strong> Plan your path from
                    JHS to tertiary education
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
