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
  Brain,
  Code,
  Database,
  Server,
  Award,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import { useScrollAnimation } from "../../lib/animations";

interface CourseModule {
  title: string;
  duration: string;
  lessons: { title: string; duration: string }[];
}

const MachineLearningCourse: React.FC = () => {
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
    id: 1,
    title: "Advanced Machine Learning & AI Fundamentals",
    description:
      "Dive deep into the world of Machine Learning and Artificial Intelligence with this comprehensive course. You'll learn the theoretical foundations and practical applications of ML algorithms, neural networks, and AI systems. This course is designed for intermediate learners who have basic programming knowledge and want to specialize in AI and ML technologies.",
    instructor: "Dr. Sarah Chen",
    instructorBio:
      "Dr. Sarah Chen is a leading AI researcher with over 15 years of experience in the field. She has worked at Google AI and Stanford's AI Lab, and has published numerous papers on machine learning algorithms and applications.",
    instructorImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    duration: "8h 45m",
    category: "Technology",
    rating: 4.9,
    studentsCount: 34582,
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    learningOutcomes: [
      "Understand Machine Learning fundamentals and algorithms",
      "Master neural networks and deep learning techniques",
      "Build practical ML models using Python and TensorFlow",
      "Deploy AI applications to production environments",
      "Understand ethical considerations in AI development",
      "Implement computer vision and natural language processing systems",
    ],
    requirements: [
      "Basic programming knowledge in Python",
      "Understanding of basic statistics and linear algebra",
      "A computer with at least 8GB RAM and modern CPU",
      "Enthusiasm to learn cutting-edge AI technologies",
    ],
    modules: [
      {
        title: "Introduction to Machine Learning",
        duration: "1h 30m",
        lessons: [
          { title: "What is Machine Learning?", duration: "15m" },
          { title: "Types of Machine Learning", duration: "20m" },
          { title: "Setting Up Your Development Environment", duration: "25m" },
          { title: "Your First ML Model", duration: "30m" },
        ],
      },
      {
        title: "Supervised Learning Algorithms",
        duration: "2h 15m",
        lessons: [
          { title: "Linear Regression", duration: "30m" },
          { title: "Logistic Regression", duration: "25m" },
          { title: "Decision Trees", duration: "30m" },
          { title: "Support Vector Machines", duration: "25m" },
          { title: "Practical Applications", duration: "25m" },
        ],
      },
      {
        title: "Neural Networks & Deep Learning",
        duration: "3h 00m",
        lessons: [
          { title: "Introduction to Neural Networks", duration: "30m" },
          {
            title: "Building Neural Networks with TensorFlow",
            duration: "45m",
          },
          { title: "Convolutional Neural Networks", duration: "45m" },
          { title: "Recurrent Neural Networks", duration: "30m" },
          { title: "Transfer Learning", duration: "30m" },
        ],
      },
      {
        title: "Advanced AI Applications",
        duration: "2h 00m",
        lessons: [
          { title: "Computer Vision Systems", duration: "30m" },
          { title: "Natural Language Processing", duration: "30m" },
          { title: "Reinforcement Learning", duration: "30m" },
          { title: "Deploying ML Models", duration: "30m" },
        ],
      },
    ],
    tools: [
      { name: "Python", icon: <Code size={20} /> },
      { name: "TensorFlow", icon: <Brain size={20} /> },
      { name: "PyTorch", icon: <Database size={20} /> },
      { name: "Scikit-learn", icon: <Server size={20} /> },
    ],
    certificates: [
      { name: "Course Completion", icon: <Award size={20} /> },
      { name: "ML Specialist", icon: <Award size={20} /> },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section - AI/ML themed */}
        <div className="relative bg-gradient-to-r from-purple-900 to-indigo-900 py-16 mb-12">
          <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
          <div className="absolute inset-0">
            <div className="neural-network-animation"></div>
          </div>
          <Container maxWidth="lg" className="relative z-10">
            <Link
              to="/courses"
              className="mb-6 text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Courses
            </Link>

            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="text-purple-400 h-12 w-12" />
                  <div className="w-16 h-8 flex items-center justify-around">
                    <div className="data-point bg-purple-500"></div>
                    <div className="data-point bg-purple-300"></div>
                    <div className="data-point bg-purple-400"></div>
                  </div>
                </div>
                <Typography
                  variant="h2"
                  className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll"
                >
                  {courseDetails.title}
                </Typography>

                <div className="flex flex-wrap gap-4 mb-6">
                  <Chip
                    icon={<Clock className="text-purple-400" size={16} />}
                    label={courseDetails.duration}
                    className="bg-indigo-800/70 text-white border border-purple-500/30"
                  />
                  <Chip
                    icon={<Users className="text-purple-400" size={16} />}
                    label={`${courseDetails.studentsCount.toLocaleString()} students`}
                    className="bg-indigo-800/70 text-white border border-purple-500/30"
                  />
                  <Chip
                    icon={<Star className="text-yellow-400" size={16} />}
                    label={`${courseDetails.rating} rating`}
                    className="bg-indigo-800/70 text-white border border-purple-500/30"
                  />
                  <Chip
                    icon={<BookOpen className="text-purple-400" size={16} />}
                    label={courseDetails.category}
                    className="bg-indigo-800/70 text-white border border-purple-500/30"
                  />
                </div>

                <Typography className="text-purple-200 text-lg mb-4">
                  by{" "}
                  <span className="text-white font-medium">
                    {courseDetails.instructor}
                  </span>
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                {/* AI-themed panel */}
                <div className="glass-panel p-6 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur">
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
                    to={`/courses/1/learn`}
                    className="bg-neon-purple hover:bg-neon-purple/90 text-white mb-4 py-3 px-4 rounded flex items-center justify-center gap-2 w-full"
                  >
                    <Play size={18} />
                    Start Learning
                  </Link>

                  <Link
                    to={`/courses/1/wishlist`}
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
                      AI Researcher & Educator
                    </Typography>
                  </div>
                </div>
                <Typography className="text-muted-foreground text-sm mb-4">
                  {courseDetails.instructorBio}
                </Typography>
                <Link
                  to={`/instructor/sarah-chen`}
                  className="text-neon-purple hover:text-neon-purple/80 transition-colors text-sm font-medium"
                >
                  View Full Profile
                </Link>
              </div>

              {/* Related Courses */}
              <div className="glass-panel p-6 rounded-xl">
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-white mb-4"
                >
                  Related Courses
                </Typography>
                <div className="space-y-4">
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
                  <div className="flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2187&auto=format&fit=crop"
                      alt="Data Science"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <Link
                        to="/courses/5"
                        className="hover:opacity-80 transition-colors"
                      >
                        <Typography className="font-medium text-white text-sm">
                          Advanced Data Science with Python
                        </Typography>
                        <Typography className="text-xs text-muted-foreground">
                          Dr. Robert Lee • 9h 10m
                        </Typography>
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2232&auto=format&fit=crop"
                      alt="Quantum Computing"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <Link
                        to="/courses/2"
                        className="hover:opacity-80 transition-colors"
                      >
                        <Typography className="font-medium text-white text-sm">
                          Quantum Computing: Theory & Practice
                        </Typography>
                        <Typography className="text-xs text-muted-foreground">
                          Prof. Michael Dawkins • 10h 30m
                        </Typography>
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

export default MachineLearningCourse;
