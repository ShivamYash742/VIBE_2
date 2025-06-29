import { useState } from "react";
import {
  Users,
  MessageSquare,
  ArrowUp,
  Filter,
  Search,
  Heart,
  MessageCircle,
  Share2,
  Award,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useScrollAnimation } from "../lib/animations";

// Sample community posts
const communityPosts = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Data Scientist",
    date: "2 hours ago",
    content:
      "Just completed the Advanced Machine Learning course! The final project on neural networks was challenging but incredibly rewarding. Has anyone else taken this course?",
    likes: 24,
    comments: 8,
    tags: ["Machine Learning", "AI", "Course Completion"],
  },
  {
    id: 2,
    author: "David Chen",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Software Engineer",
    date: "5 hours ago",
    content:
      "Looking for study partners for the upcoming Cloud Computing certification exam. I'm planning to take it next month and would love to form a study group!",
    likes: 18,
    comments: 15,
    tags: ["Cloud Computing", "Certification", "Study Group"],
  },
  {
    id: 3,
    author: "Aisha Patel",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "UX Designer",
    date: "Yesterday",
    content:
      "I just published my article on 'Design Systems for Educational Platforms' based on learnings from the UX/UI Fundamentals course here. Check it out and let me know your thoughts!",
    likes: 47,
    comments: 12,
    tags: ["UX Design", "Design Systems", "Article"],
  },
  {
    id: 4,
    author: "Michael Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=8",
    role: "Blockchain Developer",
    date: "2 days ago",
    content:
      "The Quantum Computing quiz was mind-blowing! I scored 85% but got stuck on the questions about quantum entanglement. Any quantum physics experts here who can explain the concept more intuitively?",
    likes: 32,
    comments: 21,
    tags: ["Quantum Computing", "Quiz", "Physics"],
  },
];

// Active community members
const activeMembers = [
  {
    name: "Lisa Wang",
    avatar: "https://i.pravatar.cc/150?img=10",
    role: "AI Researcher",
    points: 1250,
  },
  {
    name: "Jamal Carter",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "Frontend Developer",
    points: 980,
  },
  {
    name: "Elena Morozova",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Data Engineer",
    points: 865,
  },
  {
    name: "Raj Patel",
    avatar: "https://i.pravatar.cc/150?img=7",
    role: "Cybersecurity Expert",
    points: 750,
  },
  {
    name: "Sophia Chen",
    avatar: "https://i.pravatar.cc/150?img=4",
    role: "Mobile Developer",
    points: 620,
  },
];

// Upcoming events
const upcomingEvents = [
  {
    title: "Machine Learning Hackathon",
    date: "June 15-16, 2023",
    participants: 128,
    image:
      "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Web Development Workshop",
    date: "June 22, 2023",
    participants: 85,
    image:
      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=2061&auto=format&fit=crop",
  },
  {
    title: "Data Science Meetup",
    date: "July 5, 2023",
    participants: 110,
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
  },
];

const CommunityPost = ({ post }: { post: (typeof communityPosts)[0] }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="glass-panel rounded-xl p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="text-white font-medium">{post.author}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{post.role}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      <p className="text-white mb-4">{post.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-accent/60 rounded-full text-xs text-white"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-4">
          <button
            className={`flex items-center gap-1.5 ${
              liked ? "text-red-500" : "text-muted-foreground"
            } hover:text-white transition-colors`}
            onClick={handleLike}
          >
            <Heart size={18} className={liked ? "fill-red-500" : ""} />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-white transition-colors">
            <MessageCircle size={18} />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-white transition-colors">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        <button className="text-neon-purple hover:text-neon-purple/80 text-sm font-medium transition-colors">
          View all comments
        </button>
      </div>
    </div>
  );
};

const Community = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinCommunity = () => {
    setIsJoined(!isJoined);
  };

  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
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

          {/* Hero section */}
          <div className="mb-12 text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Learning Community
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Connect with fellow learners, share your progress, ask questions,
              and participate in discussions.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleJoinCommunity}
                className={`px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2 transition-colors ${
                  isJoined
                    ? "bg-accent text-white"
                    : "bg-neon-purple hover:bg-neon-purple/90 neon-glow neon-glow-purple"
                }`}
              >
                <Users size={18} />
                {isJoined ? "Joined" : "Join Community"}
              </button>
              <button className="px-6 py-3 bg-accent/60 backdrop-blur-md border border-white/10 rounded-lg text-white flex items-center gap-2 hover:bg-accent/80 transition-colors">
                <MessageSquare size={18} />
                Start Discussion
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - posts */}
            <div className="lg:col-span-2">
              {/* Search and filters */}
              <div className="mb-6 flex flex-col md:flex-row gap-4 animate-on-scroll">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="w-full pl-10 pr-4 py-3 bg-accent/60 backdrop-blur-md border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
                  />
                </div>

                <button className="md:w-auto px-6 py-3 bg-accent/60 backdrop-blur-md border border-white/10 rounded-lg text-white flex items-center gap-2 hover:bg-accent/80 transition-colors">
                  <Filter size={18} />
                  Filter
                </button>
              </div>

              {/* Tabs */}
              <div className="mb-6 border-b border-white/10 animate-on-scroll">
                <div className="flex overflow-x-auto">
                  {[
                    "trending",
                    "latest",
                    "popular",
                    "following",
                    "my posts",
                  ].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-3 whitespace-nowrap capitalize text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "text-neon-purple border-b-2 border-neon-purple"
                          : "text-muted-foreground hover:text-white"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* New post input */}
              <div className="glass-panel rounded-xl p-6 mb-6 animate-on-scroll">
                <div className="flex gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Start a discussion or ask a question..."
                    className="flex-1 bg-accent/40 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
                  />
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="animate-on-scroll">
                    <CommunityPost post={post} />
                  </div>
                ))}

                <div className="flex justify-center animate-on-scroll">
                  <button className="px-6 py-3 bg-accent/60 backdrop-blur-md border border-white/10 rounded-lg text-white flex items-center gap-2 hover:bg-accent/80 transition-colors">
                    <ArrowUp size={18} />
                    Load More
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community stats */}
              <div className="glass-panel rounded-xl p-6 animate-on-scroll">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Community Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/40 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      15.8K
                    </div>
                    <div className="text-muted-foreground text-sm">Members</div>
                  </div>
                  <div className="bg-accent/40 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-neon-purple mb-1">
                      4.2K
                    </div>
                    <div className="text-muted-foreground text-sm">Online</div>
                  </div>
                  <div className="bg-accent/40 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-neon-blue mb-1">
                      28.5K
                    </div>
                    <div className="text-muted-foreground text-sm">Posts</div>
                  </div>
                  <div className="bg-accent/40 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-neon-pink mb-1">
                      125K
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Responses
                    </div>
                  </div>
                </div>
              </div>

              {/* Active members */}
              <div className="glass-panel rounded-xl p-6 animate-on-scroll">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Active Members
                  </h3>
                  <button className="text-neon-purple text-sm">View All</button>
                </div>
                <div className="space-y-4">
                  {activeMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="text-white text-sm font-medium">
                            {member.name}
                          </h4>
                          <p className="text-muted-foreground text-xs">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Award size={14} className="text-yellow-400 mr-1" />
                        <span className="text-white text-sm">
                          {member.points}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming events */}
              <div className="glass-panel rounded-xl p-6 animate-on-scroll">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Upcoming Events
                  </h3>
                  <button className="text-neon-purple text-sm">View All</button>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative h-24 mb-2 overflow-hidden rounded-lg">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                          {event.date}
                        </div>
                      </div>
                      <h4 className="text-white text-sm font-medium group-hover:text-neon-purple transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        {event.participants} participants
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular tags */}
              <div className="glass-panel rounded-xl p-6 animate-on-scroll">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AI",
                    "Machine Learning",
                    "Web Development",
                    "Python",
                    "React",
                    "Data Science",
                    "UX Design",
                    "Cloud Computing",
                    "Cybersecurity",
                    "JavaScript",
                    "Blockchain",
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/60 rounded-full text-xs text-white cursor-pointer hover:bg-accent/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
