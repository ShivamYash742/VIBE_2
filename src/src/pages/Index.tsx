
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-chat-dark to-chat-light p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl"
      >
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 rounded-full bg-chat-primary/20 flex items-center justify-center shine-effect">
            <div className="h-12 w-12 rounded-full bg-chat-primary/40"></div>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-chat-blue via-chat-indigo to-chat-violet bg-clip-text text-transparent">
            AI Assistant
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
          Experience the power of AI with our advanced chatbot assistant. Get instant, intelligent responses to all your questions.
        </p>
        
        <Link to="/chatbot">
          <Button className="bg-chat-primary hover:bg-chat-primary/90 text-white px-6 py-6 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-chat-primary/20">
            Try the AI Assistant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-20 text-center"
      >
        <p className="text-white/40 text-sm">Powered by advanced AI technology</p>
      </motion.div>
    </div>
  );
};

export default Index;
