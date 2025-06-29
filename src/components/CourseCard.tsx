import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Star } from "lucide-react";

interface CourseCardProps {
  id: number;
  title: string;
  category: string;
  image: string;
  instructor: string;
  rating: number;
  studentsCount: number;
  duration: string;
  progress?: number;
  featured?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  category,
  image,
  instructor,
  rating,
  studentsCount,
  duration,
  progress,
  featured,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Function to generate a URL-friendly slug from the title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
  };

  // Generate the appropriate route based on the course ID and title
  const getCourseRoute = () => {
    // Map specific course IDs to their dedicated pages
    switch (id) {
      case 1:
        return "/courses/machine-learning";
      case 2:
        return "/courses/quantum-computing";
      case 3:
        return "/courses/cybersecurity";
      default:
        // For other courses, use a dynamic route with ID and slug
        const slug = generateSlug(title);
        return `/courses/${id}-${slug}`;
    }
  };

  return (
    <Link
      to={`/courses/${id}`}
      className="glass-panel rounded-xl overflow-hidden hover-scale"
    >
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {featured && (
          <div className="absolute top-3 left-3 py-1 px-3 rounded-full bg-neon-purple/90 text-xs font-semibold text-white">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80"></div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="text-xs text-neon-blue font-medium mb-2">
          {category}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{instructor}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-neon-yellow fill-neon-yellow mr-1" />
            <span className="text-white text-sm font-medium">{rating}</span>
          </div>

          <div className="flex items-center text-muted-foreground text-xs">
            <Users className="h-3 w-3 mr-1" />
            <span>{studentsCount.toLocaleString()}</span>
          </div>

          <div className="flex items-center text-muted-foreground text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Progress bar for courses in progress */}
        {progress && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">
                {progress}% Complete
              </span>
              <span className="text-xs text-neon-purple font-medium">
                Continue
              </span>
            </div>
            <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
              <div
                className="h-full bg-neon-purple rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {!progress && (
          <div className="mt-4">
            <div className="w-full py-2 rounded-lg bg-accent hover:bg-accent/70 transition-all text-center text-white text-sm font-medium">
              Enroll Now
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
