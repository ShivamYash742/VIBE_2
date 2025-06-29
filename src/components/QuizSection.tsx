import { Award, Target, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const QuizSection = () => {
  const quizCategories = [
    {
      title: "Technology",
      icon: <Zap className="h-6 w-6 text-neon-blue" />,
      count: 248,
      color: "from-neon-blue/20 to-transparent",
      route: "/quizzes/web-development",
    },
    {
      title: "Science",
      icon: <Target className="h-6 w-6 text-neon-purple" />,
      count: 175,
      color: "from-neon-purple/20 to-transparent",
      route: "/quizzes/quantum-physics",
    },
    {
      title: "Mathematics",
      icon: <TrendingUp className="h-6 w-6 text-neon-pink" />,
      count: 324,
      color: "from-neon-pink/20 to-transparent",
      route: "/quizzes/advanced-calculus",
    },
    {
      title: "Language",
      icon: <Award className="h-6 w-6 text-neon-teal" />,
      count: 196,
      color: "from-neon-teal/20 to-transparent",
      route: "/quizzes",
    },
  ];

  return (
    <section className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-glow-blue opacity-10"></div>
      <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full opacity-20 animate-spin-slow"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm text-neon-blue font-semibold uppercase tracking-wider mb-2">
            Interactive Quizzes
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Challenge Yourself
          </h3>
          <p className="text-muted-foreground">
            Test your knowledge with our gamified quizzes. Earn points, collect
            badges, and climb the leaderboards as you learn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quizCategories.map((category, index) => (
            <div
              key={index}
              className="glass-panel rounded-xl overflow-hidden hover-scale cursor-pointer"
            >
              <div className={`bg-gradient-to-b ${category.color} p-6`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-lg glass-effect flex items-center justify-center">
                    {category.icon}
                  </div>
                  <span className="text-white font-semibold">
                    {category.count} Quizzes
                  </span>
                </div>

                <h4 className="text-xl font-semibold text-white mb-2">
                  {category.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Test your knowledge and earn points
                </p>

                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                  <Link
                    to={category.route}
                    className="text-sm font-medium text-white hover:text-neon-blue transition-colors"
                  >
                    Start Quizzing
                  </Link>
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-accent border-2 border-dark-card"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gamification section */}
        <div className="glass-panel rounded-xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">
                Gamified Learning Experience
              </h4>
              <p className="text-muted-foreground mb-6">
                Our quizzes are designed to make learning fun and engaging. Earn
                points, unlock badges, and compete with friends.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    icon: <Award className="h-5 w-5 text-neon-purple" />,
                    text: "Earn badges for completing quiz series",
                  },
                  {
                    icon: <Target className="h-5 w-5 text-neon-blue" />,
                    text: "Track your progress with detailed analytics",
                  },
                  {
                    icon: <TrendingUp className="h-5 w-5 text-neon-pink" />,
                    text: "Compete on global and friend leaderboards",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-0.5">{item.icon}</div>
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/quizzes"
                className="mt-8 px-6 py-3 rounded-lg bg-neon-blue hover:bg-neon-blue/90 transition-all text-white font-medium inline-block"
              >
                Explore Quizzes
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                {/* Achievement badges display */}
                <div
                  className="absolute top-0 left-1/4 w-32 h-32 glass-effect rounded-xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="w-20 h-20 rounded-full bg-neon-purple/20 flex items-center justify-center neon-glow neon-glow-purple">
                    <Award className="h-10 w-10 text-neon-purple" />
                  </div>
                </div>

                <div
                  className="absolute bottom-0 right-1/4 w-32 h-32 glass-effect rounded-xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="w-20 h-20 rounded-full bg-neon-blue/20 flex items-center justify-center neon-glow neon-glow-blue">
                    <Target className="h-10 w-10 text-neon-blue" />
                  </div>
                </div>

                <div
                  className="absolute top-1/3 right-0 w-32 h-32 glass-effect rounded-xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.8s" }}
                >
                  <div className="w-20 h-20 rounded-full bg-neon-pink/20 flex items-center justify-center neon-glow neon-glow-pink">
                    <Zap className="h-10 w-10 text-neon-pink" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
