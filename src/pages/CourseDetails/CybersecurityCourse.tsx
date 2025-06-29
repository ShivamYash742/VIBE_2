import React, { useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Play,
  ArrowLeft,
  Shield,
  Code,
  Lock,
  Server,
  Award,
  AlertTriangle,
  FileCode,
  Network,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import { useScrollAnimation } from "../../lib/animations";

interface CourseModule {
  title: string;
  duration: string;
  lessons: { title: string; duration: string }[];
}

const CybersecurityCourse: React.FC = () => {
  // Add useLayoutEffect to force scroll to top before rendering
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useScrollAnimation();

  // Keep the existing useEffect as a fallback
  useEffect(() => {
    // Delay slight to ensure DOM is ready
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Course-specific data
  const courseDetails = {
    id: 3,
    title: "Cybersecurity for the Modern Enterprise",
    description:
      "Develop comprehensive cybersecurity skills for protecting modern enterprises from evolving threats. This course covers network security, penetration testing, threat analysis, and security governance. Designed for IT professionals and security enthusiasts who want to advance their careers in the rapidly growing field of cybersecurity.",
    instructor: "James Wilson",
    instructorBio:
      "James Wilson is a cybersecurity expert with over 15 years of experience in the field. He has worked as a security consultant for Fortune 500 companies and government agencies, specializing in penetration testing and security architecture. He holds CISSP, CEH, and OSCP certifications.",
    instructorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    duration: "6h 15m",
    category: "Security",
    rating: 4.7,
    studentsCount: 28750,
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    learningOutcomes: [
      "Understand modern cybersecurity threats and attack vectors",
      "Implement effective network security measures",
      "Conduct basic penetration testing and vulnerability assessments",
      "Develop incident response and recovery plans",
      "Apply security governance and compliance frameworks",
      "Secure cloud environments and containerized applications",
    ],
    requirements: [
      "Basic understanding of networking concepts",
      "Familiarity with operating systems (Windows, Linux)",
      "Some programming or scripting knowledge is helpful",
      "No prior cybersecurity experience required",
    ],
    modules: [
      {
        title: "Cybersecurity Fundamentals",
        duration: "1h 30m",
        lessons: [
          { title: "The Cybersecurity Landscape", duration: "20m" },
          { title: "Common Attack Vectors", duration: "25m" },
          { title: "Security Principles and Frameworks", duration: "25m" },
          { title: "Security Roles and Responsibilities", duration: "20m" },
        ],
      },
      {
        title: "Network Security",
        duration: "1h 45m",
        lessons: [
          { title: "Network Security Architecture", duration: "25m" },
          { title: "Firewalls and IDS/IPS", duration: "25m" },
          { title: "VPNs and Secure Remote Access", duration: "20m" },
          { title: "Network Monitoring and Analysis", duration: "35m" },
        ],
      },
      {
        title: "Vulnerability Assessment & Penetration Testing",
        duration: "1h 30m",
        lessons: [
          { title: "Vulnerability Scanning Tools", duration: "25m" },
          { title: "Penetration Testing Methodology", duration: "25m" },
          { title: "Exploitation Techniques", duration: "20m" },
          { title: "Reporting and Remediation", duration: "20m" },
        ],
      },
      {
        title: "Security Governance & Compliance",
        duration: "1h 30m",
        lessons: [
          { title: "Security Policies and Standards", duration: "20m" },
          {
            title: "Regulatory Compliance (GDPR, HIPAA, etc.)",
            duration: "25m",
          },
          { title: "Risk Assessment and Management", duration: "25m" },
          { title: "Security Awareness Training", duration: "20m" },
        ],
      },
    ],
    tools: [
      { name: "Wireshark", icon: <Network size={20} /> },
      { name: "Metasploit", icon: <Shield size={20} /> },
      { name: "Nmap", icon: <Server size={20} /> },
      { name: "Burp Suite", icon: <Lock size={20} /> },
    ],
    certificates: [
      { name: "Course Completion", icon: <Award size={20} /> },
      { name: "Security Specialist", icon: <Award size={20} /> },
    ],
    securityLabs: [
      {
        title: "Network Traffic Analysis",
        description:
          "Analyze network traffic to identify suspicious patterns and potential threats.",
        difficulty: "Beginner",
        icon: <Network size={20} />,
      },
      {
        title: "Web Application Security",
        description:
          "Identify and exploit common web vulnerabilities like SQL injection and XSS.",
        difficulty: "Intermediate",
        icon: <FileCode size={20} />,
      },
      {
        title: "Incident Response Simulation",
        description:
          "Respond to a simulated security breach and implement recovery procedures.",
        difficulty: "Advanced",
        icon: <AlertTriangle size={20} />,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section - Security themed */}
        <div className="relative bg-gradient-to-r from-gray-900 to-red-900 py-16 mb-12">
          <div className="absolute inset-0 bg-binary-pattern opacity-5"></div>
          <div className="absolute inset-0">
            <div className="security-scan-line"></div>
          </div>
          <Container maxWidth="lg" className="relative z-10">
            <Link
              to="/courses"
              className="mb-6 text-red-300 hover:text-red-100 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Courses
            </Link>

            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-red-500 h-12 w-12" />
                  <AlertTriangle className="text-yellow-500 h-8 w-8" />
                </div>
                <Typography
                  variant="h2"
                  className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll"
                >
                  {courseDetails.title}
                </Typography>

                <div className="flex flex-wrap gap-4 mb-6">
                  <Chip
                    icon={<Clock className="text-red-400" size={16} />}
                    label={courseDetails.duration}
                    className="bg-gray-800/80 text-white border border-red-900/50"
                  />
                  <Chip
                    icon={<Users className="text-red-400" size={16} />}
                    label={`${courseDetails.studentsCount.toLocaleString()} students`}
                    className="bg-gray-800/80 text-white border border-red-900/50"
                  />
                  <Chip
                    icon={<Star className="text-yellow-400" size={16} />}
                    label={`${courseDetails.rating} rating`}
                    className="bg-gray-800/80 text-white border border-red-900/50"
                  />
                  <Chip
                    icon={<BookOpen className="text-red-400" size={16} />}
                    label={courseDetails.category}
                    className="bg-gray-800/80 text-white border border-red-900/50"
                  />
                </div>

                <Typography className="text-red-200 text-lg mb-4">
                  by{" "}
                  <span className="text-white font-medium">
                    {courseDetails.instructor}
                  </span>
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Security-themed panel */}
                <div className="glass-panel p-6 rounded-xl border border-red-500/30 bg-gradient-to-br from-gray-900/90 to-red-900/90 backdrop-blur">
                  <img
                    src={courseDetails.image}
                    alt={courseDetails.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />

                  <Typography
                    variant="h4"
                    className="text-2xl font-bold text-white mb-6"
                  >
                    ${courseDetails.price}
                  </Typography>

                  <Link
                    to={`/courses/3/learn`}
                    className="bg-neon-purple hover:bg-neon-purple/90 text-white mb-4 py-3 px-4 rounded flex items-center justify-center gap-2 w-full"
                  >
                    <Play size={18} />
                    Start Learning
                  </Link>

                  <Link
                    to={`/courses/3/wishlist`}
                    className="border border-neon-purple text-neon-purple hover:bg-neon-purple/10 py-3 px-4 rounded flex items-center justify-center w-full"
                  >
                    Add to Wishlist
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>

        {/* Course Content */}
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              {/* About This Course */}
              <div className="glass-panel p-8 rounded-xl mb-8">
                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-white mb-4"
                >
                  About This Course
                </Typography>
                <Typography className="text-muted-foreground mb-8">
                  {courseDetails.description}
                </Typography>

                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-white mb-4"
                >
                  What You'll Learn
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {courseDetails.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-1">
                        <BookOpen size={14} className="text-neon-purple" />
                      </div>
                      <Typography className="text-muted-foreground">
                        {outcome}
                      </Typography>
                    </div>
                  ))}
                </div>

                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-white mb-4"
                >
                  Requirements
                </Typography>
                <div className="mb-8">
                  {courseDetails.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3 mb-3">
                      <div className="w-6 h-6 rounded-full bg-accent/60 flex items-center justify-center mt-1">
                        <Star size={14} className="text-yellow-400" />
                      </div>
                      <Typography className="text-muted-foreground">
                        {requirement}
                      </Typography>
                    </div>
                  ))}
                </div>

                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-white mb-4"
                >
                  Tools & Technologies
                </Typography>
                <div className="flex flex-wrap gap-3 mb-8">
                  {courseDetails.tools.map((tool, index) => (
                    <Chip
                      key={index}
                      icon={<div className="text-neon-purple">{tool.icon}</div>}
                      label={tool.name}
                      className="bg-accent/60 text-white"
                    />
                  ))}
                </div>

                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-white mb-4"
                >
                  Certificates
                </Typography>
                <div className="flex flex-wrap gap-3 mb-8">
                  {courseDetails.certificates.map((certificate, index) => (
                    <Chip
                      key={index}
                      icon={
                        <div className="text-yellow-400">
                          {certificate.icon}
                        </div>
                      }
                      label={certificate.name}
                      className="bg-accent/60 text-white"
                    />
                  ))}
                </div>
              </div>

              {/* Course Modules */}
              <div className="glass-panel p-8 rounded-xl mb-8">
                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-white mb-6"
                >
                  Course Content
                </Typography>

                <div className="space-y-4">
                  {courseDetails.modules.map((module, moduleIndex) => (
                    <div
                      key={moduleIndex}
                      className="border border-white/10 rounded-lg overflow-hidden"
                    >
                      <div className="bg-accent/30 p-4 flex justify-between items-center">
                        <div>
                          <Typography className="font-medium text-white">
                            {module.title}
                          </Typography>
                          <Typography className="text-sm text-muted-foreground">
                            {module.lessons.length} lessons • {module.duration}
                          </Typography>
                        </div>
                        <div>
                          <button className="text-neon-purple hover:text-neon-purple/80 transition-colors">
                            Expand
                          </button>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <Play size={14} className="text-neon-purple" />
                              <Typography className="text-muted-foreground">
                                {lesson.title}
                              </Typography>
                            </div>
                            <Typography className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hands-on Security Labs */}
              <div className="glass-panel p-8 rounded-xl mb-8">
                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-white mb-4"
                >
                  Hands-on Security Labs
                </Typography>
                <Typography className="text-muted-foreground mb-6">
                  Apply what you learn with our interactive security labs. These
                  practical exercises will help you develop real-world
                  cybersecurity skills in a safe, controlled environment.
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {courseDetails.securityLabs.map((lab, index) => (
                    <div
                      key={index}
                      className="bg-accent/30 p-6 rounded-lg border border-white/10"
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent/60 flex items-center justify-center mb-4">
                        <div className="text-neon-purple">{lab.icon}</div>
                      </div>
                      <Typography className="text-white font-medium mb-2">
                        {lab.title}
                      </Typography>
                      <Typography className="text-muted-foreground text-sm mb-3">
                        {lab.description}
                      </Typography>
                      <Chip
                        label={lab.difficulty}
                        className={`${
                          lab.difficulty === "Beginner"
                            ? "bg-green-500/20 text-green-400"
                            : lab.difficulty === "Intermediate"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                        size="small"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Certifications */}
              <div className="glass-panel p-8 rounded-xl mb-8">
                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-white mb-4"
                >
                  Prepare for Industry Certifications
                </Typography>
                <Typography className="text-muted-foreground mb-6">
                  This course helps prepare you for these industry-recognized
                  cybersecurity certifications:
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-accent/30 p-6 rounded-lg border border-white/10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/60 flex items-center justify-center">
                      <Shield size={24} className="text-neon-purple" />
                    </div>
                    <div>
                      <Typography className="text-white font-medium mb-1">
                        CompTIA Security+
                      </Typography>
                      <Typography className="text-muted-foreground text-sm">
                        Foundation-level security certification covering network
                        security, compliance, and risk management.
                      </Typography>
                    </div>
                  </div>
                  <div className="bg-accent/30 p-6 rounded-lg border border-white/10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/60 flex items-center justify-center">
                      <Lock size={24} className="text-neon-purple" />
                    </div>
                    <div>
                      <Typography className="text-white font-medium mb-1">
                        Certified Ethical Hacker (CEH)
                      </Typography>
                      <Typography className="text-muted-foreground text-sm">
                        Certification for security professionals who want to
                        understand how to find vulnerabilities in systems.
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Instructor Info */}
              <div className="glass-panel p-6 rounded-xl mb-6">
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-white mb-4"
                >
                  Your Instructor
                </Typography>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={courseDetails.instructorImage}
                    alt={courseDetails.instructor}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <Typography className="font-medium text-white">
                      {courseDetails.instructor}
                    </Typography>
                    <Typography className="text-sm text-muted-foreground">
                      Cybersecurity Expert & Consultant
                    </Typography>
                  </div>
                </div>
                <Typography className="text-muted-foreground text-sm mb-4">
                  {courseDetails.instructorBio}
                </Typography>
                <Link
                  to={`/instructor/james-wilson`}
                  className="text-neon-purple hover:text-neon-purple/80 transition-colors text-sm font-medium"
                >
                  View Full Profile
                </Link>
              </div>

              {/* Related Courses */}
              <div className="glass-panel p-6 rounded-xl mb-6">
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-white mb-4"
                >
                  Related Courses
                </Typography>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop"
                      alt="Blockchain"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <Link
                        to="/courses/4"
                        className="hover:opacity-80 transition-colors"
                      >
                        <Typography className="font-medium text-white text-sm">
                          Blockchain Technology & Cryptocurrency
                        </Typography>
                        <Typography className="text-xs text-muted-foreground">
                          Alex Johnson • 7h 45m
                        </Typography>
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                      alt="Cloud Computing"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <Link
                        to="/courses/5"
                        className="hover:opacity-80 transition-colors"
                      >
                        <Typography className="font-medium text-white text-sm">
                          Cloud Computing: AWS Solutions Architect
                        </Typography>
                        <Typography className="text-xs text-muted-foreground">
                          Mark Zhang • 11h 15m
                        </Typography>
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop"
                      alt="Frontend Development"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <Link
                        to="/courses/6"
                        className="hover:opacity-80 transition-colors"
                      >
                        <Typography className="font-medium text-white text-sm">
                          Frontend Development with React & TypeScript
                        </Typography>
                        <Typography className="text-xs text-muted-foreground">
                          Emma Rodriguez • 12h 20m
                        </Typography>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Opportunities */}
              <div className="glass-panel p-6 rounded-xl">
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-white mb-4"
                >
                  Career Opportunities
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center">
                      <Shield size={20} className="text-neon-purple" />
                    </div>
                    <div>
                      <Typography className="font-medium text-white text-sm">
                        Security Analyst
                      </Typography>
                      <Typography className="text-xs text-muted-foreground">
                        Avg. Salary: $85,000 - $110,000
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center">
                      <Lock size={20} className="text-neon-purple" />
                    </div>
                    <div>
                      <Typography className="font-medium text-white text-sm">
                        Penetration Tester
                      </Typography>
                      <Typography className="text-xs text-muted-foreground">
                        Avg. Salary: $90,000 - $130,000
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center">
                      <Server size={20} className="text-neon-purple" />
                    </div>
                    <div>
                      <Typography className="font-medium text-white text-sm">
                        Security Engineer
                      </Typography>
                      <Typography className="text-xs text-muted-foreground">
                        Avg. Salary: $100,000 - $150,000
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center">
                      <Users size={20} className="text-neon-purple" />
                    </div>
                    <div>
                      <Typography className="font-medium text-white text-sm">
                        Chief Information Security Officer (CISO)
                      </Typography>
                      <Typography className="text-xs text-muted-foreground">
                        Avg. Salary: $150,000 - $250,000+
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default CybersecurityCourse;
