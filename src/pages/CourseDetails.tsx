import React, { useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import { Clock, Users, Star, BookOpen, Play, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { useScrollAnimation } from "../lib/animations";

interface CourseDetails {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  category: string;
  rating: number;
  studentsCount: number;
  price: number;
  image: string;
  featured?: boolean;
  learningOutcomes: string[];
}

// Sample course database
const coursesData: CourseDetails[] = [
  {
    id: 1,
    title: "Advanced Machine Learning & AI Fundamentals",
    description:
      "A comprehensive course covering the fundamentals of machine learning and AI including algorithms, neural networks, and practical applications. This course is designed for intermediate learners with basic programming knowledge.",
    instructor: "Dr. Sarah Chen",
    duration: "8h 45m",
    category: "Technology",
    rating: 4.9,
    studentsCount: 34582,
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    learningOutcomes: [
      "Understand Machine Learning fundamentals",
      "Master AI algorithms and techniques",
      "Build practical ML models",
      "Deploy AI applications",
      "Understand ethical considerations in AI",
    ],
  },
  {
    id: 2,
    title: "Quantum Computing: Theory & Practice",
    description:
      "Explore the fascinating world of quantum computing, from theoretical foundations to practical implementations. Learn about qubits, quantum gates, and quantum algorithms with hands-on exercises.",
    instructor: "Prof. Michael Dawkins",
    duration: "10h 30m",
    category: "Physics",
    rating: 4.8,
    studentsCount: 12350,
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2232&auto=format&fit=crop",
    featured: true,
    learningOutcomes: [
      "Understand quantum mechanics principles",
      "Learn quantum computing fundamentals",
      "Implement quantum algorithms",
      "Explore quantum programming frameworks",
      "Analyze quantum computing applications",
    ],
  },
  {
    id: 3,
    title: "Cybersecurity for the Modern Enterprise",
    description:
      "Develop comprehensive cybersecurity skills for protecting modern enterprises from evolving threats. Learn about network security, penetration testing, and security governance.",
    instructor: "James Wilson",
    duration: "6h 15m",
    category: "Security",
    rating: 4.7,
    studentsCount: 28750,
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    learningOutcomes: [
      "Understand modern cybersecurity threats",
      "Implement network security measures",
      "Conduct penetration testing",
      "Develop incident response plans",
      "Apply security governance frameworks",
    ],
  },
];

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useScrollAnimation();

  // Add scroll to top functionality
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Additional delayed scroll to ensure page is at the top
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Extract course ID from the URL parameter (which might include a slug)
  const courseId = parseInt(id?.split("-")[0] || "0");

  // Check if this course has a specialized page
  useEffect(() => {
    // No redirects - all courses now use ID-based navigation
    // This ensures consistent navigation by course ID
  }, [courseId, navigate]);

  // Find the course by ID
  const courseDetails =
    coursesData.find((course) => course.id === courseId) || coursesData[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-gray-900 to-slate-800 py-16 mb-12">
          <div className="absolute inset-0 bg-glow-purple opacity-10"></div>
          <Container maxWidth="lg" className="relative z-10">
            <Link
              to="/courses"
              className="mb-6 text-white hover:text-neon-purple transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Courses
            </Link>

            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h2"
                  className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll"
                >
                  {courseDetails.title}
                </Typography>

                <div className="flex flex-wrap gap-4 mb-6">
                  <Chip
                    icon={<Clock className="text-neon-purple" size={16} />}
                    label={courseDetails.duration}
                    className="bg-accent/60 text-white"
                  />
                  <Chip
                    icon={<Users className="text-neon-purple" size={16} />}
                    label={`${courseDetails.studentsCount.toLocaleString()} students`}
                    className="bg-accent/60 text-white"
                  />
                  <Chip
                    icon={<Star className="text-yellow-400" size={16} />}
                    label={`${courseDetails.rating} rating`}
                    className="bg-accent/60 text-white"
                  />
                  <Chip
                    icon={<BookOpen className="text-neon-purple" size={16} />}
                    label={courseDetails.category}
                    className="bg-accent/60 text-white"
                  />
                </div>

                <Typography className="text-muted-foreground text-lg mb-4">
                  by{" "}
                  <span className="text-white font-medium">
                    {courseDetails.instructor}
                  </span>
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <div className="glass-panel p-6 rounded-xl">
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
                    to={`/courses/${courseId}/learn`}
                    className="bg-neon-purple hover:bg-neon-purple/90 text-white mb-4 py-3 px-4 rounded flex items-center justify-center gap-2 w-full"
                  >
                    <Play size={18} />
                    Start Learning
                  </Link>

                  <Link
                    to={`/courses/${courseId}/wishlist`}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default CourseDetails;
