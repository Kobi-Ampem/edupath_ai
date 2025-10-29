"use client";

import Navbar from "../components/Navbar";

export default function Careers() {
  const careerPaths = [
    {
      id: 1,
      title: "Software Engineering",
      category: "Technology",
      icon: "💻",
      description:
        "Design and develop software applications, systems, and platforms that power our digital world.",
      avgSalary: "$110,000 - $180,000",
      growth: "High",
      education: "Bachelor's in Computer Science or related field",
      skills: [
        "Programming languages (Python, Java, JavaScript)",
        "Problem-solving and algorithms",
        "Software development methodologies",
        "Version control (Git)",
        "Database management",
      ],
      outlook:
        "Job growth expected to increase 25% over the next decade. Strong demand across all industries.",
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      category: "Technology",
      icon: "📊",
      description:
        "Extract insights from data to drive business decisions and solve complex problems using statistics and machine learning.",
      avgSalary: "$95,000 - $165,000",
      growth: "Very High",
      education: "Bachelor's or Master's in Data Science, Statistics, or CS",
      skills: [
        "Python, R, SQL",
        "Machine learning and AI",
        "Statistical analysis",
        "Data visualization",
        "Big data tools (Hadoop, Spark)",
      ],
      outlook:
        "One of the fastest-growing fields. Demand projected to grow 36% by 2031.",
    },
    {
      id: 3,
      title: "Healthcare & Medicine",
      category: "Healthcare",
      icon: "⚕️",
      description:
        "Provide medical care, conduct research, and improve patient outcomes in various healthcare settings.",
      avgSalary: "$120,000 - $250,000+",
      growth: "High",
      education: "Medical degree (MD/DO) or specialized healthcare degree",
      skills: [
        "Medical knowledge and procedures",
        "Patient care and empathy",
        "Critical thinking",
        "Communication skills",
        "Continuing education",
      ],
      outlook:
        "Healthcare jobs growing faster than average. Aging population increases demand.",
    },
    {
      id: 4,
      title: "Digital Marketing",
      category: "Business",
      icon: "📱",
      description:
        "Promote brands and products through digital channels, social media, and online advertising.",
      avgSalary: "$55,000 - $120,000",
      growth: "High",
      education: "Bachelor's in Marketing, Communications, or related field",
      skills: [
        "SEO and SEM",
        "Social media marketing",
        "Content creation",
        "Analytics and data interpretation",
        "Creative thinking",
      ],
      outlook: "Strong growth as businesses shift to digital-first strategies.",
    },
    {
      id: 5,
      title: "Product Management",
      category: "Business",
      icon: "🎯",
      description:
        "Lead product development from conception to launch, balancing user needs and business goals.",
      avgSalary: "$100,000 - $170,000",
      growth: "Very High",
      education: "Bachelor's in Business, Engineering, or related field",
      skills: [
        "Strategic thinking",
        "User research",
        "Agile methodologies",
        "Cross-functional collaboration",
        "Data-driven decision making",
      ],
      outlook:
        "Growing demand as companies prioritize product-led growth strategies.",
    },
    {
      id: 6,
      title: "UX/UI Design",
      category: "Creative",
      icon: "🎨",
      description:
        "Create intuitive and beautiful user experiences for digital products and applications.",
      avgSalary: "$75,000 - $140,000",
      growth: "High",
      education: "Bachelor's in Design, HCI, or related field",
      skills: [
        "Design thinking",
        "Figma, Sketch, Adobe XD",
        "User research",
        "Prototyping",
        "Visual design principles",
      ],
      outlook: "Increasing demand as companies focus on user experience.",
    },
    {
      id: 7,
      title: "Financial Analysis",
      category: "Business",
      icon: "💼",
      description:
        "Analyze financial data, create forecasts, and provide strategic recommendations to organizations.",
      avgSalary: "$70,000 - $130,000",
      growth: "Moderate",
      education: "Bachelor's in Finance, Economics, or Accounting",
      skills: [
        "Financial modeling",
        "Excel and financial software",
        "Analytical thinking",
        "Attention to detail",
        "Communication skills",
      ],
      outlook:
        "Steady demand across industries. Opportunities in fintech expanding.",
    },
    {
      id: 8,
      title: "Cybersecurity",
      category: "Technology",
      icon: "🔒",
      description:
        "Protect organizations from cyber threats and ensure data security and privacy.",
      avgSalary: "$90,000 - $160,000",
      growth: "Very High",
      education: "Bachelor's in Cybersecurity, Computer Science, or IT",
      skills: [
        "Network security",
        "Ethical hacking",
        "Risk assessment",
        "Security protocols",
        "Incident response",
      ],
      outlook:
        "Critical field with 35% projected growth. High demand for skilled professionals.",
    },
    {
      id: 9,
      title: "Education & Teaching",
      category: "Education",
      icon: "📚",
      description:
        "Inspire and educate the next generation across various subjects and age groups.",
      avgSalary: "$45,000 - $85,000",
      growth: "Moderate",
      education: "Bachelor's in Education + Teaching Certification",
      skills: [
        "Pedagogy and curriculum design",
        "Classroom management",
        "Patience and empathy",
        "Communication",
        "Adaptability",
      ],
      outlook:
        "Steady demand. Growing opportunities in online education and EdTech.",
    },
  ];

  const categories = [
    "All",
    "Technology",
    "Healthcare",
    "Business",
    "Creative",
    "Education",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white/95">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#16465B] pt-24">
            Discover Your
            <span className="block bg-gradient-to-r from-[#16465B] to-[#16465B]/70 bg-clip-text text-transparent">
              Career Path
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#16465B]/80 mb-8 max-w-3xl mx-auto">
            Explore diverse career opportunities and find the perfect path that
            matches your interests, skills, and goals. Let AI guide you toward
            your future.
          </p>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#16465B] mb-4">
              Explore Career Paths
            </h2>
            <p className="text-lg text-[#16465B]/80 max-w-3xl mx-auto">
              Browse through various career options and find detailed
              information about each path.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-[#16465B]/10 hover:bg-[#16465B]/20 text-[#16465B] rounded-full font-semibold transition-all duration-300 hover:scale-105 border border-[#16465B]/20"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Career Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((career) => (
              <div
                key={career.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-[#16465B]/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-2">{career.icon}</div>
                  <span className="px-3 py-1 bg-[#16465B]/10 text-[#16465B] rounded-full text-sm font-semibold">
                    {career.category}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-[#16465B] mb-3">
                  {career.title}
                </h3>
                <p className="text-[#16465B]/70 mb-4 leading-relaxed">
                  {career.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#16465B]/60 font-medium">
                      Average Salary:
                    </span>
                    <span className="text-[#16465B] font-semibold">
                      {career.avgSalary}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#16465B]/60 font-medium">
                      Growth:
                    </span>
                    <span className="px-2 py-1 bg-[#16465B]/10 text-[#16465B] rounded-full text-xs font-semibold">
                      {career.growth}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#16465B]/10">
                  <h4 className="text-sm font-semibold text-[#16465B] mb-2">
                    Key Skills:
                  </h4>
                  <ul className="text-sm text-[#16465B]/70 space-y-1">
                    {career.skills.slice(0, 3).map((skill, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#16465B] rounded-full mr-2"></span>
                        {skill}
                      </li>
                    ))}
                    <li className="text-[#16465B]/50 italic">
                      +{career.skills.length - 3} more...
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() =>
                    (window.location.href =
                      "/signup?redirect=assessment&career=" +
                      career.title.toLowerCase().replace(/\s+/g, "-"))
                  }
                  className="mt-6 w-full px-4 py-2 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#16465B]/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-[#16465B]/20">
            <h2 className="text-4xl font-bold text-[#16465B] mb-6">
              Need Personalized Career Guidance?
            </h2>
            <p className="text-lg text-[#16465B]/80 mb-8">
              Our AI-powered career advisor can analyze your interests, skills,
              and goals to recommend the perfect career path for you. Sign up to
              get started with a personalized career assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() =>
                  (window.location.href = "/signup?redirect=assessment")
                }
                className="px-8 py-4 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Sign Up & Start Assessment
              </button>
              <button
                onClick={() =>
                  (window.location.href = "/login?redirect=assessment")
                }
                className="px-8 py-4 text-[#16465B] hover:text-[#16465B]/80 font-semibold text-lg transition-colors duration-300"
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#16465B]/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#16465B]/70">
            © 2025 EduPath AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
