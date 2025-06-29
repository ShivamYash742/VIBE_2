import { useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const courses = [
  {
    id: 1,
    title: "Advanced Machine Learning & AI Fundamentals",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    instructor: "Dr. Sarah Chen",
    rating: 4.9,
    studentsCount: 34582,
    duration: "8h 45m",
    progress: 65,
    featured: true,
  },
  {
    id: 2,
    title: "Quantum Computing: Theory & Practice",
    category: "Physics",
    image:
      "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2232&auto=format&fit=crop",
    instructor: "Prof. Michael Dawkins",
    rating: 4.8,
    studentsCount: 12350,
    duration: "10h 30m",
    featured: true,
  },
  {
    id: 3,
    title: "Cybersecurity for the Modern Enterprise",
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    instructor: "James Wilson",
    rating: 4.7,
    studentsCount: 28750,
    duration: "6h 15m",
    progress: 30,
  },
  {
    id: 4,
    title: "Frontend Development with React & TypeScript",
    category: "Programming",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop",
    instructor: "Emma Rodriguez",
    rating: 4.9,
    studentsCount: 42680,
    duration: "12h 20m",
  },
  {
    id: 5,
    title: "Blockchain Technology & Cryptocurrency",
    category: "Finance",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop",
    instructor: "Alex Johnson",
    rating: 4.6,
    studentsCount: 18920,
    duration: "7h 45m",
    progress: 15,
  },
  {
    id: 6,
    title: "Advanced Data Science with Python",
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2187&auto=format&fit=crop",
    instructor: "Dr. Robert Lee",
    rating: 4.8,
    studentsCount: 31450,
    duration: "9h 10m",
  },
];

const FeaturedCourses = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      // Update button visibility based on scroll position
      const leftButton = document.getElementById("scroll-left-btn");
      const rightButton = document.getElementById("scroll-right-btn");

      if (leftButton && rightButton) {
        leftButton.style.opacity = scrollLeft > 0 ? "1" : "0.5";
        rightButton.style.opacity =
          scrollLeft < maxScrollLeft - 5 ? "1" : "0.5";
      }
    };

    container.addEventListener("scroll", handleScroll);
    // Initialize button state
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-full h-full bg-glow-purple opacity-10"></div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-sm text-neon-purple font-semibold uppercase tracking-wider mb-2">
              Featured Courses
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Expand Your Knowledge
            </h3>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button
              id="scroll-left-btn"
              onClick={scrollLeft}
              className="p-2 rounded-full bg-accent text-white hover:bg-accent/70 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="scroll-right-btn"
              onClick={scrollRight}
              className="p-2 rounded-full bg-accent text-white hover:bg-accent/70 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              to="/courses"
              className="hidden md:block text-neon-purple text-sm font-medium hover:underline ml-4"
            >
              View All Courses
            </Link>
          </div>
        </div>

        {/* Courses slider */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="min-w-[320px] max-w-[320px] snap-start"
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="mt-6 text-center md:hidden">
          <Link
            to="/courses"
            className="inline-block px-4 py-2 bg-accent rounded-lg text-neon-purple text-sm font-medium"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
