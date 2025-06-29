import { Users, MessageSquare, Edit, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CommunitySection = () => {
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Jennifer L.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      time: "2 hours ago",
      content:
        "Just completed the Advanced Machine Learning course and it was incredible! The practical examples really helped solidify the concepts.",
      likes: 24,
      comments: 8,
      tags: ["Machine Learning", "Course Review"],
    },
    {
      id: 2,
      author: "Michael T.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "Yesterday",
      content:
        "Anyone have tips for the quantum computing quiz? I'm struggling with the section on quantum gates.",
      likes: 16,
      comments: 12,
      tags: ["Quantum Computing", "Help"],
    },
    {
      id: 3,
      author: "Sophia R.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      time: "3 days ago",
      content:
        "Created a study group for the Cybersecurity course. We meet online every Thursday at 7 PM EST. DM me if you want to join!",
      likes: 42,
      comments: 15,
      tags: ["Study Group", "Cybersecurity"],
    },
  ]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postInput.trim()) return;

    const newPost = {
      id: posts.length + 1,
      author: "You",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      time: "Just now",
      content: postInput,
      likes: 0,
      comments: 0,
      tags: ["New Post"],
    };

    setPosts([newPost, ...posts]);
    setPostInput("");
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <section className="py-20 relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-glow-blue opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-sm text-neon-blue font-semibold uppercase tracking-wider mb-2">
              Community
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Learn Together
            </h3>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              to="/community"
              className="px-4 py-2 rounded-lg bg-neon-blue hover:bg-neon-blue/90 transition-all text-white text-sm font-medium"
            >
              Join Community
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Community stats */}
          <div className="glass-panel rounded-xl p-6 lg:col-span-1">
            <h4 className="text-xl font-semibold text-white mb-6">
              Community Stats
            </h4>

            <div className="space-y-6">
              {[
                {
                  label: "Active Members",
                  value: "15,782",
                  icon: <Users className="h-5 w-5 text-neon-blue" />,
                },
                {
                  label: "Daily Discussions",
                  value: "347",
                  icon: <MessageSquare className="h-5 w-5 text-neon-purple" />,
                },
                {
                  label: "User Contributions",
                  value: "2,543",
                  icon: <Edit className="h-5 w-5 text-neon-pink" />,
                },
              ].map((stat, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-10 w-10 rounded-full glass-effect flex items-center justify-center mr-4">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <h5 className="text-white font-medium mb-4">Top Contributors</h5>

              <div className="space-y-3">
                {[
                  {
                    name: "Alex J.",
                    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
                    points: "1,256",
                  },
                  {
                    name: "Maria S.",
                    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                    points: "1,187",
                  },
                  {
                    name: "David K.",
                    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
                    points: "964",
                  },
                ].map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full mr-3"
                      />
                      <span className="text-white text-sm">{user.name}</span>
                    </div>
                    <div className="text-neon-purple text-sm font-medium">
                      {user.points} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* New post input */}
            <form
              onSubmit={handlePostSubmit}
              className="glass-panel rounded-xl p-4 flex items-center"
            >
              <div className="h-10 w-10 rounded-full bg-accent mr-3"></div>
              <input
                type="text"
                value={postInput}
                onChange={(e) => setPostInput(e.target.value)}
                placeholder="Share something with the community..."
                className="flex-1 bg-accent rounded-lg px-4 py-2 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-neon-purple/50"
              />
              <button
                type="submit"
                className="ml-2 px-3 py-1 rounded-lg bg-neon-purple text-white hover:bg-neon-purple/90 transition-all"
                disabled={!postInput.trim()}
              >
                Post
              </button>
            </form>

            {/* Community posts */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="glass-panel rounded-xl p-6 hover-scale"
              >
                {/* Post header */}
                <div className="flex items-center mb-4">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="h-10 w-10 rounded-full mr-3 border border-white/10"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">{post.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {post.time}
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <p className="text-white mb-4">{post.content}</p>

                {/* Post tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-accent text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Post actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center text-muted-foreground hover:text-neon-pink transition-colors"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <Link
                      to="/community"
                      className="flex items-center text-muted-foreground hover:text-neon-blue transition-colors"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-sm">{post.comments}</span>
                    </Link>
                  </div>
                  <Link
                    to="/community"
                    className="text-sm text-neon-purple hover:text-neon-purple/80 transition-colors"
                  >
                    View Discussion
                  </Link>
                </div>
              </div>
            ))}

            <div className="text-center">
              <Link
                to="/community"
                className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/70 transition-all"
              >
                View More Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
