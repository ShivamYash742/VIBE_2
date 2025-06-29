import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Filter,
  SlidersHorizontal,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { useScrollAnimation } from "../lib/animations";

// Sample course data
const allCourses = [
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
  {
    id: 7,
    title: "Artificial Intelligence Ethics & Governance",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2124&auto=format&fit=crop",
    instructor: "Dr. Lisa Patel",
    rating: 4.7,
    studentsCount: 15230,
    duration: "5h 30m",
  },
  {
    id: 8,
    title: "Cloud Computing: AWS Solutions Architect",
    category: "Cloud",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    instructor: "Mark Zhang",
    rating: 4.9,
    studentsCount: 37890,
    duration: "11h 15m",
  },
  {
    id: 9,
    title: "Mobile App Development with Flutter",
    category: "Programming",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop",
    instructor: "Sophia Williams",
    rating: 4.8,
    studentsCount: 29450,
    duration: "9h 45m",
  },
  {
    id: 10,
    title: "Game Development with Unity",
    category: "Gaming",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    instructor: "Jason Brown",
    rating: 4.6,
    studentsCount: 22680,
    duration: "14h 30m",
  },
  {
    id: 11,
    title: "Digital Marketing Masterclass",
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    instructor: "Emily Parker",
    rating: 4.7,
    studentsCount: 31250,
    duration: "7h 20m",
  },
  {
    id: 12,
    title: "UX/UI Design Fundamentals",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop",
    instructor: "David Kim",
    rating: 4.9,
    studentsCount: 24750,
    duration: "8h 10m",
  },
];

const categories = [
  "All Categories",
  "Technology",
  "Programming",
  "Data Science",
  "Design",
  "Business",
  "Marketing",
  "Finance",
  "Cloud",
  "Security",
  "Physics",
  "Gaming",
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  useScrollAnimation();

  // Apply filters
  useEffect(() => {
    let result = allCourses;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(result);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Explore Courses
            </h1>
            <p className="text-muted-foreground">
              Discover our wide range of courses across various subjects
            </p>
          </div>

          {/* Hero banner */}
          <div className="relative bg-hero-pattern py-16 mb-12">
            <div className="absolute inset-0 bg-glow-purple opacity-10"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll">
                  Explore Our Course Library
                </h1>
                <p className="text-xl text-muted-foreground mb-8 animate-on-scroll">
                  Discover a wide range of courses designed to enhance your
                  skills and knowledge.
                </p>

                {/* Search bar */}
                <div className="flex flex-col md:flex-row gap-4 animate-on-scroll">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search for courses, instructors..."
                      className="w-full pl-10 pr-4 py-3 bg-accent/60 backdrop-blur-md border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <button
                    className="md:w-auto px-6 py-3 bg-accent/60 backdrop-blur-md border border-white/10 rounded-lg text-white flex items-center gap-2 hover:bg-accent/80 transition-colors"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter size={18} />
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Filter section */}
          {isFilterOpen && (
            <div className="mb-8 animate-slide-down glass-panel p-6 rounded-xl">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-neon-purple" />
                  <span className="font-medium text-white">Categories:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedCategory === category
                          ? "bg-neon-purple text-white"
                          : "bg-accent/60 text-muted-foreground hover:bg-accent/80 hover:text-white"
                      } transition-colors`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">
                {filteredCourses.length} Courses{" "}
                {selectedCategory !== "All Categories"
                  ? `in ${selectedCategory}`
                  : ""}
              </h2>
              {searchQuery && (
                <p className="text-muted-foreground">
                  Search results for: "{searchQuery}"
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="text-muted-foreground">Sort by:</span>
              <select className="bg-accent/60 backdrop-blur-md border border-white/10 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-purple">
                <option>Popular</option>
                <option>Newest</option>
                <option>Rating</option>
                <option>Duration</option>
              </select>
            </div>
          </div>

          {/* Courses grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div key={course.id} className="animate-on-scroll">
                  <CourseCard
                    title={course.title}
                    category={course.category}
                    image={course.image}
                    instructor={course.instructor}
                    rating={course.rating}
                    studentsCount={course.studentsCount}
                    duration={course.duration}
                    featured={course.featured}
                    id={course.id}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/60 flex items-center justify-center">
                  <BookOpen size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any courses matching your criteria.
                </p>
                <button
                  className="px-6 py-3 bg-neon-purple rounded-lg text-white hover:bg-neon-purple/90 transition-colors"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer with pagination */}
      <div className="bg-dark-card/50 py-8 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-muted-foreground">
              Showing{" "}
              <span className="text-white font-medium">
                {filteredCourses.length}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {allCourses.length}
              </span>{" "}
              courses
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center text-white hover:bg-accent/80 transition-colors">
                &lt;
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    page === 1
                      ? "bg-neon-purple text-white"
                      : "bg-accent/60 text-white hover:bg-accent/80"
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center text-white hover:bg-accent/80 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
