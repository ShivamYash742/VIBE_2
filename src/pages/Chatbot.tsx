import { ChatBot } from "@/components/ChatBot";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Chatbot() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Learning Assistant
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Ask me anything about computer science, mathematics, or any other
        subject!
      </p>
      <ChatBot />
    </div>
  );
}
