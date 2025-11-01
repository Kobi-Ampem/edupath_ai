export interface CareerPath {
  id: number;
  title: string;
  category: string;
  icon: string;
  description: string;
  avgSalary: string;
  growth: string;
  education: string;
  shsPath: string;
  keySubjects: string[];
  outlook: string;
}

export const careerPaths: CareerPath[] = [
  {
    id: 1,
    title: "Doctor / Nurse",
    category: "Healthcare",
    icon: "⚕️",
    description:
      "Provide medical care and support to patients in hospitals, clinics, and communities.",
    avgSalary: "GHS 3,000 - 15,000+ monthly (with growth abroad options)",
    growth: "High",
    education: "Medical / Nursing School",
    shsPath: "General Science",
    keySubjects: ["Physics", "Chemistry", "Biology", "Elective Mathematics"],
    outlook:
      "Healthcare professionals will remain in high demand in Ghana and globally.",
  },
  {
    id: 2,
    title: "Software Developer / IT Specialist",
    category: "Technology",
    icon: "💻",
    description:
      "Build and maintain software systems, websites, apps, and digital tools.",
    avgSalary: "GHS 2,500 - 25,000+ monthly (local & remote)",
    growth: "Very High",
    education: "IT / Computer Science",
    shsPath: "General Science / General Arts / Business",
    keySubjects: ["Elective ICT", "Elective Mathematics", "Physics"],

    outlook: "High demand as Ghana expands in tech and digital innovation.",
  },
  {
    id: 3,
    title: "Teacher",
    category: "Education",
    icon: "📚",
    description:
      "Teach and support young learners and help build the future workforce.",
    avgSalary: "GHS 1,800 - 7,000 monthly",
    growth: "Moderate",
    education: "Education Degree",
    shsPath: "General Arts / Science / Business",
    keySubjects: [
      "English",
      "Social Studies",
      "Elective subjects depending on subject you'd like to teach",
    ],
    outlook:
      "Steady demand, with new roles in online and tech–enabled learning.",
  },
  {
    id: 4,
    title: "Accountant / Banker",
    category: "Business",
    icon: "💼",
    description:
      "Manage finances, record transactions, and support financial decisions.",
    avgSalary: "GHS 2,000 - 20,000+ monthly",
    growth: "High",
    education: "Accounting / Finance",
    shsPath: "Business",
    keySubjects: [
      "Financial Accounting",
      "Business Management",
      "Economics",
      "Elective Maths",
    ],
    outlook: "Strong opportunities in finance, fintech, and entrepreneurship.",
  },
  {
    id: 5,
    title: "Graphic Designer / Creative Media Artist",
    category: "Creative",
    icon: "🎨",
    description:
      "Create visual content for brands, media, and digital platforms.",
    avgSalary: "GHS 1,500 - 15,000+ monthly (freelance potential)",
    growth: "High",
    education: "Creative Media / Design",
    shsPath: "Visual Arts / General Arts",
    keySubjects: ["Graphic Design", "ICT", "General Knowledge in Art"],
    outlook: "Demand rising with digital content creation and advertising.",
  },
  {
    id: 6,
    title: "Engineer (Electrical, Civil, Mechanical)",
    category: "STEM",
    icon: "🛠️",
    description:
      "Design, build, and maintain structures, machines, and systems.",
    avgSalary: "GHS 3,000 - 20,000+ monthly",
    growth: "High",
    education: "Engineering",
    shsPath: "General Science",
    keySubjects: ["Elective Maths", "Physics", "Chemistry"],
    outlook: "Growing demand in Ghana's infrastructure and energy sector.",
  },
  {
    id: 7,
    title: "Entrepreneur / Business Owner",
    category: "Business",
    icon: "🚀",
    description:
      "Start and manage businesses across sectors like tech, retail, logistics, and services.",
    avgSalary: "Varies widely (high earning potential)",
    growth: "Very High",
    education: "Business / Any",
    shsPath: "Business / Any",
    keySubjects: ["Business Management", "Economics", "ICT"],
    outlook:
      "Ghana's startup ecosystem expanding, with global market access online.",
  },
  {
    id: 8,
    title: "Journalist / Media Presenter",
    category: "Communication",
    icon: "🎤",
    description:
      "Report news, create content, and present stories to the public via media platforms.",
    avgSalary: "GHS 1,500 - 10,000+ monthly",
    growth: "Moderate",
    education: "Journalism / Communication",
    shsPath: "General Arts",
    keySubjects: ["English", "Literature", "Government", "ICT"],
    outlook:
      "Media is getting louder in Ghana. If you love talking, writing, or telling real stories, this field needs you. Digital news and social media are blowing up so there are more ways to shine.",
  },
  {
    id: 9,
    title: "Digital Marketer",
    category: "Creative",
    icon: "📱",
    description:
      "Promote brands online through social media, content, ads, SEO, and analytics.",
    avgSalary: "Competitive",
    growth: "Very High",
    education: "Marketing or any discipline",
    shsPath: "General Arts, Business, Any",
    keySubjects: ["ICT", "English", "Economics"],
    outlook:
      "Growing need as businesses shift online and e commerce expands.",
  },
  {
    id: 10,
    title: "Agribusiness Specialist",
    category: "Agriculture",
    icon: "🌾",
    description:
      "Manage agricultural production, processing, and distribution systems.",
    avgSalary: "Good",
    growth: "High",
    education: "Agribusiness or Agriculture",
    shsPath: "Science or General Arts",
    keySubjects: ["Biology", "Economics", "Integrated Science"],
    outlook:
      "Food security and modern farming are creating more opportunities in Ghana.",
  },{
    id: 11,
    title: "Cybersecurity Analyst",
    category: "Technology",
    icon: "🛡️",
    description:
      "Protect systems, data, and networks from digital threats and cyber attacks.",
    avgSalary: "Very competitive",
    growth: "Very High",
    education: "Cybersecurity or IT",
    shsPath: "Science or General Arts with ICT",
    keySubjects: ["Mathematics", "ICT", "Physics"],
    outlook:
      "High demand as digital systems expand in banking, government, and business.",
  },
  {
    id: 12,
    title: "Pharmacist",
    category: "Health",
    icon: "💊",
    description:
      "Prepare and dispense medications and guide safe use of drugs.",
    avgSalary: "Very good",
    growth: "High",
    education: "Pharmacy",
    shsPath: "Science",
    keySubjects: ["Biology", "Chemistry", "Mathematics"],
    outlook:
      "Strong demand in hospitals, pharmacies, and pharmaceutical companies.",
  },
  {
    id: 13  ,
    title: "Lawyer",
    category: "Law",
    icon: "⚖️",
    description:
      "Represent clients in legal matters and provide legal advice for cases and business issues.",
    avgSalary: "Very competitive",
    growth: "High",
    education: "Law",
    shsPath: "General Arts",
    keySubjects: ["Government", "Literature", "English", "History"],
    outlook:
      "People will always need lawyers. Ghana needs smart people to fight for fairness and support business growth. If you love debating and defending what is right this is for you.",
  },
  {
    id: 14,
    title: "Psychologist",
    category: "Social Sciences",
    icon: "🧠",
    description:
      "Study human behavior and support mental and emotional wellness.",
    avgSalary: "Good",
    growth: "High",
    education: "Psychology",
    shsPath: "General Arts",
    keySubjects: ["Social Studies", "Economics", "English"],
    outlook:
      "More demand in schools, hospitals, and corporate institutions in Ghana.",
  },
  {
    id: 15,
    title: "Sociologist",
    category: "Social Sciences",
    icon: "🌍",
    description:
      "Study communities, social behavior, and cultural trends to inform policy and development.",
    avgSalary: "Moderate",
    growth: "High",
    education: "Sociology",
    shsPath: "General Arts",
    keySubjects: ["Social Studies", "Economics", "English"],
    outlook:
      "Communities are changing every day. Ghana needs researchers to study society and help leaders make better decisions for everyone. Very useful for NGOs and government jobs.",
  },
  {
    id: 16,
    title: "Public Relations Officer",
    category: "Business and Media",
    icon: "📣",
    description:
      "Manage communication between organizations and the public and maintain brand image.",
    avgSalary: "Good",
    growth: "High",
    education: "Public Relations or Communication",
    shsPath: "General Arts",
    keySubjects: ["English", "Literature", "ICT", "Economics"],
    outlook:
      "Brands and influencers need communication experts who know how to manage image and speak well. If you love social media and public speaking you fit right in.",
  },
  {
    id: 17,
    title: "Diplomat",
    category: "Government and International Relations",
    icon: "🌐",
    description:
      "Represent Ghana in foreign countries and work on global cooperation and diplomacy.",
    avgSalary: "Very good",
    growth: "Moderate",
    education: "International Relations or Political Science",
    shsPath: "General Arts",
    keySubjects: ["Government", "History", "English", "Social Studies"],
    outlook:
      "Ghana is building more global connections. We need confident and smart young people who can represent us internationally and help build peace and business partnerships.",
  },
  {
    id: 18,
    title: "Teacher (Humanities)",
    category: "Education",
    icon: "📚",
    description:
      "Teach subjects like English, History, Government, Literature, and Languages.",
    avgSalary: "Moderate",
    growth: "High",
    education: "Education or Humanities",
    shsPath: "General Arts",
    keySubjects: ["English", "Literature", "History", "French or other language"],
    outlook:
      "Teachers will always be needed in Ghana. More schools and growing population means strong demand. If you enjoy helping others learn, this path fits you well.",
  },
  {
    id: 19,
    title: "Linguist",
    category: "Language and Culture",
    icon: "🗣️",
    description:
      "Study languages and support communication and development of language related programs.",
    avgSalary: "Moderate",
    growth: "High",
    education: "Linguistics",
    shsPath: "General Arts",
    keySubjects: ["English", "Literature", "French or other language"],
    outlook:
      "Languages connect people. Ghana needs people who understand local and foreign languages for media, education, and international work. Speaking more than one language is a big advantage.",
  },
  {
    id: 20,
    title: "Social Worker",
    category: "Social Development",
    icon: "🤝",
    description:
      "Support vulnerable groups and communities and provide welfare guidance.",
    avgSalary: "Moderate",
    growth: "High",
    education: "Social Work",
    shsPath: "General Arts",
    keySubjects: ["Social Studies", "Economics", "English"],
    outlook:
      "Many families and young people need support in Ghana. Government agencies, charities, and schools need trained social workers to help build stronger communities.",
  },
  {
    id: 21,
    title: "Human Resource Manager",
    category: "Business",
    icon: "👥",
    description:
      "Manage employee recruitment, training, performance, and workplace culture.",
    avgSalary: "Good",
    growth: "Very High",
    education: "Human Resource Management or Business Administration",
    shsPath: "General Arts or Business",
    keySubjects: ["Economics", "English", "Social Studies", "ICT"],
    outlook:
      "Almost every company needs HR staff. As Ghana grows and more companies hire, HR professionals who understand people and business are in serious demand.",
  }
];

export function getCareerBySlug(slug: string): CareerPath | undefined {
  return careerPaths.find((career) => {
    const careerSlug = career.title
      .toLowerCase()
      .replace(/\s*\/\s*/g, "-") // Replace " / " or "/" with single dash
      .replace(/\s+/g, "-") // Replace spaces with dash
      .replace(/--+/g, "-") // Replace multiple dashes with single dash
      .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
    return careerSlug === slug;
  });
}
