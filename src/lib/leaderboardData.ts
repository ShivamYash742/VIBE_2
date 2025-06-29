
export interface Student {
  id: string;
  name: string;
  field: string;
  points: number;
  rank: number;
  avatar: string;
  skills: string[];
  badges: { name: string; icon: string }[];
  projects: number;
  quizzes: number;
}

export const topStudents: Student[] = [
  {
    id: "1",
    name: "Alex Johnson",
    field: "AI & Machine Learning",
    points: 9750,
    rank: 1,
    avatar: "https://i.pravatar.cc/150?img=1",
    skills: ["Python", "TensorFlow", "PyTorch", "Data Analysis", "Neural Networks"],
    badges: [
      { name: "AI Master", icon: "award" },
      { name: "Dataset Guru", icon: "database" }
    ],
    projects: 12,
    quizzes: 87
  },
  {
    id: "2",
    name: "Samantha Chen",
    field: "Web Development",
    points: 8900,
    rank: 2,
    avatar: "https://i.pravatar.cc/150?img=2",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS"],
    badges: [
      { name: "Frontend Wizard", icon: "layout" },
      { name: "Code Reviewer", icon: "code" }
    ],
    projects: 15,
    quizzes: 72
  },
  {
    id: "3",
    name: "Marcus Williams",
    field: "Cybersecurity",
    points: 8500,
    rank: 3,
    avatar: "https://i.pravatar.cc/150?img=3",
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "Penetration Testing"],
    badges: [
      { name: "Security Expert", icon: "shield" },
      { name: "Bug Hunter", icon: "bug" }
    ],
    projects: 8,
    quizzes: 92
  },
  {
    id: "4",
    name: "Priya Patel",
    field: "Data Science",
    points: 7800,
    rank: 4,
    avatar: "https://i.pravatar.cc/150?img=4",
    skills: ["SQL", "R", "Python", "Data Visualization", "Machine Learning"],
    badges: [
      { name: "Analytics Pro", icon: "bar-chart" },
      { name: "Data Explorer", icon: "search" }
    ],
    projects: 10,
    quizzes: 68
  },
  {
    id: "5",
    name: "David Kim",
    field: "Computer Science",
    points: 7200,
    rank: 5,
    avatar: "https://i.pravatar.cc/150?img=5",
    skills: ["Algorithms", "Data Structures", "Java", "C++", "System Design"],
    badges: [
      { name: "Algorithm Genius", icon: "cpu" },
      { name: "Problem Solver", icon: "puzzle" }
    ],
    projects: 6,
    quizzes: 76
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    field: "Web Development",
    points: 6950,
    rank: 6,
    avatar: "https://i.pravatar.cc/150?img=6",
    skills: ["React", "Vue.js", "GraphQL", "AWS", "Firebase"],
    badges: [
      { name: "Full-stack Developer", icon: "layers" },
      { name: "Cloud Expert", icon: "cloud" }
    ],
    projects: 9,
    quizzes: 64
  },
  {
    id: "7",
    name: "James Wilson",
    field: "AI & Machine Learning",
    points: 6800,
    rank: 7,
    avatar: "https://i.pravatar.cc/150?img=7",
    skills: ["Deep Learning", "Computer Vision", "NLP", "Reinforcement Learning"],
    badges: [
      { name: "AI Researcher", icon: "brain" },
      { name: "Model Optimizer", icon: "trending-up" }
    ],
    projects: 7,
    quizzes: 82
  },
  {
    id: "8",
    name: "Zoe Garcia",
    field: "Cybersecurity",
    points: 6500,
    rank: 8,
    avatar: "https://i.pravatar.cc/150?img=8",
    skills: ["Security Audits", "Malware Analysis", "OWASP", "Incident Response"],
    badges: [
      { name: "Threat Hunter", icon: "search" },
      { name: "Defense Specialist", icon: "shield" }
    ],
    projects: 5,
    quizzes: 88
  },
  {
    id: "9",
    name: "Michael Thompson",
    field: "Data Science",
    points: 6200,
    rank: 9,
    avatar: "https://i.pravatar.cc/150?img=9",
    skills: ["Data Mining", "Predictive Modeling", "Statistical Analysis", "Big Data"],
    badges: [
      { name: "Prediction Master", icon: "trending-up" },
      { name: "Visualization Expert", icon: "pie-chart" }
    ],
    projects: 8,
    quizzes: 58
  },
  {
    id: "10",
    name: "Sophia Lee",
    field: "Computer Science",
    points: 5900,
    rank: 10,
    avatar: "https://i.pravatar.cc/150?img=10",
    skills: ["Distributed Systems", "Operating Systems", "Database Design", "Cloud Computing"],
    badges: [
      { name: "System Architect", icon: "server" },
      { name: "Database Guru", icon: "database" }
    ],
    projects: 11,
    quizzes: 60
  },
  {
    id: "11",
    name: "Liam Johnson",
    field: "Web Development",
    points: 5700,
    rank: 11,
    avatar: "https://i.pravatar.cc/150?img=11",
    skills: ["Angular", "Express.js", "MongoDB", "DevOps", "Testing"],
    badges: [
      { name: "CI/CD Expert", icon: "git-branch" },
      { name: "Test Champion", icon: "check-circle" }
    ],
    projects: 14,
    quizzes: 54
  },
  {
    id: "12",
    name: "Ava Martinez",
    field: "AI & Machine Learning",
    points: 5600,
    rank: 12,
    avatar: "https://i.pravatar.cc/150?img=12",
    skills: ["Robotics", "Computer Vision", "Sensor Fusion", "Embedded ML"],
    badges: [
      { name: "Robotics Pioneer", icon: "cpu" },
      { name: "Vision Specialist", icon: "eye" }
    ],
    projects: 6,
    quizzes: 75
  }
];

export const getStudentsByField = (field: string): Student[] => {
  return topStudents.filter(student => student.field === field)
    .sort((a, b) => b.points - a.points)
    .map((student, index) => ({
      ...student,
      rank: index + 1
    }));
};

export const getAllFields = (): string[] => {
  const fields = new Set(topStudents.map(student => student.field));
  return Array.from(fields);
};
