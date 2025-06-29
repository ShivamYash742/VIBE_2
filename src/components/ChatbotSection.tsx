import { useRef, useState, useEffect } from "react";
import { MessageCircle, Send, Bot, Info, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { chatWithCohere, CohereMessage } from "../lib/cohere";
import { env } from "../lib/env";

const ChatbotSection = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Chat messages state
  const [messages, setMessages] = useState<
    Array<{ sender: string; content: string; timestamp: string }>
  >([
    {
      sender: "bot",
      content: `Hello! How can I help with your learning journey today? I'm powered by Cohere AI.`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  // Convert messages to Cohere format
  const getCohereMessages = (): CohereMessage[] => {
    return messages.map((msg) => ({
      role: msg.sender === "user" ? "USER" : "ASSISTANT",
      message: msg.content,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Get current time
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    const userMessage = { sender: "user", content: message, timestamp };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // Prepare messages for Cohere API
      const cohereMessages: CohereMessage[] = [
        ...getCohereMessages(),
        { role: "USER" as "USER", message: message },
      ];

      // Call Cohere API
      const response = await chatWithCohere(cohereMessages);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          content: response,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error("Error getting response from Cohere:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          content: "I'm sorry, I encountered an error. Please try again later.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-glow-purple opacity-5"></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm text-neon-purple font-semibold uppercase tracking-wider mb-2">
            AI Assistant
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Learning Companion
          </h3>
          <p className="text-muted-foreground">
            Get personalized help, study guidance, and answers to your questions
            24/7 with our advanced AI chatbot powered by {env.APP_NAME}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Chatbot features */}
          {[
            {
              icon: <MessageCircle className="h-6 w-6 text-neon-blue" />,
              title: "Instant Answers",
              description:
                "Get immediate responses to your academic questions across all subjects.",
            },
            {
              icon: <Bot className="h-6 w-6 text-neon-purple" />,
              title: "Personalized Learning",
              description:
                "The AI adapts to your learning style and provides tailored recommendations.",
            },
            {
              icon: <Info className="h-6 w-6 text-neon-pink" />,
              title: "Concept Explanations",
              description:
                "Complex topics broken down into easy-to-understand explanations.",
            },
          ].map((feature, index) => (
            <div key={index} className="glass-panel rounded-xl p-6 hover-scale">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-lg glass-effect flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="glass-panel rounded-xl p-6 lg:col-span-2">
            <h4 className="text-lg font-semibold text-white mb-4">
              Available 24/7
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI chatbot is always ready to help you with your learning
              journey, whenever inspiration strikes or questions arise.
            </p>
            <Link
              to="/chatbot"
              className="w-full py-3 rounded-lg bg-neon-purple hover:bg-neon-purple/90 transition-all text-white font-medium inline-block text-center"
            >
              Start Chatting
            </Link>
          </div>

          {/* Chat interface */}
          <div className="lg:col-span-3 glass-panel rounded-xl overflow-hidden flex flex-col h-[600px]">
            {/* Chat header */}
            <div className="p-4 border-b border-white/5 flex items-center">
              <Link
                to="/"
                className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent/70 transition-colors mr-3"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-neon-purple" />
              </div>
              <div>
                <h4 className="text-white font-medium">EduBot</h4>
                <p className="text-xs text-muted-foreground">
                  Powered by Cohere AI
                </p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 ${
                      msg.sender === "user"
                        ? "bg-neon-purple text-white rounded-tr-none"
                        : "glass-effect text-white rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 inline-block">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-xl p-3 glass-effect text-white rounded-tl-none">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messageEndRef} />
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-white/5">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-accent rounded-lg px-4 py-2 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-neon-purple/50"
                />
                <button
                  type="submit"
                  className="p-2 rounded-lg bg-neon-purple text-white hover:bg-neon-purple/90 transition-all disabled:opacity-50 disabled:pointer-events-none"
                  disabled={!message.trim() || isLoading}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
