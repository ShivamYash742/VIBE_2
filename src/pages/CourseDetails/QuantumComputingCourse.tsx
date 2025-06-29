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
  Atom,
  Code,
  Calculator,
  Lightbulb,
  Award,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import { useScrollAnimation } from "../../lib/animations";

interface CourseModule {
  title: string;
  duration: string;
  lessons: { title: string; duration: string }[];
}

const QuantumComputingCourse: React.FC = () => {
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
    id: 2,
    title: "Quantum Computing: Theory & Practice",
    description:
      "Explore the fascinating world of quantum computing in this comprehensive course. From quantum mechanics fundamentals to programming quantum algorithms, this course covers both theoretical concepts and practical applications. Designed for students with a background in physics or computer science who want to understand the next frontier of computing technology.",
    instructor: "Prof. Michael Dawkins",
    instructorBio:
      "Prof. Michael Dawkins is a quantum physicist with over 20 years of experience in the field. He has worked at CERN, MIT's Quantum Lab, and currently leads quantum computing research at a major tech company. He has published over 50 papers on quantum computing and quantum mechanics.",
    instructorImage:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
    duration: "10h 30m",
    category: "Physics",
    rating: 4.8,
    studentsCount: 12350,
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2232&auto=format&fit=crop",
    featured: true,
    learningOutcomes: [
      "Understand quantum mechanics principles relevant to computing",
      "Learn quantum gates, circuits, and algorithms",
      "Master quantum programming using Qiskit and Q#",
      "Implement quantum algorithms like Shor's and Grover's",
      "Understand quantum error correction techniques",
      "Explore quantum machine learning applications",
    ],
    requirements: [
      "Basic understanding of linear algebra and complex numbers",
      "Familiarity with programming concepts",
      "Background in physics or computer science recommended",
      "No prior quantum mechanics knowledge required",
    ],
    modules: [
      {
        title: "Quantum Mechanics Fundamentals",
        duration: "2h 15m",
        lessons: [
          { title: "Introduction to Quantum Physics", duration: "30m" },
          { title: "Quantum States and Superposition", duration: "35m" },
          { title: "Quantum Entanglement", duration: "30m" },
          { title: "Quantum Measurement", duration: "40m" },
        ],
      },
      {
        title: "Quantum Computing Basics",
        duration: "2h 45m",
        lessons: [
          { title: "Qubits and Quantum Gates", duration: "35m" },
          { title: "Quantum Circuits", duration: "40m" },
          { title: "Quantum Logic", duration: "30m" },
          { title: "Quantum Algorithms Overview", duration: "30m" },
          { title: "Quantum vs. Classical Computing", duration: "30m" },
        ],
      },
      {
        title: "Quantum Programming",
        duration: "3h 00m",
        lessons: [
          { title: "Introduction to Qiskit", duration: "45m" },
          { title: "Building Quantum Circuits in Qiskit", duration: "45m" },
          { title: "Introduction to Q#", duration: "45m" },
          { title: "Quantum Simulators", duration: "45m" },
        ],
      },
      {
        title: "Advanced Quantum Algorithms",
        duration: "2h 30m",
        lessons: [
          { title: "Shor's Algorithm", duration: "45m" },
          { title: "Grover's Search Algorithm", duration: "45m" },
          { title: "Quantum Fourier Transform", duration: "30m" },
          { title: "Quantum Machine Learning", duration: "30m" },
        ],
      },
    ],
    tools: [
      { name: "Qiskit", icon: <Atom size={20} /> },
      { name: "Q#", icon: <Code size={20} /> },
      { name: "Python", icon: <Calculator size={20} /> },
      { name: "IBM Quantum Experience", icon: <Lightbulb size={20} /> },
    ],
    certificates: [
      { name: "Course Completion", icon: <Award size={20} /> },
      { name: "Quantum Computing Specialist", icon: <Award size={20} /> },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section - Quantum Computing themed */}
        <div className="relative bg-gradient-to-r from-indigo-900 to-blue-900 py-16 mb-12">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="quantum-particle-effect"></div>
          </div>
          <Container maxWidth="lg" className="relative z-10">
            <Link
              to="/courses"
              className="mb-6 text-blue-300 hover:text-blue-100 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Courses
            </Link>

            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <div className="animate-pulse-slow">
                  <Atom className="text-blue-300 h-12 w-12 mb-4" />
                </div>
                <Typography
                  variant="h2"
                  className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll"
                >
                  {courseDetails.title}
                </Typography>

                <div className="flex flex-wrap gap-4 mb-6">
                  <Chip
                    icon={<Clock className="text-blue-300" size={16} />}
                    label={courseDetails.duration}
                    className="bg-indigo-800/80 text-white"
                  />
                  <Chip
                    icon={<Users className="text-blue-300" size={16} />}
                    label={`${courseDetails.studentsCount.toLocaleString()} students`}
                    className="bg-indigo-800/80 text-white"
                  />
                  <Chip
                    icon={<Star className="text-yellow-400" size={16} />}
                    label={`${courseDetails.rating} rating`}
                    className="bg-indigo-800/80 text-white"
                  />
                  <Chip
                    icon={<BookOpen className="text-blue-300" size={16} />}
                    label={courseDetails.category}
                    className="bg-indigo-800/80 text-white"
                  />
                </div>

                <Typography className="text-blue-200 text-lg mb-4">
                  by{" "}
                  <span className="text-white font-medium">
                    {courseDetails.instructor}
                  </span>
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <div className="glass-panel p-6 rounded-xl border border-blue-500/30 bg-gradient-to-br from-indigo-900/90 to-blue-900/90 backdrop-blur">
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
                    to={`/courses/2/learn`}
                    className="bg-neon-purple hover:bg-neon-purple/90 text-white mb-4 py-3 px-4 rounded flex items-center justify-center gap-2 w-full"
                  >
                    <Play size={18} />
                    Start Learning
                  </Link>

                  <Link
                    to={`/courses/2/wishlist`}
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

              {/* Quantum Computing Simulator */}
              <div className="glass-panel p-8 rounded-xl mb-8">
                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-white mb-4"
                >
                  Interactive Quantum Circuit Simulator
                </Typography>
                <Typography className="text-muted-foreground mb-6">
                  This course includes access to our interactive quantum circuit
                  simulator, where you can build and test quantum circuits
                  without any additional software. Practice what you learn in
                  real-time with this powerful tool.
                </Typography>
                <div className="bg-accent/30 p-6 rounded-lg border border-white/10 flex flex-col items-center">
                  <Atom size={60} className="text-neon-purple mb-4" />
                  <Typography className="text-white font-medium mb-2">
                    Quantum Circuit Simulator
                  </Typography>
                  <Typography className="text-muted-foreground text-sm text-center mb-4">
                    Build, test, and visualize quantum circuits with our
                    interactive simulator
                  </Typography>
                  <Link
                    to="/quantum-simulator"
                    className="px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/90 transition-colors"
                  >
                    Launch Simulator
                  </Link>
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
                      Quantum Physicist & Researcher
                    </Typography>
                  </div>
                </div>
                <Typography className="text-muted-foreground text-sm mb-4">
                  {courseDetails.instructorBio}
                </Typography>
                <Link
                  to={`/instructor/michael-dawkins`}
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
                      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
                      alt="Machine Learning"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <Link
                        to="/courses/1"
                        className="hover:opacity-80 transition-colors"
                      >
                        <Typography className="font-medium text-white text-sm">
                          Advanced Machine Learning & AI Fundamentals
                        </Typography>
                        <Typography className="text-xs text-muted-foreground">
                          Dr. Sarah Chen • 8h 45m
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
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2124&auto=format&fit=crop"
                      alt="AI Ethics"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <Link
                        to="/courses/4"
                        className="hover:opacity-80 transition-colors"
                      >
                        <Typography className="font-medium text-white text-sm">
                          Artificial Intelligence Ethics & Governance
                        </Typography>
                        <Typography className="text-xs text-muted-foreground">
                          Dr. Lisa Patel • 5h 30m
                        </Typography>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Resources */}
              <div className="glass-panel p-6 rounded-xl">
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-white mb-4"
                >
                  Special Resources
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center">
                      <BookOpen size={20} className="text-neon-purple" />
                    </div>
                    <div>
                      <Typography className="font-medium text-white text-sm">
                        Quantum Computing Research Papers
                      </Typography>
                      <Typography className="text-xs text-muted-foreground mb-1">
                        Access to 25+ recent research papers
                      </Typography>
                      <Link
                        to="/resources/quantum-papers"
                        className="text-neon-purple text-xs hover:text-neon-purple/80 transition-colors"
                      >
                        Access Resources
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center">
                      <Lightbulb size={20} className="text-neon-purple" />
                    </div>
                    <div>
                      <Typography className="font-medium text-white text-sm">
                        IBM Quantum Experience Access
                      </Typography>
                      <Typography className="text-xs text-muted-foreground mb-1">
                        Special access to IBM's quantum computers
                      </Typography>
                      <Link
                        to="/resources/ibm-quantum"
                        className="text-neon-purple text-xs hover:text-neon-purple/80 transition-colors"
                      >
                        Access Resources
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center">
                      <Users size={20} className="text-neon-purple" />
                    </div>
                    <div>
                      <Typography className="font-medium text-white text-sm">
                        Quantum Computing Community
                      </Typography>
                      <Typography className="text-xs text-muted-foreground mb-1">
                        Join our exclusive community forum
                      </Typography>
                      <Link
                        to="/resources/quantum-community"
                        className="text-neon-purple text-xs hover:text-neon-purple/80 transition-colors"
                      >
                        Join Community
                      </Link>
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

export default QuantumComputingCourse;
